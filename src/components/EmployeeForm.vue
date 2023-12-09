<template>
    <div class="employee-form">
        <h1>Employee Form</h1>
        <form @submit.prevent="employeeForm" id="employeeForm">
            <input type="hidden" :value="updateEmpData.id ? updateEmpData.id : 0" id="employeeId">
            <div class="form-field field-name">
                <label>Name*</label>
                <input type="text" v-model="employeeName">
            </div>
            <div class="form-field field-email">
                <label>Email*</label>
                <input type="email" v-model="employeeEmail">
            </div>
            <div class="form-field field-number">
                <label>Number*</label>
                <input type="number" v-model="employeeNumber">
            </div>
            <div class="form-field field-address">
                <label>Address*</label>
                <textarea v-model="employeeAddress"></textarea>
            </div>
            <div class="form-field field-designation">
                <label>Designation*</label>
                <select v-model="employeeDesignation">
                    <option value="">--- Select your designation ---</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Application Developer">Application Developer</option>
                    <option value="Game Developer">Game Developer</option>
                </select>
            </div>
            <div class="form-field field-salary">
                <label>Salary*</label>
                <input type="number" v-model="employeeSalary">
            </div>
            <div class="form-field field-work">
                <label>Where will you work from?*</label>
                <div class="radio-options">
                    <input type="radio" value="Remote" v-model="employeeWork">
                    <span>Remote</span>
                </div>
                <div class="radio-options">
                    <input type="radio" value="Hybrid" v-model="employeeWork">
                    <span>Hybrid</span>
                </div>
                <div class="radio-options">
                    <input type="radio" value="On-site" v-model="employeeWork">
                    <span>On-site</span>
                </div>
            </div>
            <div class="form-field field-hobbies">
                <label>Hobbies*</label>
                <div class="checkbox-options">
                    <input type="checkbox" value="Reading" v-model="employeeHobbies">
                    <span>Reading</span>
                </div>
                <div class="checkbox-options">
                    <input type="checkbox" value="Writing" v-model="employeeHobbies">
                    <span>Writing</span>
                </div>
                <div class="checkbox-options">
                    <input type="checkbox" value="Traveling" v-model="employeeHobbies">
                    <span>Traveling</span>
                </div>
            </div>
            <input type="submit" value="Submit" id="employeeSubmitBtn" class="submit-btn">
        </form>
    </div>

    <br><br>

    <span v-show="employeeDatas.length !== 0">Filter </span><input type="text" placeholder="Enter employee any detail"
        @keyup="(e) => filterEmployeeData(e.target.value)" v-show="employeeDatas.length !== 0">

    <br><br>

    <table border="1" v-show="employeeDatas.length !== 0" class="employee-data-table">
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
                    {{ value.hobbies.join() }}
                </td>
                <td><button @click="updateEmployeeData(value)">Update</button> || <button @click="deleteEmployeeData(value.id)">Delete</button></td>
            </tr>
            <tr v-else>No record found</tr>
        </tbody>
    </table>

    <div v-show="employeeDatas.length !== 0">
        <button @click="prevPage" id="prevBtn">Previous</button>    
        <div>
            <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <span>{{ startData + 1 }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span>{{ endData > allEmployeeData.length ? allEmployeeData.length : endData }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span>{{ allEmployeeData.length }}</span>
            {{ ' ' }}
            results
            </p>
        </div>
        <button @click="nextPage" id="nextBtn">Next</button>
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

        allEmployeeData.value.push(employeeData);

        await set(JSON.stringify(allEmployeeData.value), "employeeData");

    }
    else{
        
        allEmployeeData.value = JSON.parse(await get("employeeData"));
    
        const updatedEmployeeData = allEmployeeData.value.map((value) => value.id == document.getElementById("employeeId").value ? { ...value, name: employeeName.value, email: employeeEmail.value, number: employeeNumber.value, address: employeeAddress.value, designation: employeeDesignation.value, salary: employeeSalary.value, work: employeeWork.value, hobbies: updateHobbies } : value);
    
        await set(JSON.stringify(updatedEmployeeData), "employeeData")

    }

    document.getElementById("employeeId").value = "0";
    document.getElementById("employeeSubmitBtn").value = "Submit";

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