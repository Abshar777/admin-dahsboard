import { BANNER_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const createBanner = async (data: { img: FileList,title:string,mobileImg:FileList,page:string }) => {
    console.log(data)
    const formData = new FormData();
    formData.append(`image`, data.img[0]);
    formData.append(`mobileImg`, data.mobileImg[0]);
    formData.append(`title`, data.title);
    formData.append(`page`, data.page);
    
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


export const updateBanner = async (data: { img: FileList,id:string,title:string,mobileImg:FileList,page:string }) => {
    const formData = new FormData();
    formData.append(`image`, data.img[0]);
    formData.append(`title`, data.title);
    formData.append(`mobileImg`, data.mobileImg[0]);
    formData.append(`page`, data.page);
    const res = await AxiosInstance.put(`${BANNER_URL}/${data.id}`, formData);
    return res.data
}



export const bannerDlt=async(id:string)=>{
    const response = await AxiosInstance.patch(`${BANNER_URL}/delete/${id}`);
    return response.data;
}