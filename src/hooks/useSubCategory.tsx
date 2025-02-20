import { getSubCategorys } from "@/api/subCategory"
import { useQueryData } from "./useQueryData"


export const useSubCategory=()=>{
    const {data,isPending}=useQueryData(["order"],getSubCategorys);
    return {data,isPending}
}