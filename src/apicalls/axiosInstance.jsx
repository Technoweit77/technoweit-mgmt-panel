import axios from "axios";
export const createInstance = () => {
    let Base_URL = "http://localhost:5115/api/"

    let mInstance = axios.create({
        baseURL: Base_URL,
        timeout: 3000,
    })

    mInstance.interceptors.request.use(
        async (config) => {
            // Add any custom headers or configurations here
            // For example, you can add an Authorization header if needed
            const mytoken = localStorage.getItem("auth-token");
            if (mytoken) {
                config.headers.Authorization = `Bearer ${mytoken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )
    return mInstance
}