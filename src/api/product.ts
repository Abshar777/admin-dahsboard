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



export const createProduct = async (data: {
    productName: string,
    productDescription: string,
    barcode: string,
    brand: string,
    price: string,
    modelNumber: string,
    serialNumber: string,
    discountInPercentage: string,
    inStock: string,
    category: string,
    images: File[]
}) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        formData.append(key, JSON.stringify(value));
    }
    for (let i = 0; i < data.images.length; i++) {
        formData.append(`image${i + 1}`, data.images[i]);
    }
    const response = await AxiosInstance.post(`${PRODUCTS_URL}/`,formData);
    return response.data
}