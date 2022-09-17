import axios from "axios";

const axiosCreate = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export default axiosCreate;