"use client"
import { createBrand, dleBrand, editBrand, getBrand } from "@/api/brand";
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation";
import { brandEditSchema } from "@/schema/brandSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const useBrand = (enabled = true) => {
    const { data, isPending } = useQueryData(["brand"], getBrand, {
        enabled,
    });
    const { mutate, isPending: creationPending, isSuccess } = useMutationData(["brand"], createBrand)
    return { data, isPending, mutate, creationPending, isSuccess }
}

type TBrand = { brand: string, isDisabled: boolean, _id: string }


export const useEditBrand = (defaultValues: TBrand) => {

    const form = useForm<z.infer<typeof brandEditSchema>>({
        resolver: zodResolver(brandEditSchema),
        values: defaultValues,
    });


    const { mutate, isPending, isSuccess } = useMutationData(["brand"], (data) => editBrand({ ...data, _id: defaultValues._id }), "brand");

    const onFormSubmit = form.handleSubmit(
        async (values) => mutate(values),
        (err) => {
            Object.values(err).forEach((error: any) => {
                if (error?.message) toast.error(error.message.toString());
            });
        }
    );
    return { mutate, isPending, form, onFormSubmit, isSuccess }
}



export const useDltBrand = (id: string) => {
    const { mutate, isPending,isSuccess } = useMutationData(
        ["dltBrand"],
        () => dleBrand(id),
        "brand",
        () => toast.success("brand dleted successfully")
    );
    return { mutate,isPending,isSuccess}
}