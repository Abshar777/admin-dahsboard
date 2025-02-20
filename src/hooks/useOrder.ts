import { getOrders } from "@/api/order"
import { useQueryData } from "./useQueryData"

export const useOrder=()=>{
    const {data,isPending}=useQueryData(["order"],getOrders);
    return {data, isPending}
}