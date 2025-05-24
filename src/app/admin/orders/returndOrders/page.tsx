import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import ProductList from "@/components/table/product/product";
import CatrgoryList from "@/components/table/category/categoryList";
import OrderList from "@/components/table/order/orderList";
import ReturnOrderList from "@/components/table/returnOrders/returnOrderList";

export const metadata = {
  title: "Dashboard: Returned Orders",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);



  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Returned Orders"
            description="Returned orders Listing And Actions "
          />
        </div>
        <Separator />
        <ReturnOrderList />
      </div>
    </PageContainer>
  );
}
