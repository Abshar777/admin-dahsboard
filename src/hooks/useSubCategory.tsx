import { addSubCategory, editSubCategory, getCategoryBySub, getSubCategoryById, getSubCategorys, subCatgeoryDlt } from "@/api/subCategory";
import { useQueryData } from "./useQueryData";
import { useMutationData } from "./useMutation";
import { toast } from "sonner";

export const useSubCategory = ({enabled=true}:{enabled:boolean,id?:string}) => {
  const { data, isPending } = useQueryData(["subCategory"], getSubCategorys,{
    enabled
  });

  const {
    mutate,
    isPending: isLoading,
    isSuccess,
  } = useMutationData(
    ["subCategory"],
    (data) => addSubCategory(data),
    "subCategory"
  );
  return { data, isPending,mutate,isLoading,isSuccess };
};


export const useSubCategoryEdit = ({enabled=true,id}:{enabled:boolean,id:string|undefined}) => {
  const { data, isPending } = useQueryData(["subCategoryEdit"], ()=>getSubCategoryById(id as string),{
    enabled
  });

  const {
    mutate,
    isPending: isLoading,
    isSuccess,
  } = useMutationData(
    ["subCategoryEdit"],
    (data) => editSubCategory({...data,id}),
    "subCategory"
  );
  return { data, isPending,mutate,isLoading,isSuccess };
};



export const useCetogeryBySubCategory=({id}:{id:string})=>{
  const {data,isPending,refetch}=useQueryData(["categiryBySub"],()=>getCategoryBySub(id));
  return {data, isPending,refetch}
}


export const useSubCategoryDlt = (id:string) => {
   const {
    mutate,
    isPending,
    isSuccess
  } = useMutationData(
    ["subCategoryDlt"],
    () => subCatgeoryDlt(id),
    "subCategory",
    // ()=>toast.success("succefully deleted subcategory")
  );
  return { mutate,isPending ,isSuccess};
};






