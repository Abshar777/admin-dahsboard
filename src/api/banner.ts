import { BANNER_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const createBanner = async (data: { img: FileList }) => {
    console.log(data)
    const formData = new FormData();
    formData.append(`image`, data.img[0]);
    const res = await AxiosInstance.post(`${BANNER_URL}/`, formData);
    return res.data
}


export const getBanners = async () => {
    const response = await AxiosInstance.get(`${BANNER_URL}/`);
    return response.data
}

export const getBannerById = async (id: string) => {
    const response = await AxiosInstance.get(`${BANNER_URL}/${id}`);
    return response.data
}


export const updateBanner = async (data: { img: FileList,id:string }) => {
    console.log(data)
    const formData = new FormData();
    formData.append(`image`, data.img[0]);
    const res = await AxiosInstance.put(`${BANNER_URL}/${data.id}`, formData);
    return res.data
}