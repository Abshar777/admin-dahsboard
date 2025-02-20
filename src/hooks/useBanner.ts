"use client"
import { createBanner, getBanners } from "@/api/banner"
import { useMutationData } from "./useMutation"
import { useQueryData } from "./useQueryData";

export const useBanner = () => {

    const { data, isFetching } = useQueryData(["banner"], getBanners)


    const { mutate, isPending, isSuccess } = useMutationData(["banner"], (data) => createBanner(data), "banner");
    return { mutate, isPending, isSuccess,isFetching,data }
}