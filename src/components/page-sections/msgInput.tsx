"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useSendMsg } from "@/hooks/useMsg";

export const MsgInput = () => {
  const { input, setInput, isPending, formSubmit } = useSendMsg();
  return (
    <div className="border-t border-border p-4">
      <form onSubmit={formSubmit} className="flex gap-2">
        <Input
          disabled={isPending}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button disabled={input.trim() == "" || isPending}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  );
};
