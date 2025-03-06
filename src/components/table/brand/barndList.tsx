"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns } from "./column";
import { IProduct } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useCategory } from "@/hooks/useCategory";
import { useBrand } from "@/hooks/useBrand";
import { IBrand } from "@/types/IBrand";

interface Props {}

const BrandList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    total: number;
    brands: IBrand[];
  };

  const { data, isPending } = useBrand();
    console.log(data);
    
  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const brands = (data as TData).brands;
    console.log(brands)
    return <DataTable search={"brand"} data={brands} columns={columns} />;
  }
  return null;
};

export default BrandList;
