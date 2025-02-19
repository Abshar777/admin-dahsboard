import { CATEGORY_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getCategorys = async () => {
    const response = await AxiosInstance.get(`${CATEGORY_URL}/data`)
    return response.data
}