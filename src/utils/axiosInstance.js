import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? BASE_URL : "/",
    baseURL: BASE_URL,
    timeout: 1000,  // Timeout in milliseconds (1 second)
    headers: {      // Correct capitalization
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.authorization = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

