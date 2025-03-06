"use client";
import {
  createCategory,
  dltCategory,
  editCategory,
  getCategoryById,
  getCategorys,
} from "@/api/category";
import { useQueryData } from "./useQueryData";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import categorySchema from "@/schema/categorySchem";
import { toast } from "sonner";

export const useCategory = (enabled = true) => {
  const { data, isPending } = useQueryData(["category"], getCategorys, {
    enabled,
  });

  const {
    mutate,
    isPending: categoryCreationPending,
    isSuccess,
  } = useMutationData(["category"], createCategory, "category");

  const { form, formState, onFormSubmit } = useZodForm(categorySchema, mutate, {
    isActive: true,
    category: "",
  });

  return {
    mutate,
    data,
    isPending,
    categoryCreationPending,
    form,
    formState,
    onFormSubmit,
    isSuccess,
  };
};

export const useEditCategory = (id: string) => {
  const { data, isPending } = useQueryData(["categoryById"], () =>
    getCategoryById(id)
  );

  const {
    mutate,
    isPending: isEditing,
    isSuccess,
  } = useMutationData(
    ["category", id],
    (data) => editCategory({ ...data, _id: id }),
    "category"
  );

  return { data, isPending, mutate, isEditing, isSuccess };
};

export const useDltCategory = (id: string) => {
  const { mutate, isPending,isSuccess } = useMutationData(
    ["categoryDlt"],
    () => dltCategory(id),
    "category",
    // () => toast.success("catgroy deleted successfully")
  );
  return { mutate, isPending,isSuccess };
};
