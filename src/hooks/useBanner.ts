"use client"
import { bannerDlt, createBanner, getBannerById, getBanners, updateBanner } from "@/api/banner"
import { useMutationData } from "./useMutation"
import { useQueryData } from "./useQueryData";

export const useBanner = () => {

    const { data, isFetching } = useQueryData(["banner"], getBanners)


    const { mutate, isPending, isSuccess } = useMutationData(["banner"], (data) => createBanner(data), "banner");
    return { mutate, isPending, isSuccess, isFetching, data }
}


export const useBannerEdit = (id: string) => {
    const { data, isPending } = useQueryData(['bannerId'], () => getBannerById(id));

    const { mutate, isPending: isLoading ,isSuccess} = useMutationData(["bannerId"], (data) => updateBanner(data), "banner")

    return { data, isPending,mutate,isLoading,isSuccess }
}

export const useDltBanner = (id: string) => {
    const { mutate, isPending,isSuccess } = useMutationData(
        ["dltBanner"],
        () => bannerDlt(id),
        "banner"
    );
    return { mutate,isPending,isSuccess}
}
