"use client";

import { FileUploader } from "@/components/global/fileUploader";
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
import AnimatedButton from "../global/globalButton";
import { useRouter } from "nextjs-toploader/app";
import { useCetogeryBySubCategory } from "@/hooks/useSubCategory";
import { IndianRupee } from "lucide-react";

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
  subcategories: undefined,
};

const ProductForm = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [selectedCat, setselectedCat] = useState("");
  const { data: category } = useCategory();
  const { data: brand } = useBrand();
  const {
    mutate,
    data,
    editFn,
    editPending,
    isLoading,
    editSuccess,
    isSuccess,
  } = useProducts(id);
  const [categories, setcategories] = useState<ICategory[]>([]);
  const [brands, setbrands] = useState<IBrand[]>([]);
  const [subCategorys, setSubCategorys] = useState<any>([]);
  const actionFn = id ? editFn : mutate;
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (category) {
      const cat = (category as any).categories;
      setcategories(cat);
    }
    if (brand) {
      const br = (brand as any).brands as IBrand[];
      setbrands(br);
    }
  }, [brand, category]);

  function onSubmit(values: z.infer<typeof productSchema>) {
    actionFn({ ...values, _id: id });
  }

  useEffect(() => {
    if (id && data) {
      form.reset({
        ...(data as any),
        category: (data as any)?.category?._id,
        brand: (data as any)?.brand?._id,
        subcategories: (data as any)?.subcategories?.[0]?.subcategory,
        modelNumber: Number((data as any)?.modelNumber) || 0,
        serialNumber: Number((data as any)?.serialNumber) || 0,
        images: [],
      });
      setselectedCat((data as any)?.category?._id)
    }
  }, [id, data]);

  const { data: subCategory, refetch } = useCetogeryBySubCategory({
    id: selectedCat,
  });
  useEffect(() => {
    refetch();
  }, [selectedCat]);

  useEffect(() => {
    if (subCategory) setSubCategorys(subCategory);
  }, [subCategory]);

  useEffect(() => {
    if (editSuccess || isSuccess) router.push("/admin/product");
  }, [editSuccess, isSuccess]);

  const price = form.watch("price") || 0;
  const discountInPercentage = form.watch("discountInPercentage") || 0;
  const finalPrice = price - price * (discountInPercentage / 100);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => {
          Object.values(err).forEach((error: any) => {
            if (error?.message) toast.error(error.message.toString());
          });
        })}
        className="space-y-8"
      >
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      e && setselectedCat(e);
                      e && field.onChange(e);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={field.value || "please select"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat: ICategory) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="subcategories"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Sub-Categories</FormLabel>
                  <Select
                    onValueChange={(e) => e && field.onChange(e)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subcategories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(subCategorys as unknown as any).map((subCat: any) => (
                        <SelectItem key={subCat._id} value={subCat._id}>
                          {subCat.subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => {
              console.log(field.value, "filed");
              return (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      console.log(e)
                      e && console.log(e,"ajabajbaj");
                      e && field.onChange(e);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={field.value || "please select brand"}
                        />
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
              );
            }}
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
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
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
                    {...field}
                    type="number"
                    placeholder="Enter Serial Number"
                    onChange={(e) =>
                      e && field.onChange(Number(e.target.value) || 0)
                    }
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
                    onChange={(e) =>
                      e && field.onChange(Number(e.target.value) || 0)
                    }
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
                    onChange={(e) =>
                      e && field.onChange(Number(e.target.value) || 0)
                    }
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
                    onChange={(e) =>
                      e && field.onChange(Number(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end mt-10">
            <h1 className="text-2xl flex items-center dark:text-green-200 light:text-green-700 capitalize">
              final Price:
              {finalPrice}
              INR
            </h1>
          </div>
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
        <AnimatedButton
          type="submit"
          text={id ? "edite product" : "add product"}
          isLoading={editPending || isLoading}
        />
      </form>
    </Form>
  );
};

export default ProductForm;
