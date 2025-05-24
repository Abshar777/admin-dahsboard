import { ORDERS_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getOrders=async()=>{
    const {data}=await AxiosInstance.get(`${ORDERS_URL}`);
    return data
}

export const getServiceOrders=async()=>{
    const {data}=await AxiosInstance.get(`${ORDERS_URL}/service`);
    return data
}

export const getOrderById=async(id:string)=>{
    const {data}=await AxiosInstance.get(`${ORDERS_URL}/${id}`);
    return data
}

export const updateOrderStatus=async(id:string,status:string)=>{
    const {data}=await AxiosInstance.post(`${ORDERS_URL}/${id}`,{status});
    return data
}


export const getReturnedOrders=async()=>{
    const {data}=await AxiosInstance.get(`${ORDERS_URL}/returned`);
    return data
}

export const updateReturnedOrder=async(id:string,returnedRequest:string)=>{
    const {data}=await AxiosInstance.put(`${ORDERS_URL}/returned/${id}`,{returnedRequest});
    return data
}
