"use client"
import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import GlobalCard from "@/components/global/globalCard";
import { useBanner } from "@/hooks/useBanner";
import { Skeleton } from "@/components/ui/skeleton";



type pageProps = {
  searchParams: Promise<SearchParams>;
};

const products = [
    {
      id: "1",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation and long battery life.",
      price: 129.99,
      rating: 4.5,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
    {
      id: "2",
      name: "Smartphone",
      description: "Latest model smartphone with advanced camera and 5G capabilities.",
      price: 799.99,
      rating: 4.8,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
    {
      id: "3",
      name: "Laptop",
      description: "Powerful laptop for work and entertainment with a high-resolution display.",
      price: 1299.99,
      rating: 4.7,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
    {
      id: "4",
      name: "Smartwatch",
      description: "Fitness tracking smartwatch with heart rate monitor and GPS.",
      price: 199.99,
      rating: 4.3,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
    {
      id: "5",
      name: "Wireless Earbuds",
      description: "Compact wireless earbuds with great sound quality and comfortable fit.",
      price: 89.99,
      rating: 4.6,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
    {
      id: "6",
      name: "Tablet",
      description: "Versatile tablet with a large screen, perfect for productivity and entertainment.",
      price: 449.99,
      rating: 4.4,
      imageUrl: "https://kzmloopjkza73nxcaeyt.lite.vusercontent.net/placeholder.svg?height=300&width=300",
    },
  ]
  

export default  function Page(props: pageProps) {
    const {data,isFetching}=useBanner()
    console.log(data)
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Category"
            description="Category Listing And Actions "
          />
          <Link
            href="/admin/banner/create"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isFetching&&products.map((product) => (
            <GlobalCard key={product.id} {...product} />
          ))}
          {isFetching&&[1,2,3,4,5,6].map(e=>(
            <Skeleton key={e} className="w-full h-48 rounded-xl"/>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
