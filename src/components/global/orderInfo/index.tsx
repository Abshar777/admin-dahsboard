"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, IndianRupee, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AnimatedButton from "../globalButton";
import { useEditOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import { Button } from "@heroui/react";
import { useCreateChat } from "@/hooks/useChat";

interface OrderDetailsModalProps {
  order: {
    _id: string;
    user: {
      _id:string;
      username: string;
      email: string;
      phone?: string;
      img?: string;
    };
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipcode: string;
    };
    product: {
      productName: string;
      price: number;
      qty: number;
      images: {
        image1: string;
      };
      discountInPercentage: number;
    };
    grandTotal: number;
    status: string;
    orderPlacedOn: string;
  };
}

const OrderInfo = ({ order }: OrderDetailsModalProps) => {
  const [status, setStatus] = useState(order.status);
  const { mutate, isPending, isSuccess } = useEditOrder({ id: order._id });
  const statusOptions = [
    "Placed",
    "Shipped",
    "Delivered",
    "Returned",
    "Cancelled",
  ];

  const handleStatusChange = (newStatus: string) => {
    mutate(newStatus);
    setStatus(newStatus);
  };

  const { mutate: CreateChatFn, isPending: chatPending } = useCreateChat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Placed":
        return "bg-yellow-500 hover:bg-yellow-500/50 cursor-pointer";
      case "processing":
        return "bg-blue-500 hover:bg-blue-500/50 cursor-pointer";
      case "Shipped":
        return "bg-purple-500 hover:bg-purple-500/50 cursor-pointer";
      case "Delivered":
        return "bg-green-500 hover:bg-green-500/50 cursor-pointer";
      case "Cancelled":
        return "bg-red-500 hover:bg-red-500/50 cursor-pointer";
      default:
        return "bg-gray-500 hover:bg-gray-500/50 cursor-pointer";
    }
  };

  return (
    <ScrollArea className="max-h-[600px] space-y-4">
      <div className="flex gap-4">
        <Avatar className="w-32 h-32 object-cover relative  rounded-lg">
          {order.product.discountInPercentage > 0 && (
            <div className="absolute p-1 right-0">
              <Badge variant="destructive">
                {order.product.discountInPercentage}%
              </Badge>
            </div>
          )}
          <AvatarImage
            className="object-cover"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${order.product.images.image1}`}
            alt={order.product.productName}
          />
          <AvatarFallback>
            {order.product.productName.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-lg font-semibold">{order.product.productName}</p>
          <p className="text-gray-600 flex items-center gap-1">
            {order.product.price}
            INR
          </p>
          <p>
            <strong>Quantity:</strong> {order.product.qty}
          </p>
          <p className="font-semibold flex items-center gap-2">
            <Calendar size={16} /> Order Placed On:{" "}
            {new Date(order.orderPlacedOn).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Truck size={16} />
            <Select
              disabled={isPending}
              onValueChange={handleStatusChange}
              defaultValue={status}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue
                  placeholder={
                    <Badge
                      className={`${getStatusColor(order.status)} text-white`}
                    >
                      {order.status}
                    </Badge>
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    <Badge className={`${getStatusColor(option)} text-white `}>
                      {option}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex mb-2 mt-2 items-center justify-between gap-4 p-4 bg-muted/20 rounded-lg">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={order.user?.img || "https://via.placeholder.com/50"}
              alt={order.user.username}
            />
            <AvatarFallback>{order.user.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{order.user.username}</p>
            <p className="text-gray-600">{order.user.email}</p>
            {order.user.phone && (
              <p className="text-gray-600">📞 {order.user.phone}</p>
            )}
          </div>
        </div>
        <AnimatedButton
          size={"sm"}
          type="button"
          text="message"
          loadingText=""
          className="px-0"
          onClick={() => {
            CreateChatFn(order.user._id);
          }}
          isLoading={chatPending}
          disabled={chatPending}
        />
      </div>

      <div className="p-4 mb-2 bg-muted/20 rounded-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin size={16} /> Shipping Address
        </h3>
        <p className="px-1 text-muted-foreground">
          {order.shippingAddress.state}, {order.shippingAddress.zipcode}
        </p>
      </div>

      <p className="font-semibold text-lg flex items-center gap-1">
        Grand Total: {order.grandTotal} INR
      </p>
    </ScrollArea>
  );
};

export default OrderInfo;
