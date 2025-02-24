"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { CellAction } from "@/components/global/cell-actions";
import SubCategoryForm from "@/components/forms/subCategoryForm";
import { useSubCategoryDlt } from "@/hooks/useSubCategory";

export type SubcategoryColumn = {
  _id: string;
  categoryId: {
    category: string;
  };
  subcategory: string;
  isDeleted: {
    status: boolean;
  };
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
      <Badge
        variant={row.original.isDeleted.status ? "destructive" : "default"}
      >
        {row.original.isDeleted.status ? "Deleted" : "Active"}
      </Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { mutate, isPending,isSuccess } = useSubCategoryDlt(row.original._id);
      return (
        <CellAction
          updateForm={<SubCategoryForm id={row.original._id} />}
          deletFn={mutate}
          dltLoading={isPending}
          id={row.original._id}
          isSuccess={isSuccess}
        />
      );
    },
  },
];
