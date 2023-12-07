<template>

    <h1>Employee Form</h1>
    <br>
    <form @submit.prevent="employeeForm" id="employeeForm">
        <div>
            <label>Name*</label>
            <input type="text" v-model="employeeName" >
        </div>
        <div>
            <label>Email*</label>
            <input type="email" v-model="employeeEmail">
        </div>
        <div>
            <label>Number*</label>
            <input type="number" v-model="employeeNumber">
        </div>
        <div>
            <label>Address*</label>
            <textarea v-model="employeeAddress"></textarea>
        </div>
        <div>
            <label>Designation*</label>
            <select v-model="employeeDesignation">
                <option value="">--- Select your designation ---</option>
                <option value="Web Developer">Web Developer</option>
                <option value="Application Developer">Application Developer</option>
                <option value="Game Developer">Game Developer</option>
            </select>
        </div>
        <div>
            <label>Salary*</label>
            <input type="number" v-model="employeeSalary">
        </div>
        <div>
            <label>Where will you work from?*</label>
            <div>
                <input type="radio" value="Remote" v-model="employeeWork">
                <span>Remote</span>
            </div>
            <div>
                <input type="radio" value="Hybrid" v-model="employeeWork">
                <span>Hybrid</span>
            </div>
            <div>
                <input type="radio" value="Office" v-model="employeeWork">
                <span>Office</span>
            </div>
        </div>
        <div>
            <label>Hobbies*</label>
            <div>
                <input type="checkbox" value="Reading" v-model="employeeHobbies">
                <span>Reading</span>
            </div>
            <div>
                <input type="checkbox" value="Writing" v-model="employeeHobbies">
                <span>Writing</span>
            </div>
            <div>
                <input type="checkbox" value="Traveling" v-model="employeeHobbies">
                <span>Traveling</span>
            </div>
        </div>
        <input type="submit" value="Submit">
    </form>

    <br><br>

    <table border="1">
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
            </tr>
        </thead>
        <tbody>
            <tr v-for="(value, index) in employeeDatas.value">
                <td>{{ value.id }}</td>
                <td>{{ value.name }}</td>
                <td>{{ value.email }}</td>
                <td>{{ value.number }}</td>
                <td>{{ value.address }}</td>
                <td>{{ value.designation }}</td>
                <td>{{ value.salary }}</td>
                <td>{{ value.work }}</td>
                <td>
                    <ul>
                        <li v-for="val in value.hobbies">{{ val }}</li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script setup>

    import { onBeforeMount, ref  } from 'vue';
    import { set, get } from './EmployeeIdb.vue';

    let employeeName = ref("");
    let employeeEmail = ref("");
    let employeeNumber = ref("");
    let employeeAddress = ref("");
    let employeeDesignation = ref("");
    let employeeSalary = ref("");
    let employeeWork = ref("");
    let employeeHobbies = ref([]);

    // ref

    let employeeDatas = ref([]);
    
    onBeforeMount(async () => {

        employeeDatas.value = await get("employeeData"); 

        console.log(employeeDatas.value);

    })

   async function employeeForm() {

        const updateHobbies = [];

        for (const item in employeeHobbies.value) {
            updateHobbies.push(employeeHobbies.value[item])
        }
        
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

        employeeDatas.value.push(employeeData);

       await set(JSON.parse(JSON.stringify(employeeDatas.value)), "employeeData")

        window.location.reload(true);

    }

</script>