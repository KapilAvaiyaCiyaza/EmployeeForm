<template>
    <h1>Employee Form</h1>
    <br>
    <form @submit.prevent="employeeForm" id="employeeForm">
        <input type="hidden" :value="updateEmpData.id ? updateEmpData.id : 0" id="employeeId">
        <div>
            <label>Name*</label>
            <input type="text" v-model="employeeName">
        </div>
        <div>
            <label>Email*</label>
            <input type="email" v-model="employeeEmail">
        </div>
        <div>
            <label>Number*</label>
            <input type="number" v-model="employeeNumber">
        </div>
        <div>
            <label>Address*</label>
            <textarea v-model="employeeAddress"></textarea>
        </div>
        <div>
            <label>Designation*</label>
            <select v-model="employeeDesignation">
                <option value="">--- Select your designation ---</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Application Developer">Application Developer</option>
                <option value="Game Developer">Game Developer</option>
            </select>
        </div>
        <div>
            <label>Salary*</label>
            <input type="number" v-model="employeeSalary">
        </div>
        <div>
            <label>Where will you work from?*</label>
            <div>
                <input type="radio" value="Remote" v-model="employeeWork">
                <span>Remote</span>
            </div>
            <div>
                <input type="radio" value="Hybrid" v-model="employeeWork">
                <span>Hybrid</span>
            </div>
            <div>
                <input type="radio" value="On-site" v-model="employeeWork">
                <span>On-site</span>
            </div>
        </div>
        <div>
            <label>Hobbies*</label>
            <div>
                <input type="checkbox" value="Reading" v-model="employeeHobbies">
                <span>Reading</span>
            </div>
            <div>
                <input type="checkbox" value="Writing" v-model="employeeHobbies">
                <span>Writing</span>
            </div>
            <div>
                <input type="checkbox" value="Traveling" v-model="employeeHobbies">
                <span>Traveling</span>
            </div>
        </div>
        <input type="submit" value="Submit" id="employeeSubmitBtn">
    </form>

    <br><br>

    <span>Filter </span><input type="text" placeholder="Enter employee any detail"
        @keyup="(e) => filterEmployeeData(e.target.value)">

    <br><br>

    <table border="1" v-show="employeeDatas.length !== 0">
        <thead>
            <tr>
                <td>id</td>
                <td>Name</td>
                <td>Email</td>
                <td>Number</td>
                <td>Address</td>
                <td>Designation</td>
                <td>Salary</td>
                <td>Work</td>
                <td>Hobbies</td>
                <td>Actions</td>
            </tr>
        </thead>
        <tbody>
            <tr v-if="employeeDatas" v-for="(value, index) in employeeDatas">
                <td>{{ value.id }}</td>
                <td>{{ value.name }}</td>
                <td>{{ value.email }}</td>
                <td>{{ value.number }}</td>
                <td>{{ value.address }}</td>
                <td>{{ value.designation }}</td>
                <td>{{ value.salary }}</td>
                <td>{{ value.work }}</td>
                <td>
                    <ul>
                        <li v-for="val in value.hobbies">{{ val }}</li>
                    </ul>
                </td>
                <td><button @click="updateEmployeeData(value)">Update</button> || <button @click="deleteEmployeeData(value.id)">Delete</button></td>
            </tr>
            <tr v-else>No record found</tr>
        </tbody>
    </table>

    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
            <a href="#" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
            <a href="#" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">1</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">{{ employeeDatas.length }}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">{{ employeeDatas.length }}</span>
                {{ ' ' }}
                results
                </p>
            </div>
        </div>
  </div>

</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { set, get } from './EmployeeIdb.vue';

let employeeName = ref("");
let employeeEmail = ref("");
let employeeNumber = ref("");
let employeeAddress = ref("");
let employeeDesignation = ref("");
let employeeSalary = ref("");
let employeeWork = ref("");
let employeeHobbies = ref([]);

let employeeDatas = ref([]);

let updateEmpData = ref({});

onBeforeMount(async () => {

    employeeDatas.value = JSON.parse(await get("employeeData"));

})

const employeeForm = async () => {

    const employeeId = document.getElementById("employeeId").value;

    const updateHobbies = [];

    for (const item in employeeHobbies.value) {
        updateHobbies.push(employeeHobbies.value[item])
    }

    if (employeeId == 0) {

        const employeeData = {
            id: Math.floor(Math.random() * 9999),
            name: employeeName.value,
            email: employeeEmail.value,
            number: employeeNumber.value,
            address: employeeAddress.value,
            designation: employeeDesignation.value,
            salary: employeeSalary.value,
            work: employeeWork.value,
            hobbies: updateHobbies
        }
        employeeDatas.value.push(employeeData);

        await set(JSON.stringify(employeeDatas.value), "employeeData");

    }
    else {

        const allEmployeeData = JSON.parse(await get("employeeData"));

        const updatedEmployeeData = allEmployeeData.map((value) => value.id == document.getElementById("employeeId").value ? { ...value, name: employeeName.value, email: employeeEmail.value, number: employeeNumber.value, address: employeeAddress.value, designation: employeeDesignation.value, salary: employeeSalary.value, work: employeeWork.value, hobbies: updateHobbies } : value);

        await set(JSON.stringify(updatedEmployeeData), "employeeData")

    }

    document.getElementById("employeeId").value = "0";
    document.getElementById("employeeSubmitBtn").value = "Submit";

    window.location.reload(true);

}

const deleteEmployeeData = async (id) => {

    const allEmployeeDatas = JSON.parse(await get("employeeData"));

    const filterEmployeeDatas = allEmployeeDatas.filter((value, index) => value.id !== id);

    await set(JSON.stringify(filterEmployeeDatas), "employeeData");

    window.location.reload(true);

}

const updateEmployeeData = async (data) => {

    updateEmpData.value = await JSON.parse(JSON.stringify(data));

    employeeName = ref(updateEmpData.value.name);
    employeeEmail = ref(updateEmpData.value.email);
    employeeNumber = ref(updateEmpData.value.number);
    employeeAddress = ref(updateEmpData.value.address);
    employeeDesignation = ref(updateEmpData.value.designation);
    employeeSalary = ref(updateEmpData.value.salary);
    employeeWork = ref(updateEmpData.value.work);
    employeeHobbies = ref(updateEmpData.value.hobbies);

    document.getElementById("employeeSubmitBtn").value = "Update Data"

}

const filterEmployeeData = async (data) => {

    const allEmployeeData = JSON.parse(await get("employeeData"));

    const filterEmployeeData = allEmployeeData.filter((value) => value.id == data || value.name == data || value.email == data || value.number == data || value.address == data || value.designation == data || value.salary == data || value.work == data);

    if (filterEmployeeData.length == 0) {

        employeeDatas.value = allEmployeeData

    }
    else {

        employeeDatas.value = filterEmployeeData

    }

}

</script>