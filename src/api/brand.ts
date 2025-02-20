import { BRAND_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getBrand = async () => {
    const response = await AxiosInstance.get(`${BRAND_URL}/data`);
    return response.data;
}

export const createBrand=async(data:{brand:string})=>{
    const response=await AxiosInstance.post(`${BRAND_URL}/`,data);
    return response.data;
}