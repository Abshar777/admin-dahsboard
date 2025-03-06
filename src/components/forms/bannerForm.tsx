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
import bannerSchema from "@/schema/bannerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AnimatedButton from "../global/globalButton";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { useBanner } from "@/hooks/useBanner";
import { DesktopIcon } from "@radix-ui/react-icons";
import { LiaDesktopSolid } from "react-icons/lia";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const BannerForm = () => {
  const router = useRouter();
  const initialData: Record<string, any> | null = null;
  const defaultValues = {
    title: "",
    img: [],
    mobileImg:[],
  };

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    values: defaultValues,
  });
  const { mutate, isPending, isSuccess } = useBanner();

  function onSubmit(values: z.infer<typeof bannerSchema>) {
    mutate(values);
    form.reset();
  }
  useEffect(() => {
    if (isSuccess) {
      router.push("/admin/banner");
    }
  }, [isSuccess]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Section name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="page"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Pages</FormLabel>
                  <Select
                    onValueChange={(e) => e && field.onChange(e)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Pages" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["home","about","service"].map((page: any) => (
                        <SelectItem key={page} value={page}>
                          {page}
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
            name="img"
            render={({ field }) => (
              <div className="space-y-6 mt-2">
                <FormItem className="w-full">
                  <FormLabel className="flex items-center gap-1">
                    Image For Desktop{" "}
                    <span className=" ">
                      🖥️
                    </span>
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={1 * 1024 * 1024}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="mobileImg"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Images For Mobile Devices 🤳</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={1}
                      maxSize={1 * 1024 * 1024}
                    />
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
            text="create Banner"
            loadingText="creating"
            isLoading={isPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default BannerForm;
