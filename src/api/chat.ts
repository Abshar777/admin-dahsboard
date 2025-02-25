import { CHAT_API } from "@/constants/api";
import AxiosInstance from "@/utils/axios";

export const createChat = async (id: string) => {
    const res = await AxiosInstance.post(`${CHAT_API}/create`, { userId:id });
    return res.data
}

export const getChatByUser = async (id: string) => {
    const res = await AxiosInstance.post(`${CHAT_API}/${id}`, { userId:id });
    return res.data
}
