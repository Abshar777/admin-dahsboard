import { createProduct, editProduct, getProductByID, getProducts, paroductDlt } from "@/api/product"
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";

export const useProducts = (id?: string) => {
    const apiFn = !id ? getProducts : getProductByID;
    const { data, isPending } = useQueryData(["products"], () => apiFn({ id: id }));

    const { mutate, isPending: isLoading, isSuccess } = useMutationData(["products"], (data) => createProduct(data), "products");


    const { mutate: editFn, isPending: editPending, isSuccess: editSuccess } = useMutationData(["products"], data => editProduct(data), "products");


    return { data, isPending, mutate, isLoading, editFn, editPending, editSuccess, isSuccess };
}

export const useproductDlt = (id: string) => {
    const { mutate, isPending, isSuccess } = useMutationData(
        ["productDlt"],
        () => paroductDlt(id),
        "products",
        // () => toast.success("catgroy deleted successfully")
    );
    return { mutate, isPending, isSuccess };
};



