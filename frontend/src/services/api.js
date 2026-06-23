import axios from "axios";

const API = axios.create({
    baseURL: "https://opsmind-backend-ujiv.onrender.com/api",
});

export default API;