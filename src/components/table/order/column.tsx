"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "@/components/global/cell-actions";
import OderInfo from "@/components/global/orderInfo";
import { IndianRupee } from "lucide-react";

export type IOrder = {
  _id: string;
  user: {
    _id:string,
    username:string
  };
  paidOn?: string;
  shippingAddress: string;
  expectedDeliveryDate: string;
  deliveredOn?: string;
  orderPlacedOn?: string;
  shippedOn?: string;
  returnedOn?: string;
  cancelledOn?: string;
  lastDayToReturn?: string;
  grandTotal: number;
  subTotal: number;
  product: string;
  qty: number;
  note?: string;
  paymentMethod: string;
  isPaid: boolean;
  status: "Placed" | "Shipped" | "Delivered" | "Returned" | "Cancelled";
  orderId?: string;
  createdAt: string;
};


const getStatusColor = (status: string) => {
  switch (status) {
    case "Placed":
      return "bg-yellow-500 hover:bg-yellow-500/50 cursor-pointer"
    case "processing":
      return "bg-blue-500 hover:bg-blue-500/50 cursor-pointer"
    case "Shipped":
      return "bg-purple-500 hover:bg-purple-500/50 cursor-pointer"
    case "Delivered":
      return "bg-green-500 hover:bg-green-500/50 cursor-pointer"
    case "Cancelled":
      return "bg-red-500 hover:bg-red-500/50 cursor-pointer"
    default:
      return "bg-gray-500 hover:bg-gray-500/50 cursor-pointer"
  }
}

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => <div>#{row.getValue("_id") || "N/A"}</div>,
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <div>{row.original.user.username}</div>,
  },
  {
    accessorKey: "grandTotal",
    header: "Grand Total",
    cell: ({ row }) => (
      <div className="flex items-center "><IndianRupee size={15}/>{Number(row.getValue("grandTotal")).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <div>{row.getValue("paymentMethod")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className={`${getStatusColor(row.original.status)} text-white `}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellAction  info={<OderInfo order={row.original as any}/>}  id={row.original._id}/>
    ),
  },
];
