"use client";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@heroui/react";
import Chats from "@/components/page-sections/chats";
import { useEffect, useState } from "react";
import { useGetMsg } from "@/hooks/useMsg";
import Loader from "../global/loader";
import { Skeleton } from "../ui/skeleton";
import { MsgInput } from "./msgInput";
import ChatLotiie from "../animation/chatLoadingAnimation";

interface Props {}

const MessagePart = (props: Props) => {
  const messages = [
    { id: 1, role: "user", content: "Hey, how are you doing?" },
    {
      id: 2,
      role: "assistant",
      content: "I'm doing great! How can I help you today?",
    },
    { id: 3, role: "user", content: "I need help with my project." },
    {
      id: 4,
      role: "assistant",
      content:
        "Of course! I'd be happy to help. What specific aspects of your project would you like to discuss?",
    },
  ];
  const { data, isPending, name } = useGetMsg();
  return (
    <main className="flex h-full flex-col">
      {data && (data as any).messages && !!(data as any).messages.length && (
        <header className="border-b border-border p-4">
          {data ? (
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <h1 className="text-lg font-semibold text-foreground">
                # {name}
              </h1>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Skeleton className="w-[2rem] h-[2rem] bg-muted-foreground/10 rounded-full " />
              <Skeleton className="rounded-lg w-1/2 h-5 bg-muted-foreground/10" />
            </div>
          )}
        </header>
      )}

      {data && (data as any).messages && (
        <ScrollArea className="flex-1  p-4">
          <div className="space-y-4 h-full w-full">
            {(data as any).messages.length ? (
              (data as any).messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex ${
                    message.sender === null ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      !message.role
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full  h-screen -mt-[2rem] flex items-center justify-center">
                <ChatLotiie />
              </div>
            )}
          </div>
        </ScrollArea>
      )}
      {isPending && (
        <div className="flex-1  w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      <MsgInput />
    </main>
  );
};

export default MessagePart;
