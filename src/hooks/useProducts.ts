import { createProduct, getProducts } from "@/api/product"
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";

export const useProducts = () => {
    const { data, isPending } = useQueryData(["products"], () => getProducts());

    const { mutate, isPending: isLoading } = useMutationData(["products"], (data) => createProduct(data), "products");
    return { data, isPending, mutate, isLoading };
}


