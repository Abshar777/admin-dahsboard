import { getCategorys } from "@/api/category";
import { useQueryData } from "./useQueryData";

export const useCategory = () => {
  const { data, isPending } = useQueryData(["category"], () => getCategorys());
  return { data, isPending };
};
