import { reactive } from "vue"
import { get, set } from "./components/EmployeeIdb.vue";
import router from "./routes";

let pageNumber = 0;
let startNumber = 0;
let endNumber = 0;

const employeeStore = reactive({
    async setEmployeeData(data){
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
        else{
            
            const paginateData = employeeData.slice(startNumber, endNumber);
        
            return {paginateData, startNumber, endNumber};
    
        }
    },
    async filterEmployeeData(name) {

        const employeeData = JSON.parse(await get("employeeData"));

        const filterEmployeeData = employeeData.filter((value) => value.id == name || value.name == name || value.email == name || value.number == name || value.address == name || value.designation == name || value.salary == name || value.work == name);

        if (filterEmployeeData.length == 0 || name.length == 0) {
            
            return undefined;
            
        }
        else {
            
            return await filterEmployeeData;
    
        }

    }
})

export default employeeStore;