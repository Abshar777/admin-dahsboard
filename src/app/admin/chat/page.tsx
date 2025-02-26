"use client";
import {
  Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import Chats from "@/components/page-sections/chats";
import MessagePart from "@/components/page-sections/messagePart";

export default function ChatApp() {
 

  return (
    <div className=" flex border-t  h-full bg-background">
      <div className="grid flex-1 grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="flex h-full flex-col border-r border-border ">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Chats</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search chats..."
                className="pl-8 h-9 bg-muted"
              />
            </div>
          </div>
          <Chats />
        </div>

        {/* Main Chat Area */}
        <MessagePart />
      </div>
    </div>
  );
}
