"use client";
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
import { IBanner } from "@/types/IBanner";
import { SheetReuse } from "@/components/global/sheet";
import { useState } from "react";
import CategoryEditForm from "@/components/forms/categoryEditForm";
import BannerEditForm from "@/components/forms/bannerEditForm";

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default function Page(props: pageProps) {
  const { data, isFetching } = useBanner();
  const [id, setid] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const closeSheet = () => setShowEdit(false);
  const openSheet = () => setShowEdit(true);

  return (
    <>
      <SheetReuse
        title="Edit Banner"
        description="this action it will remark the date also"
        open={showEdit}
        closeFn={closeSheet}
      >
        <BannerEditForm id={id}/>
      </SheetReuse>
      <PageContainer scrollable={true}>
        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex items-start justify-between">
            <Heading
              title="Banner 🖼️"
              description="Banner Listing And Actions "
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
            {!isFetching &&
              (data as any) &&
              (data as IBanner[]).map((banner) => (
                <GlobalCard
                  onClick={() => {
                    setid(banner._id);
                    openSheet();
                  }}
                  key={banner._id}
                  imageUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${banner.images}`}
                />
              ))}
            {isFetching &&
              [1, 2, 3, 4, 5, 6].map((e) => (
                <Skeleton key={e} className="w-full h-48 rounded-xl" />
              ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
