<template>
    <div v-show="employeeDatas.length !== 0" class="flex flex-wrap items-center justify-center mt-5 mb-10">
        <button @click="$emit('prevPage', employeeStore.paginationPrevPage())" id="prevBtn" class="flex items-center justify-center px-3 me-3 h-8 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
        Previous</button>    
        <div>
            <p class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ startNumber + 1 }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ endNumber > allEmployeeData.length ? allEmployeeData.length : endNumber }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-semibold text-gray-900 dark:text-white">{{ allEmployeeData.length }}</span>
            {{ ' ' }}
            results
            </p>
        </div>
        <button @click="$emit('nextPage', employeeStore.paginationNextPage())" id="nextBtn" class="flex items-center justify-center px-3 ms-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
  </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, ref } from 'vue';
import { get } from './EmployeeIdb.vue';
import employeeStore from "../store"

let employeeDatas = ref([]);
let allEmployeeData = ref([]);

let startNumber = 0;
let endNumber = 10;

const props = defineProps(['empPaginateData']);

onBeforeMount(async () => {    
    employeeDatas.value = JSON.parse(await get("employeeData"));
    allEmployeeData.value = JSON.parse(await get("employeeData"));
})

onBeforeUpdate(() => {

    startNumber = props.empPaginateData.startNumber;
    endNumber = props.empPaginateData.endNumber;

    if(startNumber == undefined || endNumber == undefined){
        startNumber = 0;
        endNumber = 10;
    }

})
</script>