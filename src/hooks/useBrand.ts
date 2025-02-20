import { createBrand, getBrand } from "@/api/brand";
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";

export const useBrand=(enabled=true)=>{
    const {data,isPending}=useQueryData(["brand"],getBrand,{
        enabled,
    });

    const {mutate,isPending:creationPending,isSuccess}=useMutationData(["brand"],createBrand)
    return {data,isPending,mutate,creationPending,isSuccess}
}