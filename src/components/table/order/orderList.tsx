"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns, IOrder } from "./column";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useOrder } from "@/hooks/useOrder";

interface Props {}

const OrderList = (props: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    orders: IOrder[];
  };

  const { data, isPending } = useOrder();
  console.log(data, "data");

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

export default OrderList;
