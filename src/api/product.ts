import { PRODUCTS_URL } from "@/constants/api";
import { Product } from "@/components/table/product/column";

import AxiosInstance from "@/utils/axios";

export const getProducts = async ({ filters, id }: {
    filters?: {
        categories?: string | undefined;
        search?: string | undefined;
        page: number;
        limit: number;
    }, id?: string
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
    images: File[];
    color: { hex: string, titile: string, image: FileList }[],
    deliveryCharge: string,
    serviceCharge: string
}) => {
    const formData = new FormData();
    const colorImg: File[] = [];
    for (const color of data.color) {
        const fileArray = Array.from(color.image);
        if (fileArray.length > 0) {
            colorImg.push(fileArray[0]);
        }
    }


    for (const [key, value] of Object.entries(data)) {
        formData.append(key, JSON.stringify(value));
    }
    for (let i = 0; i < data.images.length; i++) {
        formData.append(`image${i + 1}`, data.images[i]);
    }
    colorImg.forEach((file, index) => {
        formData.append(`colorImage${index + 1}`, file);
    });

    const response = await AxiosInstance.post(`${PRODUCTS_URL}/`, formData);
    return response.data
}



export const getProductByID = async ({ id }: { id?: string }) => {
    const { data } = await AxiosInstance.get(`${PRODUCTS_URL}/${id}`)
    return data;
}


export const editProduct = async (data: {
    _id: string,
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
    color: { hex: string, titile: string, image: FileList }[]
    images: File[]
}) => {
    const formData = new FormData();
    const colorImg: File[] = [];
    for (const color of data.color) {
        const fileArray = Array.from(color.image);
        if (fileArray.length > 0) {
            colorImg.push(fileArray[0]);
        }
    }
    colorImg.forEach((file, index) => {
        formData.append(`colorImage${index + 1}`, file);
    });

    for (const [key, value] of Object.entries(data)) {
        formData.append(key, JSON.stringify(value));
    }
    for (let i = 0; i < data.images.length; i++) {
        formData.append(`image${i + 1}`, data.images[i]);
    }
    const response = await AxiosInstance.patch(`${PRODUCTS_URL}/${data._id}`, formData);
    return response.data;
}



export const paroductDlt = async (id: string) => {
    const response = await AxiosInstance.patch(`${PRODUCTS_URL}/delete/${id}`);
    return response.data;
}