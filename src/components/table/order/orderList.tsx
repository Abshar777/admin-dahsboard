"use client";
import React from "react";
import { DataTable } from "../../global/data-table";
import { columns, IOrder } from "./column";
import { DataTableSkeleton } from "../../global/table/data-table-skeleton";
import { useOrder } from "@/hooks/useOrder";
import { useService } from "@/hooks/useService";

interface Props {
  type?: "service" | "order";
}

const OrderList = ({type="order"}: Props) => {
  // Showcasing the use of search params cache in nested RSCs

  type TData = {
    orders: IOrder[];
  };
  const hook=type=="service"?useService:useOrder
  const { data, isPending } = hook();

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
