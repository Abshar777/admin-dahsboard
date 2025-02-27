"use client"
import { createChat, getChatByUser } from "@/api/chat"
import { useMutationData } from "./useMutation"
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryData } from "./useQueryData"
import { getMessageByUser, IMsg, sendMessage } from "@/api/message";
import { useEffect, useState } from "react";

export const useSendMsg = () => {
    const [input, setInput] = useState("");
    const searchparams = useSearchParams()
    const chatId = searchparams.get("id");
    const { mutate, isPending } = useMutationData(
        ["msgSend"],
        (data: IMsg) => sendMessage({ ...data, chatId }),
        "msg",
        ()=>setInput("")
    );
    function formSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (input.trim() == "") return;
        mutate({ sender: "admin", text: input });
    }

    return { mutate, isPending, input, setInput, formSubmit,chatId }
}


export const useGetMsg = () => {
    const [name, setName] = useState<string | null>(null);
    const searchparams = useSearchParams()
    const chatId = searchparams.get("id");
    const { data, isPending,refetch } = useQueryData(["msg"], () => getMessageByUser(chatId));

    useEffect(() => {
        if (data && (data as any).chat) {
            setName((data as any).chat.users[0].username);
        }
    }, [data]);

    useEffect(()=>{
        refetch()
    },[chatId])

    return { data, isPending,name,chatId }
}