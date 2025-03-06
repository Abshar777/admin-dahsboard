"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CategoryEditForm from "@/components/forms/categoryEditForm";
import { CellAction } from "@/components/global/cell-actions";
import { useDltCategory } from "@/hooks/useCategory";

export type ICategory = {
  _id: string;
  discountInPercentage?: number;
  category: string;
  discountExpiresIn?: string;
  categoryDiscountInPercentage?: number;
  discountStatus?: "expired" | "active" | "disabled";
  categoryIsDisabled?: boolean;
  inStock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryColumn = {
  _id: string;
  category: string;
  img?: string;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "rowNumber",
    header: "#",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "category",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${row.original.img}`}
          alt={row.original.category}
        />
        <AvatarFallback>
          {row.original.category.split("").splice(0, 2).join("")}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "isDisabled",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.getValue("isDisabled") ? "destructive" : "default"}>
        {row.getValue("isDisabled") ? "Inactive" : "Active"}
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
    accessorKey: "updatedAt",
    header: "Upadted At",
    cell: ({ row }) => (
      <div>
        {row.original.updatedAt
          ? new Date(row.original.updatedAt).toLocaleDateString()
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const {mutate,isPending,isSuccess}=useDltCategory(row.original._id)
      return (
        <CellAction
          updateForm={<CategoryEditForm id={row.original._id} />}
          deletFn={mutate}
          id={row.original._id}
          dltLoading={isPending}
          isSuccess={isSuccess}
        />
      );
    },
  },
];
