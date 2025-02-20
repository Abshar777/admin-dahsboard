import { SUBCATEGORY_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getSubCategorys = async () => {
    const response = await AxiosInstance.get(`${SUBCATEGORY_URL}/data`)
    return response.data
}
