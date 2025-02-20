"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export type SubcategoryColumn = {
  _id: string;
  categoryId: {
    category: string;
  };
  subcategory: string;
  isDeleted: boolean;
};

export const columns: ColumnDef<SubcategoryColumn>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "subcategory",
    header: "Subcategory Name",
    cell: ({ row }) => <div>{row.getValue("subcategory")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category ID",
    cell: ({ row }) => <div>{row.original.categoryId.category}</div>,
  },
  {
    accessorKey: "isDeleted",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isDeleted") ? "destructive" : "default"}>
        {row.getValue("isDeleted") ? "Deleted" : "Active"}
      </Badge>
    ),
  },
];
