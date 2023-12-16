<template>
    <FilterEmployeeData @filter-employee-data="filterEmployeeData" />
    <EmployeeData :empPaginateData="paginationData" :filterEmpData="filterData" />
    <EmployeeDataPagination @prev-page="prevPage" @nextPage="nextPage" :empPaginateData="paginationData" />
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { get } from './EmployeeIdb.vue';
import EmployeeData from "./EmployeeData.vue";
import EmployeeDataPagination from "./EmployeeDataPagination.vue";
import FilterEmployeeData from "./FilterEmployeeData.vue";
import employeeStore from "../store"

let employeeDatas = ref([]);
let allEmployeeData = ref([]);
let paginationData = ref({});
let filterData = ref([]);
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

    if(allEmployeeData.value.length <= 10){
        document.getElementById("nextBtn").disabled = true;
    }
    else{
        document.getElementById("nextBtn").disabled = false;
    }

})

const filterEmployeeData = async (data) => {

    const filterempData = await employeeStore.filterEmployeeData(data);

    filterData.value = await filterempData;

}

const prevPage = async (data) => {

    const paginateData = await data;

    paginationData.value = paginateData;

}

const nextPage = async (data) => {

    const paginateData = await data;

    paginationData.value = paginateData;

}
</script>