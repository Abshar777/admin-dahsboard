"use client";
import PageContainer from "@/components/layout/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { SearchParams } from "nuqs/server";
import { Skeleton } from "@/components/ui/skeleton";
import { useScetionDlt, useSection } from "@/hooks/useSections";
import { IProduct } from "@/types/product";
import ProductCard from "@/components/global/productCard";
import { useCarsole } from "@/hooks/useCarousel";
import { AlertModal } from "@/components/global/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Info, MoreHorizontal, Trash } from "lucide-react";
type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page(props: pageProps) {
  const { data, isPending } = useSection();
  const { mutate: dltSection } = useScetionDlt();
  const { emblaRef, scrollNext, scrollPrev } = useCarsole();

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 pb-4 flex-col space-y-4 overflow-hidden">
        <div className="flex items-start justify-between">
          <Heading
            title="Home Page Sections ⚒️"
            description="Banner Listing And Actions "
          />
          <Link
            href="/admin/section/create"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <div className="flex max-w-screen  md:w-full w-[90vw] flex-col gap-3">
          {!isPending &&
            (data as any) &&
            (
              data as { title: string; products: IProduct[]; _id: string }[]
            ).map((e) => (
              <div
                className="w-full h-[24rem] relative bg-muted-foreground/5 rounded-xl px-4 py-3 flex flex-col gap-2"
                key={e._id}
              >
                <div className="flex w-full justify-between items-center">
                  <h1 className="text-xl font-bold  capitalize">{e.title}</h1>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>

                      {
                        <DropdownMenuItem>
                          <Link
                            href={`/admin/section/${e._id}`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Update
                          </Link>
                        </DropdownMenuItem>
                      }
                      {
                        <DropdownMenuItem onClick={() => dltSection(e._id)}>
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="overflow-hidden " ref={emblaRef}>
                  <div className="flex w-full relative    ">
                    {e.products.map((product) => (
                      <div
                        key={product._id}
                        className="p-1  relative flex-shrink-0 lg:min-w-[20%] md:min-w-[50%] max-w-[85%] min-w-[85%]  md:max-w-[50%]  lg:max-w-[20%]"
                      >
                        <ProductCard
                          name={product.productName}
                          //   key={product._id}
                          className={cn(" active:scale-[.9]")}
                          imageUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images.image1}`}
                        />
                      </div>
                    ))}
                  </div>
                  {e.products.length > 5 && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
                        onClick={scrollPrev}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                        onClick={scrollNext}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          {isPending && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6].map((e) => (
                <Skeleton
                  key={e}
                  className="w-full h-48 rounded-xl bg-muted-foreground/20"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
