"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns } from "./column";
import { IProduct } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";


const ProductList = () => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    total: number;
    products: IProduct[];
    currentPage: number;
    totalPages: number;
  };
  const { data, isPending } = useProducts();

  if (isPending) return <DataTableSkeleton />;


  if (data&&(data as TData)?.products) {
    console.log(data,"data")
    const products = (data as TData).products;
    return (
      <DataTable search={"productName"} data={products} columns={columns} />
    );
  }
  return null;
};

export default ProductList;
