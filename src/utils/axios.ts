import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your API endpoint,
    withCredentials: true,
    // timeout: 10000
})

export default AxiosInstance;