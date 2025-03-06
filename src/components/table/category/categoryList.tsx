"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns } from "./column";
import { IProduct } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useCategory } from "@/hooks/useCategory";

interface Props {}

const CatrgoryList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    total: number;
    categories: ICategory[];
  };

  const { data, isPending } = useCategory();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const categories = (data as TData).categories;
    console.log(categories)
    return <DataTable search={"category"} data={categories} columns={columns} />;
  }
  return null;
};

export default CatrgoryList;
