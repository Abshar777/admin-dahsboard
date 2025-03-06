import { HOME_PAGE_SECTION } from "@/constants/api";
import AxiosInstance from "@/utils/axios";

export const createSection = async (data: { title: string,products:string[] }) => {
    const response = await AxiosInstance.post(`${HOME_PAGE_SECTION}/`, data);
    return response.data;
}

export const updateSection = async (data: { _id:string,title: string,products:string[] }) => {
    const response = await AxiosInstance.put(`${HOME_PAGE_SECTION}/${data._id}`, data);
    return response.data;
}


export const getSections = async () => {
    const response = await AxiosInstance.get(`${HOME_PAGE_SECTION}/`);
    return response.data;
}


export const getSectionById=async(id:string) => {
    const response = await AxiosInstance.get(`${HOME_PAGE_SECTION}/${id}`);
    return response.data;
}

export const dltSection=async(id:string) => {
    const response = await AxiosInstance.delete(`${HOME_PAGE_SECTION}/${id}`);
    return response.data;
}