import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOrder } from "@/hooks/useOrder";
import { Calendar, IndianRupee, MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OrderDetailsModalProps {
  order: {
    id: string;
    user: {
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

const OderInfo = ({ order }: OrderDetailsModalProps) => {
  return (
    <>
      <ScrollArea className="max-h-[600px] space-y-4">
        <div className="flex gap-4">
          <Avatar className="w-32 h-32 object-cover relative rounded-lg">
            {order.product.discountInPercentage && (
              <div className="absolute p-1 right-0">
                <Badge variant={"destructive"}>{order.product.discountInPercentage}%</Badge>
              </div>
            )}
            <AvatarImage
              className="object-cover"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${order.product.images.image1}`}
              alt={order.product.productName}
            />
            <AvatarFallback>
              alt={order.product.productName.split("").splice(0, 2).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-lg font-semibold">{order.product.productName}</p>
            <p className="text-gray-600 flex items-center gap-1">
              <IndianRupee size={16} /> {order.product.price}
            </p>
            <p>
              <strong>Quantity:</strong> {order.product.qty}
            </p>
            <p className="font-semibold flex items-center gap-2">
              <Calendar size={16} /> Order Placed On:{" "}
              {new Date(order.orderPlacedOn).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2">
              <Truck size={16} />
              <Badge className="cursor-pointer">{order.status}</Badge>
            </div>
          </div>
        </div>

        <div className="flex mb-2 mt-2 items-center gap-4 p-4 bg-muted/20 rounded-lg">
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

        <div className="p-4 mb-2 bg-muted/20 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin size={16} /> Shipping Address
          </h3>
          {/* <p>{order.shippingAddress.street},</p> */}
          <p className="px-1 text-muted-foreground">
            {" "}
            {order.shippingAddress.state}, {order.shippingAddress.zipcode}
          </p>
        </div>

        <p className="font-semibold text-lg flex items-center gap-1">
          <IndianRupee size={20} /> Grand Total: {order.grandTotal}
        </p>
      </ScrollArea>
    </>
  );
};

export default OderInfo;
