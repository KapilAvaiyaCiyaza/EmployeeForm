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
                    <td class="px-6 py-4"><button @click="$router.push('/edit/' + value.id)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button><button @click="open = true, employeeId = value.id" class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Delete</button></td>
                    <TransitionRoot as="template" :show="open">
                        <Dialog as="div" class="relative z-10" @click="open = false">
                            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                                <div class="fixed inset-0 bg-black bg-opacity-20 transition-opacity" />
                            </TransitionChild>
                            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-slate-500 transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div class="sm:flex sm:items-start">
                                        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Delete Employee Data</DialogTitle>
                                            <div class="mt-2">
                                            <p class="text-sm text-gray-500">Are you sure you want to delete your employee data? All of your data will be permanently removed. This action cannot be undone.</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="employeeStore.deleteEmployeeData(employeeId), open = false" >Delete Data</button>
                                        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="open = false" ref="cancelButtonRef">Cancel</button>
                                    </div>
                                    </DialogPanel>
                                </TransitionChild>
                                </div>
                            </div>
                        </Dialog>
                    </TransitionRoot>
                </tr>
                <tr v-else>No record found</tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUpdate, ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import employeeStore from "../store"

let employeeDatas = ref([]);
let allEmployeeData = ref([]);

const open = ref(false)
const employeeId = ref("");

const props = defineProps(['empPaginateData','filterEmpData']);

onBeforeMount(async () => {

    const allData = await employeeStore.getEmployeeData();

    allEmployeeData.value = await JSON.parse(allData);
    employeeDatas.value = allEmployeeData.value;

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

onBeforeUpdate(() => {

    const paginationData = JSON.parse(JSON.stringify(props.empPaginateData))
    const filterData = JSON.parse(JSON.stringify(props.filterEmpData));
    
    if(filterData.length !== 0){
        
        employeeDatas.value = filterData

    }
    else if(paginationData.length <= 0){

        const paginateData = allEmployeeData.value.slice(0, 10);

        employeeDatas.value = paginateData

        document.getElementById("prevBtn").disabled = true;

    }
    else{
        
        const paginateData = JSON.parse(JSON.stringify(props.empPaginateData));
        
        employeeDatas.value = paginateData;

    }

})
</script>