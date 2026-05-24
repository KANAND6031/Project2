import axios from "axios";

const API = axios.create({
    baseURL: "https://friendly-fortnight-4j69wqgx7ggphqqp4-5000.app.github.dev/api",
});

export default API;