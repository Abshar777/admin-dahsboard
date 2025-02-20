"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellAction } from "@/components/global/cell-actions";
import OderInfo from "@/components/global/orderInfo";

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
      <div>${Number(row.getValue("grandTotal")).toFixed(2)}</div>
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
      <Badge
        variant={
          (row.getValue("status") === "Placed"
            ? "default"
            : row.getValue("status") === "Shipped"
            ? "secondary"
            : row.getValue("status") === "Delivered"
            ? "outline"
            : row.getValue("status") === "Returned"
            ? "warning"
            : "destructive") as any
        }
      >
        {row.getValue("status")}
      </Badge>
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
