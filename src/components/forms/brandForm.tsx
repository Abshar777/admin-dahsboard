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
import brandSchema from "@/schema/brandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Switch } from "../ui/switch";
import AnimatedButton from "../global/globalButton";
import { useCategory } from "@/hooks/useCategory";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useBrand } from "@/hooks/useBrand";

interface Props {}

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

const BrandForm = (props: Props) => {
  const router = useRouter();
  const initialData: Record<string, any> | null = null;
  const defaultValues = {
   brand:""
  };

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    values: defaultValues,
  });
  const { mutate, creationPending,isSuccess } = useBrand(false);


  function onSubmit(values: z.infer<typeof brandSchema>) {
  console.log(values)
    mutate(values);
    form.reset();
  }
  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/brand");
    }
  }, [isSuccess]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1">
      
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Brand name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1">
          <AnimatedButton
          size="md"
            type="submit"
            text="create Brand"
            loadingText="creating"
            isLoading={creationPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default BrandForm;
