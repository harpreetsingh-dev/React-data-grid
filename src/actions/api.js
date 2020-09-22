import axios from "axios";

const baseUrl = "http://localhost:55848/api/"


export default {

    emp(url = baseUrl + 'emps/') {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url+"create", newRecord),
            delete: Id => axios.delete(url + Id),
            update: (updateRecord) => axios.put(url+"Update",updateRecord),
            fetchDepList: () => axios.get(url+"DepList"),
        }
    }
}