import { reactive } from "vue"
import { get, set } from "./components/EmployeeIdb.vue";
import router from "./routes";

let pageNumber = 0;
let startNumber = 0;
let endNumber = 0;

let order = false;

let sortData = [];


const employeeStore = reactive({
    async setEmployeeData(data){
        pageNumber = 0;
        startNumber = 0;
        endNumber = 10;
        await set(JSON.stringify(data), "employeeData");
    },
    async getEmployeeData(){
        return await get("employeeData");
    },
    async deleteEmployeeData(id){
        const employeeData = JSON.parse(await get("employeeData"));

        const filterEmployeeDatas = employeeData.filter((value, index) => value.id !== id);

        pageNumber = 0;
        startNumber = 0;
        endNumber = 10;

        await set(JSON.stringify(filterEmployeeDatas), "employeeData");

        router.push("/");
    },
    async paginationNextPage(){

        const employeeData = JSON.parse(await get("employeeData"));
        pageNumber++;
        
        startNumber = pageNumber * 10;
        endNumber = startNumber + 10;
            
        if(pageNumber <= 0){
            const paginateData = employeeData.slice(startNumber, endNumber);
            
            return {paginateData, startNumber, endNumber}
        }
        else{
            const paginateData = employeeData.slice(startNumber, endNumber);
            
            document.getElementById("prevBtn").disabled = false;

            return {paginateData, startNumber, endNumber};
        }

    },
    async paginationPrevPage(){

        const employeeData = JSON.parse(await get("employeeData"));
        pageNumber--;

        startNumber = pageNumber * 10;
        endNumber = startNumber + 10;
            
        if(endNumber > employeeData.length || endNumber == employeeData.length){
    
            const paginateData = employeeData.slice(startNumber, endNumber);
            
            return {paginateData, startNumber, endNumber};
            
        }
        else if(pageNumber < 0){

            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;

            const paginateData = employeeData.slice(0, 10);
        
            return {paginateData, startNumber, endNumber};

        }
        else{
            
            const paginateData = employeeData.slice(startNumber, endNumber);
        
            return {paginateData, startNumber, endNumber};
    
        }

    },
    async filterEmployeeData(name) {

        const employeeData = JSON.parse(await get("employeeData"));

        const filterEmployeeData = employeeData.filter((value) => value.id == name || value.name == name || value.email == name || value.number == name || value.address == name || value.designation == name || value.salary == name || value.work == name);

        if (filterEmployeeData.length == 0 || name.length == 0) {
            
            return [];
            
        }
        else {
            
            return filterEmployeeData;
    
        }

    },
    sortEmployeeData : {
        sortById: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.id < b.id) ? -1 : 1 : (a.id > b.id) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByName: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.name < b.name) ? -1 : 1 : (a.name > b.name) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByEmail: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.email < b.email) ? -1 : 1 : (a.email > b.email) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByNumber: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.number < b.number) ? -1 : 1 : (a.number > b.number) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByAddress: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.address < b.address) ? -1 : 1 : (a.address > b.address) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByDesignation: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.designation < b.designation) ? -1 : 1 : (a.designation > b.designation) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortBySalary: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.salary < b.salary) ? -1 : 1 : (a.salary > b.salary) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
        sortByWork: async function(data){
            const empData = await JSON.parse(JSON.stringify(data));
            order = !order;
            sortData = empData.sort((a, b) => {
                return (order) ? (a.work < b.work) ? -1 : 1 : (a.work > b.work) ? -1 : 1;
            })
            await set(JSON.stringify(sortData), "employeeData");
            pageNumber = 0;
            startNumber = 0;
            endNumber = 10;
            return sortData;
        },
    }
})

export default employeeStore;