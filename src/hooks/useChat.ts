"use client"
import { createChat,getChatByUser } from "@/api/chat"
import { useMutationData } from "./useMutation"
import { useRouter } from "next/navigation";
import { useQueryData } from "./useQueryData"

export const useCreateChat = () => {
    const router = useRouter()
    const { mutate, isPending } = useMutationData(
        ["chatCreate"],
        (id) => createChat(id),
        "chats",
        (data) => router.push(`/admin/chat?id=${data.chat._id}`)
    );
    return { mutate, isPending }
}


// export const useGetChats=()=>{
    
//     const { data, isPending } = useQueryData(["chats"],()=>getChatByUser(id), );
//     // const { mutate, isPending: creationPending, isSuccess } = useMutationData(["brand"], createBrand)
//     return { data, isPending }

// }