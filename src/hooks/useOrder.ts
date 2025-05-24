import { getOrderById, getOrders, getReturnedOrders, updateOrderStatus, updateReturnedOrder } from "@/api/order"
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
    const { mutate, isPending, isSuccess } = useMutationData(['orderStatus'], (status: string) => updateOrderStatus(id, status), "order");

    return { isPending, mutate, isSuccess }

}



export const useReturnedOrders = () => {
    const { data, isPending } = useQueryData(["returnedOrders"], getReturnedOrders);
    return { data, isPending }
}


export const useUpdateReturnedOrder = ({ id }: { id: string }) => {
    const { mutate, isPending, isSuccess } = useMutationData(['returnedOrder'], (returnedRequest: string) => updateReturnedOrder(id, returnedRequest), "order");
    return { isPending, mutate, isSuccess }
}
