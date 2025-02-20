import { addSubCategory, editSubCategory, getCategoryBySub, getSubCategoryById, getSubCategorys } from "@/api/subCategory";
import { useQueryData } from "./useQueryData";
import { useMutationData } from "./useMutation";

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




