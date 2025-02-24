import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs/server";
import OrderList from "@/components/table/order/orderList";

export const metadata = {
  title: "Dashboard: Service",
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
            title="Services"
            description="Service Listing And Actions "
          />
        </div>
        <Separator />
        <OrderList type="service"/>
      </div>
    </PageContainer>
  );
}
