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



export const getCategoryById = async (id: string) => {
    const responce = await AxiosInstance.get(`${CATEGORY_URL}/${id}`)
    return responce.data
}

export const editCategory = async (data: { category: string, isActive: boolean, img: File[], _id: string }) => {
    const formData = new FormData()
    formData.append('category', data.category)
    formData.append('isActive', data.isActive.toString())
    formData.append('img', data.img[0])

    const response = await AxiosInstance.patch(`${CATEGORY_URL}/${data._id}`, formData)
    return response.data
}


export const dltCategory = async (id: string) => {
    const response = await AxiosInstance.patch(`${CATEGORY_URL}//delete/${id}`)
    return response.data
}







