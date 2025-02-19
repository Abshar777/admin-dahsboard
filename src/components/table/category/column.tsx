"use client";

import * as React from "react";
import {ColumnDef} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Cloumn = {
  _id: string;
  discountInPercentage?: number;
  category: string;
  discountExpiresIn?: string;
  categoryDiscountInPercentage?: number;
  discountStatus?: "expired" | "active" | "disabled";
  categoryIsDisabled?: boolean;
  inStock: number;
  isActive: boolean;
};

export const columns: ColumnDef<Cloumn>[] = [
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "discountInPercentage",
    header: "Offer",
    cell: ({ row }) => <div>{row.getValue("discountInPercentage") ?? 0} %</div>,
  },

  {
    accessorKey: "discountExpiresIn",
    header: "Discount Expiry",
    cell: ({ row }) => (
      <div>
        {row.original.discountExpiresIn
          ? new Date(row.original.discountExpiresIn).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "categoryDiscountInPercentage",
    header: "Category Discount",
    cell: ({ row }) => (
      <div>{row.getValue("categoryDiscountInPercentage") ?? 0} %</div>
    ),
  },
  {
    accessorKey: "categoryDiscountStatus",
    header: "Discount Status",
    cell: ({ row }) => <div>{row.original.discountStatus}</div>,
  },
  {
    accessorKey: "categoryIsDisabled",
    header: "Category Disabled",
    cell: ({ row }) => (
      <Badge
        variant={row.getValue("categoryIsDisabled") ? "destructive" : "default"}
      >
        {row.getValue("categoryIsDisabled") ? "Disabled" : "Enabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isActive") ? "default" : "destructive"}>
        {row.getValue("isActive") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];
