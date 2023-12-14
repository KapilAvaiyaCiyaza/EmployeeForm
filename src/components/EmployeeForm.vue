<template>
    <FilterEmployeeData @filter-employee-data="filterEmployeeData"/>
    <EmployeeData :empPaginateData="paginationData" :filterEmpData="filterData" />
    <EmployeeDataPagination @prev-page="prevPage" @nextPage="nextPage" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { get } from './EmployeeIdb.vue';
import EmployeeData from "./EmployeeData.vue";
import EmployeeDataPagination from "./EmployeeDataPagination.vue";
import FilterEmployeeData from "./FilterEmployeeData.vue";

let newModel = ref({});
let employeeDatas = ref([]);
let allEmployeeData = ref([]);
let paginationData = ref([]);
let filterData = ref([]);
let showForm = ref(false);

let pageNumber = 0;
let startData = 0;
let endData = 10;

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

    if(allEmployeeData.value.length <= 10){
        document.getElementById("nextBtn").disabled = true;
    }
    else{
        document.getElementById("nextBtn").disabled = false;
    }

})

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

const prevPage = async (data) => {

    console.log(await data);

}

const nextPage = async (data) => {

    console.log(await data);

}
</script>