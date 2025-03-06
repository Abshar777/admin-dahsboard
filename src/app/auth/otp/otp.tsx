"use client"
import { OtpForm } from "@/components/forms/otpForm";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { useModalStore } from "@/store/uiStore";
import { Button } from "@heroui/react";

interface Props {}

const otp = (props: Props) => {
  const { isOpen, closeModal } = useModalStore();
  console.log(isOpen,"open modal")
  return (
    <Dialog open={isOpen} onOpenChange={open=>!open&&closeModal()}>
       <DialogContent>
        <DialogHeader className="text-center">
          <DialogTitle className="text-center font-semibold">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-center">
           the otp will on your mail, do not want share that 
          </DialogDescription>

        </DialogHeader>
        <OtpForm/>
      </DialogContent>
    </Dialog>
  );
};

export default otp;
