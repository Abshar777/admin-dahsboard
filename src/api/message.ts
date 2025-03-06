import  {MSG_API } from "@/constants/api";
import AxiosInstance from "@/utils/axios";

export interface IMsg{
    chatId?:string;
    sender:string;
    text:string;
}

export const sendMessage = async (data:IMsg) => {
    const res = await AxiosInstance.post(`${MSG_API}/send`, data);
    return res.data
}

export const getMessageByUser = async (chatId:string) => {
    const res = await AxiosInstance.get(`${MSG_API}/${chatId}`);
    return res.data
}
