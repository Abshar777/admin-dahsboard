"use client";
import { z } from "zod";
import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const useZodForm = <T extends z.ZodSchema>(
  schema: T,
  mutation: UseMutateFunction<any, any, z.infer<T>>,
  defaultValues?: z.infer<T>
) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, formState, ...rest } = form;

  const onFormSubmit = handleSubmit(
    async (values) => mutation(values),
    (err) => {
      Object.values(err).forEach((error: any) => {
        if (error?.message) toast.error(error.message.toString());
      });
    }
  );

  return { form, formState,errors:formState.errors, onFormSubmit, ...rest };
};

export default useZodForm;
