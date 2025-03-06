"use client";
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
import { SheetReuse } from "@/components/global/sheet";
import { useState } from "react";
import SubCategoryList from "@/components/table/subCategory/subCatagoryList";
import SubCategoryForm from "@/components/forms/subCategoryForm";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page(props: pageProps) {
  const [create, setcreate] = useState(false);
  const closeSheet = () => setcreate(false);
  const openSheet = () => setcreate(true);
  return (
    <>
      <SheetReuse
        title="Create SubCategory "
        description="this action it will remark the date also"
        open={create}
        closeFn={closeSheet}
      >
      <SubCategoryForm/>
      </SheetReuse>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Sub-Category"
              description="Sub-Category Listing And Actions "
            />
            <div
              onClick={openSheet}
              className={cn(buttonVariants(), "text-xs md:text-sm")}
            >
              <Plus className="mr-2 h-4 w-4" /> Add New
            </div>
          </div>
          <Separator />
          <SubCategoryList />
        </div>
      </PageContainer>
    </>
  );
}
