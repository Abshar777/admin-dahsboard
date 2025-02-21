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
import bannerSchema from "@/schema/bannerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "../ui/switch";
import AnimatedButton from "../global/globalButton";
import { useCategory } from "@/hooks/useCategory";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
import { useBanner, useBannerEdit } from "@/hooks/useBanner";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";

interface Props {
  id: string;
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  category: z.string(),
  price: z.number(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const BannerEditForm = ({ id }: Props) => {
  const router = useRouter();
  const [img, setImg] = useState<string | null>(null);
  const initialData: Record<string, any> | null = null;
  const ref = useRef<any>(null);
  const defaultValues = {
    category: "",
    isActive: true,
    img: [],
  };

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    values: defaultValues,
  });
  const { data, isPending, mutate, isLoading, isSuccess } = useBannerEdit(id);

  function onSubmit(values: z.infer<typeof bannerSchema>) {
    console.log(values);
    mutate({...values,id});
    form.reset();
  }

  useEffect(() => {
    if (id && data) {
      form.reset({
        img: (data as any).images,
      });
      if ((data as any).images) setImg((data as any).images);
    }
  }, [id, data]);
  useEffect(() => {
    if (isSuccess && ref.current) {
      ref.current.click();
    }
  }, [isSuccess]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1">
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="  w-full   gap-4">
                      <label
                        className="w-full h-[8rem] rounded-xl overflow-hidden"
                        htmlFor="img"
                      >
                        {img ? (
                          <img
                            className="w-full h-48 rounded-xl  object-cover"
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

        <div className="grid  grid-cols-1">
          <AnimatedButton
            type="submit"
            text="create catgerory"
            loadingText="creating"
            isLoading={isPending}
          />
        </div>
      </form>
      <SheetClose ref={ref} />
    </Form>
  );
};

export default BannerEditForm;
