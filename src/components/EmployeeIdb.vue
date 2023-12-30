<script>
import { openDB } from 'idb';

const dbPromise = openDB("AllEmployeeDB", 1, {
    upgrade(db){
        db.createObjectStore("keys");
    }
})

export const get = async (key) => {
    return (await dbPromise).get("keys", key);  
}

export const set = async (value, key) => {
    return (await dbPromise).put("keys", value, key);
}
</script>