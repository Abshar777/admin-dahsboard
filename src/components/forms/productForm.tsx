"use client";

import { FileUploader } from "@/components/global/fileUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBrand } from "@/hooks/useBrand";
import { useCategory } from "@/hooks/useCategory";
import { useProducts } from "@/hooks/useProducts";
import productSchema from "@/schema/productSchema";
import { IBrand } from "@/types/IBrand";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const defaultValues = {
  images: [],
  productName: "",
  barcode: undefined,
  category: undefined,
  price: 1,
  productDescription: "this is nice product",
  brand: undefined,
  modelNumber: 0,
  serialNumber: 1,
  discountInPercentage: 0,
  inStock: 0,
};

const ProductForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const { data: category } = useCategory();
  const { data: brand } = useBrand();
  const { mutate } = useProducts();
  const [categories, setcategories] = useState<ICategory[]>([]);
  const [brands, setbrands] = useState<IBrand[]>([]);

  useEffect(() => {
    if (category) {
      const cat = (category as any).categories
      setcategories(cat);
    }
    if (brand) {
      const br = (brand as any).brands as IBrand[]
      setbrands(br);
    }
  }, [brand, category]);

  function onSubmit(values: z.infer<typeof productSchema>) {
    mutate(values);
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (err) => {
      Object.values(err).forEach((error: any) => {
        if (error?.message) toast.error(error.message.toString());
      })})} className="space-y-8">
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFiles={4}
                  maxSize={4 * 1024 * 1024}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat:ICategory) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand._id} value={brand._id}>
                        {brand.brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter price"
                    {...field}
                    onChange={e=>field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serialNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                   
                    placeholder="Enter Serial Number"
                   onChange={e=>field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modelNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter Model Number"
                    {...field}
                    onChange={e=>field.onChange(e.target.value?Number(e.target.value):0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    placeholder="Enter Stock"
                    {...field}
                    onChange={e=>field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountInPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>discount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter discount"
                    {...field}
                    onChange={e=>field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
};

export default ProductForm;
