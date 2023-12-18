<template>
    <div class="employee-form">
        <h1 class="text-3xl font-bold">Employee Form</h1>
        <FormKit type="form" :submit-label="updateEmployeeId != 0 ? 'Update Data' : 'Submit'" @submit="employeeForm(newModel)" v-model="newModel">
            <FormKit type="hidden" name="id" :value="newModel.id ? newModel.id : 0" id="employeeId" />
            <FormKit type="text" label="Name" name="name" validation="required" />
            <FormKit type="email" label="Email" name="email" validation="required|email|ends_with:.com" validation-visibility="blur" />
            <FormKit type="tel" label="Number" name="number" validation="matches:/^[0-9]{10}$/" :validation-messages="{matches: 'Phone number must be 10 digit'}" />
            <FormKit type="textarea" label="Address" name="address" validation="required" auto-height />
            <FormKit type="select" label="Designation" name="designation" :options="[{label:'--- Select your designation ---', value:'--- Select your designation ---', attrs: { disabled: true }}, 'Web Developer', 'Application Developer', 'Game Developer']" validation="required" />
            <FormKit type="number" label="Salary" name="salary" validation="required" />
            <FormKit type="radio" label="Where will you work from?" name="work" :options="['Remote', 'Hybrid', 'On-site']" />
            <FormKit type="checkbox" label="Hobbies" name="hobbies" :options="['Reading', 'Writing', 'Traveling']" validation="required|min:1" />
        </FormKit>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { get } from './EmployeeIdb.vue';
import employeeStore from "../store"
import router from '@/routes';
import { onBeforeRouteLeave, useRoute } from 'vue-router'

let newModel = ref({});
let allEmployeeData = ref([]);

const route = useRoute();

let employeeData = [];
let updateEmployeeId = ref("");

onBeforeMount(async () => {

    const allData = await employeeStore.getEmployeeData();
    allEmployeeData.value = await JSON.parse(allData);

    employeeData = JSON.parse(JSON.stringify(allEmployeeData.value));

    updateEmployeeId.value = route;

    const oldEmployeeData = employeeData.filter((value) => value.id == updateEmployeeId.value.params.id)

    newModel.value = oldEmployeeData[0];
})

onBeforeRouteLeave((to, from) => {

    if(to.path == "/createemployee"){
        newModel.value = {};
        document.getElementById("employeeId").value = 0;
        updateEmployeeId.value = 0
    }

})

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

        employeeStore.setEmployeeData(allEmployeeData.value)

    }
    else{

        allEmployeeData.value = JSON.parse(await get("employeeData"));

        const updatedEmployeeData = allEmployeeData.value.map((value) => value.id == document.getElementById("employeeId").value ? { ...value, name: newModel.value.name, email: newModel.value.email, number: newModel.value.number, address: newModel.value.address, designation: newModel.value.designation, salary: newModel.value.salary, work: newModel.value.work, hobbies: updateHobbies } : value);

        employeeStore.setEmployeeData(updatedEmployeeData)
        
    }

    document.getElementById("employeeId").value = 0;

    router.push("/employeelist");

}

</script>