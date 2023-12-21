import { createRouter, createWebHistory } from "vue-router";
import CreateEmployee from "./components/CreateEmloyee.vue";
import EmployeeForm from "./components/EmployeeForm.vue";

const routes = [
    { path: '/createemployee', component: CreateEmployee },
    { path: '/employeelist', component: EmployeeForm },
    { path: '/edit/:id', component: CreateEmployee }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router