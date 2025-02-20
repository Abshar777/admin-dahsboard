import { BANNER_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const createBanner=async(data:{img:FileList})=>{
    console.log(data)
    const formData = new FormData();
    for (let i = 0; i < data.img.length; i++) {
        formData.append(`image${i + 1}`, data.img[i]);
    }
    const res=await AxiosInstance.post(`${BANNER_URL}/`,formData);
    return res.data
}


export const getBanners=async()=>{
    const response=await AxiosInstance.get(`${BANNER_URL}/`);
    return response.data
}