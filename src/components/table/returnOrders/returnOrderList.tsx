"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns, IOrder } from "./column";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import {  useReturnedOrders } from "@/hooks/useOrder";




const ReturnOrderList = () => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    orders: IOrder[];
  };
  const { data, isPending } = useReturnedOrders();

  if (isPending) return <DataTableSkeleton />;

  if (data) {
    const orders = (data as TData).orders;
    return (
      <>
        <DataTable search={""} data={orders} columns={columns} />
      </>
    );
  }
  return null;
};

export default ReturnOrderList;
