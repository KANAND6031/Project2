import axios from "axios";

const API = axios.create({
    baseURL: "https://your-render-app.onrender.com/api",
});

export default API;