<template>
    <div class="employee-form">
        <h1 class="text-3xl font-bold">Employee Form</h1>
        <FormKit type="form" submit-label="Submit" @submit="employeeForm" v-model="newModel">
            <FormKit type="hidden" name="id" :value="newModel.id ? newModel.id : 0" id="employeeId" />
            <FormKit type="text" label="Name" name="name" validation="required" />
            <FormKit type="email" label="Email" name="email" validation="required|email|ends_with:.com" validation-visibility="blur" />
            <FormKit type="number" label="Number" name="number" validation="required" />
            <FormKit type="textarea" label="Address" name="address" validation="required" />
            <FormKit type="select" label="Designation" name="designation" :options="[{label:'--- Select your designation ---', value:'--- Select your designation ---', attrs: { disabled: true }}, 'Web Developer', 'Application Developer', 'Game Developer']" validation="required" />
            <FormKit type="number" label="Salary" name="salary" validation="required" />
            <FormKit type="radio" label="Where will you work from?" name="work" :options="['Remote', 'Hybrid', 'On-site']" />
            <FormKit type="checkbox" label="Hobbies" name="hobbies" :options="['Reading', 'Writing', 'Traveling']" validation="required|min:1" />
        </FormKit>
    </div>

    <div class="flex flex-wrap items-center justify-center mt-20 mb-10">
        <span v-show="employeeDatas.length !== 0" class="me-2 text-sm font-medium text-gray-900 dark:text-white">Filter </span><input type="text" placeholder="Enter employee any detail"
            @keyup="(e) => filterEmployeeData(e.target.value)" v-show="employeeDatas.length !== 0" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48">
    </div>

    <div class="relative shadow-md sm:rounded-lg mx-10">
        <table border="1" v-show="employeeDatas.length !== 0" class="employee-data-table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">id</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Email</th>
                    <th scope="col" class="px-6 py-3">Number</th>
                    <th scope="col" class="px-6 py-3">Address</th>
                    <th scope="col" class="px-6 py-3">Designation</th>
                    <th scope="col" class="px-6 py-3">Salary</th>
                    <th scope="col" class="px-6 py-3">Work</th>
                    <th scope="col" class="px-6 py-3">Hobbies</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="employeeDatas" v-for="(value, index) in employeeDatas" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{{ value.id }}</td>
                    <td class="px-6 py-4">{{ value.name }}</td>
                    <td class="px-6 py-4">{{ value.email }}</td>
                    <td class="px-6 py-4">{{ value.number }}</td>
                    <td class="px-6 py-4">{{ value.address }}</td>
                    <td class="px-6 py-4">{{ value.designation }}</td>
                    <td class="px-6 py-4">{{ value.salary }}</td>
                    <td class="px-6 py-4">{{ value.work }}</td>
                    <td class="px-6 py-4">
                        {{ value.hobbies.join() }}
                    </td>
                    <td class="px-6 py-4"><button @click="updateEmployeeData(value)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button><button @click="deleteEmployeeData(value.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</button></td>
                </tr>
                <tr v-else>No record found</tr>
            </tbody>
        </table>
    </div>

    <div v-show="employeeDatas.length !== 0" class="flex flex-wrap items-center justify-center mt-5 mb-10">
        <button @click="prevPage" id="prevBtn" class="flex items-center justify-center px-3 me-3 h-8 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
        Previous</button>    
        <div>
            <p class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ startData + 1 }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ endData > allEmployeeData.length ? allEmployeeData.length : endData }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ allEmployeeData.length }}</span>
            {{ ' ' }}
            results
            </p>
        </div>
        <button @click="nextPage" id="nextBtn" class="flex items-center justify-center px-3 ms-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
  </div>

</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { set, get } from './EmployeeIdb.vue';

let newModel = ref({});

let employeeDatas = ref([]);

let updateEmpData = ref({});

let pageNumber = 0;
let startData = 0;
let endData = 10;

let allEmployeeData = ref([]);

onBeforeMount(async () => {

    employeeDatas.value = JSON.parse(await get("employeeData"));

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    if(endData == allEmployeeData.value.length) {
        
        document.getElementById("prevBtn").disabled = true;
        document.getElementById("nextBtn").disabled = true;

    }
    else if(allEmployeeData.value.length > 0){

        const paginationData = allEmployeeData.value.slice(0, 10);

        employeeDatas.value = paginationData

        document.getElementById("prevBtn").disabled = true;

    }
    else{

        document.getElementById("prevBtn").disabled = false;
        document.getElementById("nextBtn").disabled = false;

    }


})

const employeeForm = async () => {

    const employeeId = document.getElementById("employeeId").value;

    const updateHobbies = [];

    for (const item in newModel.value.hobbies) {
        updateHobbies.push(newModel.value.hobbies[item])
    }

    if (employeeId == 0) {

        const employeeData = {
            id: Math.floor(Math.random() * 9999),
            name: newModel.value.name,
            email: newModel.value.email,
            number: newModel.value.number,
            address: newModel.value.address,
            designation: newModel.value.designation,
            salary: newModel.value.salary,
            work: newModel.value.work,
            hobbies: updateHobbies
        }

        allEmployeeData.value.push(employeeData);

        await set(JSON.stringify(allEmployeeData.value), "employeeData");

    }
    else{
        
        allEmployeeData.value = JSON.parse(await get("employeeData"));
    
        const updatedEmployeeData = allEmployeeData.value.map((value) => value.id == document.getElementById("employeeId").value ? { ...value, name: newModel.value.name, email: newModel.value.email, number: newModel.value.number, address: newModel.value.address, designation: newModel.value.designation, salary: newModel.value.salary, work: newModel.value.work, hobbies: updateHobbies } : value);
    
        await set(JSON.stringify(updatedEmployeeData), "employeeData")

        console.log(updatedEmployeeData);

    }

    document.getElementById("employeeId").value = "0";
    document.getElementById("input_9").innerText = "Submit";

    window.location.reload(true);

}

const deleteEmployeeData = async (id) => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    const filterEmployeeDatas = allEmployeeData.value.filter((value, index) => value.id !== id);

    await set(JSON.stringify(filterEmployeeDatas), "employeeData");

    window.location.reload(true);

}

const updateEmployeeData = async (data) => {

    updateEmpData.value = await JSON.parse(JSON.stringify(data));

    newModel.value.id = updateEmpData.value.id;
    newModel.value.name = updateEmpData.value.name;
    newModel.value.email = updateEmpData.value.email;
    newModel.value.number = updateEmpData.value.number;
    newModel.value.address = updateEmpData.value.address;
    newModel.value.designation = updateEmpData.value.designation;
    newModel.value.salary = updateEmpData.value.salary;
    newModel.value.work = updateEmpData.value.work;
    newModel.value.hobbies = updateEmpData.value.hobbies;

    document.getElementById("input_9").innerText = "Update Data"

}

const filterEmployeeData = async (data) => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    const filterEmployeeData = allEmployeeData.value.filter((value) => value.id == data || value.name == data || value.email == data || value.number == data || value.address == data || value.designation == data || value.salary == data || value.work == data);

    if (filterEmployeeData.length == 0 || data.length == 0) {

        const paginationData = allEmployeeData.value.slice(0, 10);

        employeeDatas.value = paginationData

        startData = 0;
        endData = 10;

    }
    else {

        employeeDatas.value = filterEmployeeData

    }

}

const prevPage = async () => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    pageNumber--;

    startData = pageNumber * 10;
    endData = startData + 10;

    if(pageNumber <= 0){

        document.getElementById("prevBtn").disabled = true;
        document.getElementById("nextBtn").disabled = false;

        const paginationData = allEmployeeData.value.slice(0, 10);

        employeeDatas.value = paginationData

    }
    else{

        const paginationData = allEmployeeData.value.slice(startData, endData);

        employeeDatas.value = paginationData

    }
}

const nextPage = async () => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    pageNumber++;

    startData = pageNumber * 10;
    endData = startData + 10;

    if(endData > allEmployeeData.value.length){

        document.getElementById("nextBtn").disabled = true;

        const paginationData = allEmployeeData.value.slice(startData, endData);

        employeeDatas.value = paginationData
        
    }
    else{
        
        const paginationData = allEmployeeData.value.slice(startData, endData);
    
        employeeDatas.value = paginationData

    }

    document.getElementById("prevBtn").disabled = false;

}

</script>