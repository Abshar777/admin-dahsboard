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
import { Product } from "@/constants/mock-api";
import categorySchema from "@/schema/categorySchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "../ui/switch";
import AnimatedButton from "../global/globalButton";
import { useCategory } from "@/hooks/useCategory";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {}




const CategoryForm = (props: Props) => {
  const [img, setImg] = useState<string | null>(null);
  const router = useRouter();
  const initialData: Record<string, any> | null = null;
  const defaultValues = {
    category: "",
    isActive: true,
    img: [],
  };

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    values: defaultValues,
  });
  const { mutate, categoryCreationPending,isSuccess } = useCategory(false);

  function onSubmit(values: z.infer<typeof categorySchema>) {
  console.log(values)
    mutate(values);
    form.reset();
  }
  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/category");
    }
  }, [isSuccess]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <div className="space-y-6 w-full">
                <FormItem className="w-full">
                  <FormLabel>Images</FormLabel>
                  <FormControl className="">
                    <div className="  w-full   gap-4">
                      <label
                        className="w-full h-[8rem] rounded-xl overflow-hidden"
                        htmlFor="img"
                      >
                        {img ? (
                          <img
                            className="w-full h-full rounded-xl  object-cover"
                            src={
                              (img as string).startsWith("blob")
                                ? (img as string)
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${field.value}`
                            }
                          />
                        ) : (
                          <div
                            className={cn(
                              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                              "ring-offset-background text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            )}
                          >
                            upload
                          </div>
                        )}
                      </label>
                      <input
                        id="img"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        hidden
                        multiple={false}
                        onChange={(e) => {
                          console.log((e.target.files as FileList)[0]);
                          field.onChange(e.target.files as FileList);
                          setImg(
                            URL.createObjectURL((e.target.files as FileList)[0])
                          );
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
        </div>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 mt-8 items-center">
                  <FormLabel>show</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1">
          <AnimatedButton
            type="submit"
            text="create catgerory"
            loadingText="creating"
            isLoading={categoryCreationPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
