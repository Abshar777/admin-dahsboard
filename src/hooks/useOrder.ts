import { getOrderById, getOrders, updateOrderStatus } from "@/api/order"
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";

export const useOrder = () => {
    const { data, isPending } = useQueryData(["order"], getOrders);
    return { data, isPending }
}


export const useOrderById = ({ id }: { id: string }) => {
    const { data, isPending } = useQueryData(["orderByID"], () => getOrderById(id));
    return { data, isPending }
}



export const useEditOrder = ({ id }: { id: string }) => {
    const {mutate,isPending,isSuccess } = useMutationData(['orderStatus'], (status:string) => updateOrderStatus(id, status), "order");

    return { isPending, mutate, isSuccess }
 
}