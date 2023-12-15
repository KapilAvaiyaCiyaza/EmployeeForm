<template>
    <div class="flex flex-wrap items-center justify-end mt-10 mb-10 px-10">
        <div class="flex flex-wrap items-center justify-start" v-show="filterShow">
            <span class="me-2 text-sm font-medium text-gray-900 dark:text-white">Filter </span><input type="text" placeholder="Enter employee any detail" @keyup="employeeStore.filterEmployeeData(filterDataName)" v-model="filterDataName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-48">
        </div>
        <button class="text-white bg-blue-700 hover:bg-blue-800 mx-3 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="filterShow ? filterShow = false : filterShow = true" v-show="showFilterBtn">{{filterShow ? 'Remove Filter' : 'Add Filter'}}</button>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { get } from './EmployeeIdb.vue';
import employeeStore from "../store"

const filterDataName = ref("");
const employeeData = ref([]);

let filterShow = ref(false);
let showFilterBtn = ref(false);

onBeforeMount(async () => {

    employeeData.value = JSON.parse(await get("employeeData"));

    if(employeeData.value.length == 0 || employeeData.value.length == undefined){
        filterShow.value = false;
        showFilterBtn.value = false
    }
    else{
        filterShow.value = false;
        showFilterBtn.value = true;
    }
    
})

</script>