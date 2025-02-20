"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Cloumn = {
  _id: string;
  brand: string;
  isDisabled: boolean;
  createdAt: string;
};

export const columns: ColumnDef<Cloumn>[] = [
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div>
    {row.original.createdAt
      ? new Date(row.original.createdAt).toLocaleDateString()
      : "N/A"}
  </div>,
  },

  {
    accessorKey: "isDisabled",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isDisabled") ? "default" : "destructive"}>
        {!row.getValue("isDisabled") ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];
