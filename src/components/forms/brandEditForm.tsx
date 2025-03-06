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
import { Switch } from "../ui/switch";
import AnimatedButton from "../global/globalButton";
import { useEffect, useRef } from "react";
import { SheetClose } from "@/components/ui/sheet";
import { useEditBrand } from "@/hooks/useBrand";

interface Props {
  data: {
    _id: string;
    brand: string;
    isDisabled: boolean;
  };
}

const BrandEditForm = ({ data }: Props) => {
  const ref = useRef<any>(null);
  const { form, onFormSubmit, isPending, isSuccess } = useEditBrand(data);

  useEffect(() => {
    if (isSuccess && ref.current) ref.current.click();
  }, [isSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className="space-y-8">
        <div className="grid grid-cols-1 mt-4">
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

          <FormField
            control={form.control}
            name="isDisabled"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 mt-8 items-center">
                  <FormLabel>show</FormLabel>
                  <FormControl>
                    <Switch
                      checked={!field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid  grid-cols-1">
          <AnimatedButton
            type="submit"
            text="edit brand"
            loadingText="editing.."
            isLoading={isPending}
          />
        </div>
      </form>
      <SheetClose ref={ref} />
    </Form>
  );
};

export default BrandEditForm;
