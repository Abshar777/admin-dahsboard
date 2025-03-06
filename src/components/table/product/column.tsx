"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "nextjs-toploader/app";
import { CellAction } from "@/components/global/cell-actions";
import { useDltBrand } from "@/hooks/useBrand";
import { useproductDlt } from "@/hooks/useProducts";
import { IndianRupee } from "lucide-react";

export type Product = {
  _id: string;
  images: { image1?: string };
  productName: string;
  price: number;
  discountInPercentage?: number;
  category: { category: string };
  inStock: number;
  isActive: boolean;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images.image1",
    header: "Image",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <Avatar
          className="cursor-pointer"
          onClick={() => router.push(`/admin/product/${row.original._id}`)}
        >
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${row.original.images.image1}`}
            alt={row.original.productName}
          />
          <AvatarFallback>
            {row.original.productName.split("").splice(0, 2).join("")}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "productName",
    header: "Name",
    cell: ({ row }) => {
      const router = useRouter();
      return (
        <div
          onClick={() => router.push(`/admin/product/${row.original._id}`)}
          className="cursor-pointer"
        >
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="flex items-center"><IndianRupee size={13}/>{Number(row.getValue("price")).toFixed(2)}</div>,
  },
  {
    accessorKey: "discountInPercentage",
    header: "Offer",
    cell: ({ row }) => <div>{row.getValue("discountInPercentage") ?? 0} %</div>,
  },
  {
    accessorKey: "category.category",
    header: "Category",
    cell: ({ row }) => <div>{row?.original?.category?.category || "N/A"}</div>,
  },
  {
    accessorKey: "inStock",
    header: "Stock",
    cell: ({ row }) => <div>{row.getValue("inStock")}</div>,
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate, isPending, isSuccess } = useproductDlt(row.original._id);
      const router=useRouter()
      return (
        <CellAction
          updateFn={() => router.push(`/admin/product/${row.original._id}`)}
          id={row.original._id}
          deletFn={mutate}
          dltLoading={isPending}
          isSuccess={isSuccess}
        />
      );
    },
  },
];
