<template>
    <div class="employee-form">
        <h1 class="text-3xl font-bold">Employee Form</h1>
        <FormKit type="form" submit-label="Submit" @submit="$emit('employeeForm', newModel)" v-model="newModel">
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

import { onBeforeUpdate, ref } from 'vue';

let newModel = ref({});

const props = defineProps(['updateEmpData'])

onBeforeUpdate(() => {
    newModel = props.updateEmpData
})

</script>