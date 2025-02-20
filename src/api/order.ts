import { ORDERS_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getOrders=async()=>{
    const {data}=await AxiosInstance.get(`${ORDERS_URL}`);
    return data
}