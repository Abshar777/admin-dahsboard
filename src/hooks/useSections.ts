"use client"
import { useForm } from "react-hook-form";
import { useProducts } from "./useProducts";
import { zodResolver } from "@hookform/resolvers/zod";
import sectionSchema from "@/schema/sectionSchema";
import { z } from "zod";
import { useMutationData } from "./useMutation";
import { createSection, getSections } from "@/api/section";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { IProduct } from "@/types/product";
import { useEffect, useState } from "react";
import { useQueryData } from "./useQueryData";

export const useSectionCreation = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    const router = useRouter()
    const defaultValues = {
        title: "",
        products: [],
    };
    const { data, isPending: isLoading } = useProducts();

    const form = useForm<z.infer<typeof sectionSchema>>({
        resolver: zodResolver(sectionSchema),
        values: defaultValues,
    });

    const { mutate, isPending } = useMutationData(["sectionCreation"], (data) => createSection(data), "section", onSuccess);


    const onFormSubmit = form.handleSubmit(
        async (values) => mutate(values),
        (err) => {
            Object.values(err).forEach((error: any) => {
                if (error?.message) toast.error(error.message.toString());
            });
        }
    );

    function onSuccess() {
        router.push('/admin/section')
        toast.success("Section created successfully");
        form.reset();
    }

    useEffect(() => {
        if (data) setProducts((data as any)?.products);
    }, [data]);

    return { products, form, onFormSubmit, isPending, isLoading }


}


export const useSection = () => {
    const { data, isPending } = useQueryData(["section"], getSections)
    return { data, isPending }
}