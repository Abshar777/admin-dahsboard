"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, CreditCard, IndianRupee, MapPin, Package, Truck, Clock, CheckCircle, XCircle, RefreshCcw, CalendarClock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEditOrder } from "@/hooks/useOrder";
import { useCreateChat } from "@/hooks/useChat";

interface OrderDetailsModalProps {
  order: {
    _id: string;
    user: {
      _id: string;
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
    subTotal?: number;
    status: string;
    orderPlacedOn: string;
    expectedDeliveryDate?: string;
    deliveredOn?: string;
    shippedOn?: string;
    returnedOn?: string;
    cancelledOn?: string;
    paymentMethod?: string;
    isPaid?: string;
    orderType?: string;
    paymentDetails?: Array<{
      transactionId: string;
      paymentMode: string;
      timestamp: string;
      amount: number;
      state: string;
    }>;
    qty?: number;
    note?: string;
  };
}

const OrderInfo = ({ order }: OrderDetailsModalProps) => {
  const [status, setStatus] = useState(order.status);
  const { mutate, isPending } = useEditOrder({ id: order._id });
  const { mutate: createChatFn, isPending: chatPending } = useCreateChat();
  
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
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Placed":
        return "bg-yellow-500 hover:bg-yellow-500/50";
      case "processing":
        return "bg-blue-500 hover:bg-blue-500/50";
      case "Shipped":
        return "bg-purple-500 hover:bg-purple-500/50";
      case "Delivered":
        return "bg-green-500 hover:bg-green-500/50";
      case "Returned":
        return "bg-orange-500 hover:bg-orange-500/50";
      case "Cancelled":
        return "bg-red-500 hover:bg-red-500/50";
      default:
        return "bg-gray-500 hover:bg-gray-500/50";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ScrollArea className="max-h-[450px]">
      <div className="p-4 space-y-6">
        {/* Product Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Avatar className="w-32 h-32 object-cover relative rounded-lg">
                {order?.product?.discountInPercentage > 0 && (
                  <div className="absolute p-1 right-0">
                    <Badge variant="destructive">
                      {order?.product?.discountInPercentage}%
                    </Badge>
                  </div>
                )}
                <AvatarImage
                  className="object-cover"
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${order?.product?.images?.image1}`}
                  alt={order?.product?.productName}
                />
                <AvatarFallback>
                  {order?.product?.productName?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">{order?.product?.productName}</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <IndianRupee size={16} />
                  <span>{order?.product?.price} INR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={16} />
                  <span>Quantity: {order?.product?.qty || order?.qty || 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Order Placed: {formatDate(order?.orderPlacedOn)}</span>
                </div>
                {order.expectedDeliveryDate && (
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} />
                    <span>Expected Delivery: {formatDate(order?.expectedDeliveryDate)}</span>
                  </div>
                )}
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
                            className={`${getStatusColor(order?.status)} text-white`}
                          >
                            {order?.status}
                          </Badge>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          <Badge className={`${getStatusColor(option)} text-white`}>
                            {option}
                          </Badge>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={order?.user?.img || "/placeholder.svg?height=50&width=50"}
                    alt={order?.user?.username}
                  />
                  <AvatarFallback>{order?.user?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{order?.user?.username}</p>
                  <p className="text-muted-foreground">{order?.user?.email}</p>
                  {order?.user?.phone && (
                    <p className="text-muted-foreground">📞 {order?.user?.phone}</p>
                  )}
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => createChatFn(order?.user?._id)}
                disabled={chatPending}
              >
                {chatPending ? (
                  <span className="animate-spin">
                    <RefreshCcw size={16} />
                  </span>
                ) : (
                  <>
                    <span>Message</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Details Tabs */}
        <Tabs defaultValue="shipping">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          {/* Shipping Tab */}
          <TabsContent value="shipping" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={16} /> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {order?.shippingAddress?.street}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state}, {order?.shippingAddress?.zipcode}
                </p>
                {order.note && (
                  <div className="mt-4">
                    <p className="font-medium">Order Note:</p>
                    <p className="text-muted-foreground">{order?.note || "N/A"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Payment Tab */}
          <TabsContent value="payment" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard size={16} /> Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{order?.paymentMethod || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <Badge variant={order?.isPaid === "true" ? "default" : "destructive"}>
                      {order?.isPaid === "true" ? "Paid" : "Unpaid"}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{order?.subTotal || order?.product?.price * (order?.product?.qty || order?.qty || 1)} INR</span>
                  </div>
                  {order?.product?.discountInPercentage > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{(order?.product?.price * (order?.product?.qty || order?.qty || 1) * order?.product?.discountInPercentage / 100).toFixed(2)} INR</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Grand Total</span>
                    <span>{order.grandTotal} INR</span>
                  </div>
                </div>
                
                {order?.paymentDetails && order?.paymentDetails?.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">Transaction Details</p>
                    {order?.paymentDetails?.map?.((payment, index) => (
                      <div key={index} className="bg-muted p-3 rounded-md text-sm">
                        <div className="flex justify-between">
                          <span>Transaction ID</span>
                          <span className="font-mono">{payment.transactionId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mode</span>
                          <span>{payment?.paymentMode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date</span>
                          <span>{formatDate(payment?.timestamp)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount</span>
                          <span>{payment?.amount} INR</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status</span>
                          <Badge variant={payment?.state === "success" ? "default" : "destructive"}>
                            {payment?.state}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Timeline Tab */}
          <TabsContent value="timeline" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Clock size={16} /> Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-yellow-500 text-white p-1 rounded-full">
                      <Package size={16} />
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.orderPlacedOn)}</p>
                    </div>
                  </div>
                  
                  {order?.shippedOn && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-500 text-white p-1 rounded-full">
                        <Truck size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Order Shipped</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.shippedOn)}</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.deliveredOn && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-green-500 text-white p-1 rounded-full">
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Order Delivered</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.deliveredOn)}</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.returnedOn && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-orange-500 text-white p-1 rounded-full">
                        <RefreshCcw size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Order Returned</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.returnedOn)}</p>
                      </div>
                    </div>
                  )}
                  
                  {order?.cancelledOn && (
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-red-500 text-white p-1 rounded-full">
                        <XCircle size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Order Cancelled</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.cancelledOn)}</p>
                      </div>
                    </div>
                  )}
                  
                  {!order?.shippedOn && !order?.deliveredOn && !order?.returnedOn && !order?.cancelledOn && (
                    <p className="text-muted-foreground italic">No additional status updates available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default OrderInfo;
