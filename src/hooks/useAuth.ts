"use client";
import loginSchema from "@/schema/loginSchema";
import { login, verifyOtp } from "@/api/auth";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { useModalStore } from "@/store/uiStore";
import { signIn } from "next-auth/react"
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";

export const useAuth = () => {
    const router=useRouter()
    const { openModal, closeModal } = useModalStore()
    const { mutate, isPending, error: mutationError, isSuccess } = useMutationData(['user'],
        (data) => login(data),
        "user",
        onSubmit
    )
    const { register, onFormSubmit, errors, reset, getValues } = useZodForm(loginSchema, mutate)
    function onSubmit(response: { data: any }) {
        openModal("otp");
        localStorage.setItem("contact", getValues("email"))
     

    }


    const { mutate: otpMutate, isPending: otpPending } = useMutationData(["otp"], (data) => verifyOtp(data), "otp", otpSubmit)

  async function otpSubmit(response: { userData: any }) {
  
        toast.success("otp verify successfully")
        const result = await signIn("credentials", {
            email:response.userData.email,
            name:response.userData.username,
            id:response.userData._id,
            redirect: false
          })
          closeModal();
          if (result?.error) {
            toast.error(result.error)
          }else{
            router.push("/admin/dashboard")
          }

    }

    function otpMutation(otp: string) {
        const email = localStorage.getItem("contact")
        otpMutate({ otpCode: otp, contact: email })
    }




    return { register, onFormSubmit, errors, reset, isPending, mutationError, isSuccess, otpMutation, otpPending }



}

