import FormCardSkeleton from '@/components/loading/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/forms/loginForm';
import ProductForm from '@/components/forms/productForm';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ productId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
      <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          Create New Product
        </CardTitle>
      </CardHeader>
      <CardContent>
       <ProductForm id={params.productId}/>
      </CardContent>
    </Card>
      </div>
    </PageContainer>
  );
}
