import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@heroui/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useGetChats } from "@/hooks/useChat";
import Loader from "../global/loader";
import Link from "next/link";

interface Props {}
interface IChat {
  _id: string;
  users: {
    _id: string;
    username: string;
  }[];
  active: boolean;
}

const Chats = ({}: Props) => {
  const { data, isPending,chatId } = useGetChats();
  return (
    <ScrollArea className="flex-1 max-h-[75vh] px-1">
      {data && (
        <div className="space-y-2 px-1 py-2">
          {data &&
            ((data as any).chats as IChat[]).map((chat) => (
              <Button
                size="lg"
                key={chat._id}
                className={`
                flex items-center gap-2 w-full transition-all ease-in duration-[.1s] rounded-md px-1 py-4 text-sm font-medium
                ${
                  chat._id==chatId
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }
              `}
              >
                <Link
                  className="flex items-center gap-2 w-full transition-all ease-in duration-[.1s]  text-sm font-medium"
                  href={`?id=${chat._id}`}
                >
                  <Avatar>
                    <AvatarImage src={"https://via.placeholder.com/50"} />
                    <AvatarFallback className="bg-muted/90">ab</AvatarFallback>
                  </Avatar>
                  <span className="flex-1 text-left">
                    # {chat?.users?.[0].username}
                  </span>
                  {/* {chat.unread && (
                <span className="rounded-full bg-destructive px-2 py-0.5 text-xs text-destructive-foreground">
                  {chat.unread}
                </span>
              )} */}
                </Link>
              </Button>
            ))}
        </div>
      )}
      {isPending && (
        <div className="flex  items-center justify-center w-full h-[60vh] ">
          <Loader />
        </div>
      )}
    </ScrollArea>
  );
};

export default Chats;
