import { getProducts } from "@/api/product"
import { useQueryData } from "./useQueryData"

export const useProducts = () => {
    const { data, isPending } = useQueryData(["products"], ()=>getProducts());
    return { data, isPending }
}


