import { CATEGORY_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getCategorys = async () => {
    const response = await AxiosInstance.get(`${CATEGORY_URL}/data`)
    return response.data
}

export const createCategory = async (data: { category: string, isActive: boolean, img: File[] }) => {
    console.log(data)
    const formData = new FormData()
    formData.append('category', data.category)
    formData.append('isActive', data.isActive.toString())
    formData.append('img', data.img[0])

    const response = await AxiosInstance.post(`${CATEGORY_URL}/`, formData, {
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
    })
    return response.data
}