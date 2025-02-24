import { BRAND_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getBrand = async () => {
    const response = await AxiosInstance.get(`${BRAND_URL}/data`);
    return response.data;
}

export const createBrand = async (data: { brand: string }) => {
    const response = await AxiosInstance.post(`${BRAND_URL}/`, data);
    return response.data;
}


export const editBrand = async (data: { brand: string, isDisabled: boolean, _id: string }) => {
    const response = await AxiosInstance.patch(`${BRAND_URL}/${data._id}`, data);
    return response.data;
}

export const dleBrand = async (id:string) => {
    const response = await AxiosInstance.patch(`${BRAND_URL}/delete/${id}`);
    return response.data;
}