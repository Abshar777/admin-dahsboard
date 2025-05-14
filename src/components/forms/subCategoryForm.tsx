"use client";

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
import { Product } from "@/constants/mock-api";
import brandSchema from "@/schema/brandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "../ui/switch";
import AnimatedButton from "../global/globalButton";
import { useCategory } from "@/hooks/useCategory";
import { useRouter } from "nextjs-toploader/app";
import { use, useEffect, useRef, useState } from "react";
import { useBrand } from "@/hooks/useBrand";
import subCategorySchema from "@/schema/subCategorySchema";
import { useSubCategory, useSubCategoryEdit } from "@/hooks/useSubCategory";
import { SheetClose } from "../ui/sheet";

interface Props {
    id?:string
}

const defualtValues = {
  category: "",
  name: "",
};

const SubCategoryForm = ({id}: Props) => {
  const { data: category } = useCategory();
  const ref = useRef<any>(null);
  const [categories, setcategories] = useState<ICategory[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      const cat = (category as any).categories;
      setcategories(cat);
    }
  }, [category]);

  const form = useForm<z.infer<typeof subCategorySchema>>({
    resolver: zodResolver(subCategorySchema),
    values: defualtValues,
  });

  const hook=id?useSubCategoryEdit:useSubCategory;
  const { mutate, isSuccess,isLoading,isPending,data } = hook({enabled:!!id,id:id});

  function onSubmit(values: z.infer<typeof subCategorySchema>) {
    console.log(values);
    mutate(values);
    form.reset();
  }



  useEffect(()=>{
    if(data && id){
      form.reset({category:(data as any).categoryId,name:(data as any).subcategory})
    }
  },[data])

  useEffect(() => {
    if (isSuccess && ref.current) {
      ref.current.click();
    }
  }, [isSuccess]);
  <SheetClose ref={ref} />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1"></div>

        <div className="grid grid-cols-1 gap-6 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Sub-category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(e) => e && field.onChange(e)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value || "Please Select"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories&&categories.map((cat: ICategory) => (
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
        <div className="grid  grid-cols-1">
          <AnimatedButton
            size="md"
            type="submit"
            text="create Sub-category "
            loadingText="creating"
            isLoading={isLoading}
          />
        </div>
      </form>
      <SheetClose ref={ref} />
    </Form>
  );
};

export default SubCategoryForm;
