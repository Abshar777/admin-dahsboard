import { getServiceOrders } from "@/api/order"
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";

export const useService = () => {
    const { data, isPending } = useQueryData(["service"], getServiceOrders);
    return { data, isPending }
}
