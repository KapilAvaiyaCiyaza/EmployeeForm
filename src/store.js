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

        await set(JSON.stringify(filterEmployeeDatas), "employeeData");

        router.push("/");
    },
    async paginationNextPage(){
        const employeeData = JSON.parse(await get("employeeData"));
        pageNumber++;
        
        startNumber = pageNumber * 10;
        endNumber = startNumber + 10;

        if(pageNumber <= 0){

            document.getElementById("prevBtn").disabled = true;
            document.getElementById("nextBtn").disabled = false;
    
            const paginaData = employeeData.slice(0, 10);
    
            return paginaData
    
        }
        else{
    
            const paginaData = employeeData.slice(startNumber, endNumber);
    
            return paginaData;
    
        }
    },
    async paginationPrevPage(){

        const employeeData = JSON.parse(await get("employeeData"));
        pageNumber--;

        startNumber = pageNumber * 10;
        endNumber = startNumber + 10;

        if(endNumber > employeeData.length || endNumber == employeeData.length){

            document.getElementById("nextBtn").disabled = true;
    
            const paginaData = employeeData.slice(startNumber, endNumber);
    
            return paginaData;
            
        }
        else{
            
            const paginaData = employeeData.slice(startNumber, endNumber);
        
            return paginaData;
    
        }
    
        document.getElementById("prevBtn").disabled = false;

    }
})

export default employeeStore;