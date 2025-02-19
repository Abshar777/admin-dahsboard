import { PRODUCTS_URL } from "@/constants/api";
import AxiosInstance from "@/utils/axios";

export const getProducts = async (filters?: {
    categories?: string | undefined;
    search?: string | undefined;
    page: number;
    limit: number;
}) => {
    const params = new URLSearchParams();

    // Append non-array values
    // Object.entries(filters).forEach(([key, value]) => {
    //     if (Array.isArray(value)) {
    //         value.forEach((val) => params.append(key, val)); // Handle arrays
    //     } else if (value !== undefined) {
    //         params.append(key, value.toString());
    //     }
    // });
    const response = await AxiosInstance.get(`${PRODUCTS_URL}/data?${params.toString()}`);
    return response.data;
}