"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Product = {
  id: string
  images: { image1?: string }
  productName: string
  price: number
  discountInPercentage?: number
  category: { category: string }
  inStock: number
  isActive: boolean
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images.image1",
    header: "Image",
    cell: ({ row }) => (
      <Avatar>
      <AvatarImage src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${row.original.images.image1}`} alt={row.original.productName} />
      <AvatarFallback>{row.original.productName.split("").splice(0,2).join("")}</AvatarFallback>
    </Avatar>
    ),
  },
  {
    accessorKey: "productName",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("productName")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>${Number(row.getValue("price")).toFixed(2)}</div>,
  },
  {
    accessorKey: "discountInPercentage",
    header: "Offer",
    cell: ({ row }) => <div>{row.getValue("discountInPercentage") ?? 0} %</div>,
  },
  {
    accessorKey: "category.category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category.category}</div>,
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
]
