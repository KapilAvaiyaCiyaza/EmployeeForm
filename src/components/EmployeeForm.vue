<template>
    <CreateEmployee @employee-form="employeeForm" :updateEmpData="newModel" v-show="showForm" />
    <FilterEmployeeData @filter-employee-data="filterEmployeeData" @hide-show-form="hideShowForm" />
    <EmployeeData :empPaginateData="paginationData" :filterEmpData="filterData" @update-employee-data="updateEmployeeData" @delete-employee-data="deleteEmployeeData" />
    <EmployeeDataPagination @prev-page="prevPage" @next-page="nextPage" :empPaginateNumber="{startNumber: startData, endNumber: endData}" />
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';
import { set, get } from './EmployeeIdb.vue';
import CreateEmployee from "./CreateEmloyee.vue";
import EmployeeData from "./EmployeeData.vue";
import EmployeeDataPagination from "./EmployeeDataPagination.vue";
import FilterEmployeeData from "./FilterEmployeeData.vue";

let newModel = ref({});

let employeeDatas = ref([]);
let allEmployeeData = ref([]);

let paginationData = ref([]);
let filterData = ref([]);

let pageNumber = 0;
let startData = 0;
let endData = 10;

let showForm = ref(false);

onBeforeMount(async () => {

    const blankData = await get("employeeData");

    if(blankData == undefined){
        showForm.value = true
        document.getElementById("showHideForm").innerText = "Remove Form"
    }

    allEmployeeData.value = JSON.parse(await get("employeeData"));
    employeeDatas.value = allEmployeeData.value;

    if(allEmployeeData.value.length > 0){
        showForm.value = false
    }
    else{
        showForm.value = true
        document.getElementById("showHideForm").disabled = true;
    }

})

const hideShowForm = () => {

    if(!showForm.value){
        showForm.value = true
        document.getElementById("showHideForm").innerText = "Remove Form"
    }
    else{
        showForm.value = false
        document.getElementById("showHideForm").innerText = "Add Form"
    }

}

const employeeForm = async (data) => {

    const employeeId = document.getElementById("employeeId").value;

    const updateHobbies = [];

    for (const item in data.hobbies) {
        updateHobbies.push(data.hobbies[item])
    }

    if (employeeId == 0) {

        const employeeData = {
            id: Math.floor(Math.random() * 9999),
            name: data.name,
            email: data.email,
            number: data.number,
            address: data.address,
            designation: data.designation,
            salary: data.salary,
            work: data.work,
            hobbies: updateHobbies
        }

        allEmployeeData.value.push(employeeData);

        await set(JSON.stringify(allEmployeeData.value), "employeeData");

    }
    else{
        
        allEmployeeData.value = JSON.parse(await get("employeeData"));
    
        const updatedEmployeeData = allEmployeeData.value.map((value) => value.id == document.getElementById("employeeId").value ? { ...value, name: newModel.value.name, email: newModel.value.email, number: newModel.value.number, address: newModel.value.address, designation: newModel.value.designation, salary: newModel.value.salary, work: newModel.value.work, hobbies: updateHobbies } : value);
    
        await set(JSON.stringify(updatedEmployeeData), "employeeData")

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

    showForm.value = true

    newModel.value = data

    document.getElementById("input_9").innerText = "Update Data";

}

const filterEmployeeData = async (data) => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    const filterEmployeeData = allEmployeeData.value.filter((value) => value.id == data || value.name == data || value.email == data || value.number == data || value.address == data || value.designation == data || value.salary == data || value.work == data);

    if (filterEmployeeData.length == 0 || data.length == 0) {

        filterData.value = []

        startData = 0;
        endData = 10;

    }
    else {

        filterData.value = filterEmployeeData

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

        const paginaData = allEmployeeData.value.slice(0, 10);

        paginationData.value = paginaData

    }
    else{

        const paginaData = allEmployeeData.value.slice(startData, endData);

        paginationData.value = paginaData

    }

}

const nextPage = async () => {

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    pageNumber++;

    startData = pageNumber * 10;
    endData = startData + 10;

    if(endData > allEmployeeData.value.length || endData == allEmployeeData.value.length){

        document.getElementById("nextBtn").disabled = true;

        const paginaData = allEmployeeData.value.slice(startData, endData);

        paginationData.value = paginaData
        
    }
    else{
        
        const paginaData = allEmployeeData.value.slice(startData, endData);
    
        paginationData.value = paginaData

    }

    document.getElementById("prevBtn").disabled = false;

}
</script>