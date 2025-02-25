import FormCardSkeleton from "@/components/loading/form-card-skeleton";
import PageContainer from "@/components/layout/page-container";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductForm from "@/components/forms/productForm";
import CategoryForm from "@/components/forms/category";
import BannerForm from "@/components/forms/bannerForm";
import SectionForm from "@/components/forms/sectionForm";

export const metadata = {
  title: "Dashboard : Product Craetion",
};

type PageProps = { params: Promise<{ id: string }> };

export default async function Page(props: PageProps) {
    const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <Card className="mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-left text-2xl font-bold">
                Create New Section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SectionForm id={params.id}/>
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </PageContainer>
  );
}
