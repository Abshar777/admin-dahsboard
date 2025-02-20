import { getOrderById, getOrders } from "@/api/order"
import { useQueryData } from "./useQueryData"

export const useOrder=()=>{
    const {data,isPending}=useQueryData(["order"],getOrders);
    return {data, isPending}
}


export const useOrderById=({id}:{id:string})=>{
    const {data,isPending}=useQueryData(["orderByID"],()=>getOrderById(id));
    return {data, isPending}
}