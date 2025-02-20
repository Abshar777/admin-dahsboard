"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns, SubcategoryColumn } from "./column";
import { IProduct } from "@/types/product";
import { useProducts } from "@/hooks/useProducts";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useCategory } from "@/hooks/useCategory";
import { useSubCategory } from "@/hooks/useSubCategory";

interface Props {}

const SubCategoryList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    total: number;
    subcategories: SubcategoryColumn[];
  };

  const { data, isPending } = useSubCategory({enabled:true});

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const categories = (data as TData).subcategories;
    console.log(categories)
    return <DataTable search={"subcategory"} data={categories} columns={columns} />;
  }
  return null;
};

export default SubCategoryList;
