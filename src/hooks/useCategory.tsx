"use client";
import { createCategory, getCategorys } from "@/api/category";
import { useQueryData } from "./useQueryData";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import categorySchema from "@/schema/categorySchem";

export const useCategory = (enabled = true) => {
  const { data, isPending } = useQueryData(["category"], getCategorys, {
    enabled,
  });

  const { mutate, isPending: categoryCreationPending,isSuccess } = useMutationData(
    ["category"],
    createCategory,
    "category"
  );

  const { form, formState, onFormSubmit } = useZodForm(categorySchema, mutate, {
    isActive: true,
    category:""
  });

  return {
    mutate,
    data,
    isPending,
    categoryCreationPending,
    form,
    formState,
    onFormSubmit,
    isSuccess
  };
};
