import { SUBCATEGORY_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getSubCategorys = async () => {
    const response = await AxiosInstance.get(`${SUBCATEGORY_URL}/data`)
    return response.data
}

export const getSubCategoryById = async (id: string) => {
    const response = await AxiosInstance.get(`${SUBCATEGORY_URL}/${id}`)
    return response.data
}


export const addSubCategory = async (data: { category: string, name: string }) => {
    const payload = { categoryId: data.category, subcategory: data.name }
    const response = await AxiosInstance.post(`${SUBCATEGORY_URL}/`, payload)
    return response.data
}


export const editSubCategory = async (data: { category: string, name: string, id: string }) => {
    const payload = { categoryId: data.category, subcategory: data.name }
    const response = await AxiosInstance.patch(`${SUBCATEGORY_URL}/${data.id}`, payload)
    return response.data
}



export const getCategoryBySub = async (id: string) => {
    const response = await AxiosInstance.get(`${SUBCATEGORY_URL}/category-id?categoryId=${id}`)
    return response.data
}


export const subCatgeoryDlt = async (id: string) => {
    const response = await AxiosInstance.patch(`${SUBCATEGORY_URL}/delete/${id}`)
    return response.data
}



