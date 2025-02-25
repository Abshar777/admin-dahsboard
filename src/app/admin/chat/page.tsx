"use client";

import { useState } from "react";
import {
  PenBox,
  Send,
  Search,
  Settings,
  Mail,
  Calendar,
  Hash,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@heroui/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function ChatApp() {
  const [input, setInput] = useState("");

  const chats = [
    { id: 1, name: "general", icon: Hash, active: true, unread: 3 },
    { id: 2, name: "updates", icon: Mail },
    { id: 3, name: "team", icon: Calendar },
    { id: 4, name: "design", icon: Hash },
    { id: 5, name: "settings", icon: Settings },
  ];

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

  return (
    <div className="dark flex border-t  h-full bg-background">
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
          <ScrollArea className="flex-1 max-h-[75vh] px-2">
            <div className="space-y-2 p-2">
              {chats.map((chat) => (
                <Button size="lg"
                  key={chat.id}
                  className={`
                    flex items-center gap-2 w-full transition-all ease-in duration-[.1s] rounded-md px-3 py-4 text-sm font-medium
                    ${
                      chat.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  <Avatar>
                    <AvatarImage
                      src={ "https://via.placeholder.com/50"}
                   
                    />
                    <AvatarFallback className="bg-muted/90">
                   ab
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-left"># {chat.name}</span>
                  {chat.unread && (
                    <span className="rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                      {chat.unread}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <main className="flex h-full flex-col">
          <header className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <h1 className="text-lg font-semibold text-foreground">
                # general
              </h1>
            </div>
          </header>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <form className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
