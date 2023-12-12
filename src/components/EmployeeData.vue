<template>
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
                    <td class="px-6 py-4"><button @click="$emit('updateEmployeeData',value)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button><button @click="deleteEmployeeData(value.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</button></td>
                </tr>
                <tr v-else>No record found</tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

import { onUpdated, onBeforeMount, onMounted, ref } from 'vue';
import { get } from './EmployeeIdb.vue';

let employeeDatas = ref([]);
let allEmployeeData = ref([]);

const props = defineProps(['empPaginateData']);

onUpdated(() => {
    
    if(props.empPaginateData.length <= 0){

        const paginationData = allEmployeeData.value.slice(0, 10);

        employeeDatas.value = paginationData

        document.getElementById("prevBtn").disabled = true;

    }
    else{
        
        const paginationData = JSON.parse(JSON.stringify(props.empPaginateData));

        employeeDatas.value = paginationData;

    }

})

onBeforeMount(async () => {  
    
    employeeDatas.value = JSON.parse(await get("employeeData"));

    allEmployeeData.value = JSON.parse(await get("employeeData"));

    if(10 == allEmployeeData.value.length) {
        
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

</script>