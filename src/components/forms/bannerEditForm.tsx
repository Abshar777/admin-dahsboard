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
import bannerSchema from "@/schema/bannerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AnimatedButton from "../global/globalButton";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useRef, useState } from "react";
import { useBannerEdit } from "@/hooks/useBanner";
import { cn } from "@/lib/utils";
import { SheetClose } from "../ui/sheet";
import PageContainer from "../layout/page-container";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  id: string;
}

const BannerEditForm = ({ id }: Props) => {
  const [img, setImg] = useState<string | null>(null);
  const [mobileImg, setMobileImg] = useState<string | null>(null);
  const ref = useRef<any>(null);
  const defaultValues = {
    title: "",
    img: [],
    mobileImg: [],
  };

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    values: defaultValues,
  });
  const { data, isPending, mutate, isLoading, isSuccess } = useBannerEdit(id);

  function onSubmit(values: z.infer<typeof bannerSchema>) {
    mutate({ ...values, id });
  }

  useEffect(() => {
    if (id && data) {
      form.reset({
        img: (data as any).images,
        title: (data as any).title,
        mobileImg: (data as any).mobileImg,
      });
      if ((data as any).images) setImg((data as any).images);
      else setImg(null);
      if ((data as any).mobileImg) setMobileImg((data as any).mobileImg);
      else setMobileImg(null);
    }
  }, [id, data]);
  useEffect(() => {
    if (isSuccess && ref.current) {
      ref.current.click();
    }
  }, [isSuccess]);
  return (
    <ScrollArea className='h-[calc(100dvh-52px)]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1">
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
              name="img"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Image For Mobile DeskTop</FormLabel>
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
                              URL.createObjectURL(
                                (e.target.files as FileList)[0]
                              )
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
            <FormField
              control={form.control}
              name="mobileImg"
              render={({ field }) => (
                <div className="space-y-6">
                  <FormItem className="w-full">
                    <FormLabel>Image For Mobile Devices</FormLabel>
                    <FormControl>
                      <div className="  w-full   gap-4">
                        <label
                          className="w-full h-[8rem] rounded-xl overflow-hidden"
                          htmlFor="mobileImg"
                        >
                          {mobileImg ? (
                            <img
                              className="w-1/2 h-48 rounded-xl  object-cover"
                              src={
                                (mobileImg as string).startsWith("blob")
                                  ? (mobileImg as string)
                                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}${field.value}`
                              }
                            />
                          ) : (
                            <div
                              className={cn(
                                "group relative grid h-52 w-1/2 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                                "ring-offset-background text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              )}
                            >
                              upload
                            </div>
                          )}
                        </label>
                        <input
                          id="mobileImg"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          hidden
                          multiple={false}
                          onChange={(e) => {
                            console.log((e.target.files as FileList)[0]);
                            field.onChange(e.target.files as FileList);
                            setMobileImg(
                              URL.createObjectURL(
                                (e.target.files as FileList)[0]
                              )
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
              text="edit"
              loadingText="editing"
              isLoading={isPending}
            />
          </div>
        </form>
        <SheetClose ref={ref} />
      </Form>
    </ScrollArea>
  );
};

export default BannerEditForm;
