import { AUTH_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"



export const login=async(data:{email:string, password:string})=>{
    const response=await AxiosInstance.post(`${AUTH_URL}/owner/login`,{
        loginId:data.email, 
        password:data.password
    });
    return response.data
}   

export const verifyOtp=async(data:{otpCode:string,contact:string})=>{
    const response=await AxiosInstance.post(`${AUTH_URL}/owner/verify-otp`,data);
    return response.data
}


