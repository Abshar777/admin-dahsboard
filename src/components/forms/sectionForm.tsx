"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedButton from "../global/globalButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../global/productCard";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { useEditSection, useSectionCreation } from "@/hooks/useSections";
import Loader from "../global/loader";
import { useCarsole } from "@/hooks/useCarousel";
import { Product } from "../../types";
import { useEffect } from "react";
import { IProduct } from "@/types/product";

interface Props {
  id?: string;
}

const SectionForm = ({ id }: Props) => {
  const { emblaRef, scrollNext, scrollPrev } = useCarsole();
  const hook = id ? useEditSection(id) : useSectionCreation();
  const { products, form, onFormSubmit, isPending, isLoading } = hook;

  return (
    <Form {...form}>
      <form onSubmit={onFormSubmit} className="space-y-8 md:max-w-[75vw] max-w-[85vw]">
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
        </div>
        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              
              <FormLabel className="font-semibold"> Products</FormLabel>
              <FormControl>
                {!isLoading ? (
                  <div className="relative">
                    <div className="overflow-hidden " ref={emblaRef}>
                      <div className="flex w-full">
                        {products.map((product, index) => (
                          <div
                            key={index}
                            className="p-1 relative  flex-shrink-0 lg:min-w-[20%] md:min-w-[50%] max-w-[85%] min-w-[85%]  md:max-w-[50%]  lg:max-w-[20%]"
                          >
                            {field.value.includes(product._id) && (
                              <div className="absolute pointer-events-none mx- z-[999] w-full h-full flex items-center justify-center">
                                <Checkbox
                                  checked={field.value.includes(product._id)}
                                />
                              </div>
                            )}
                            <ProductCard
                              price={product.price}
                              description={product.productDescription}
                              name={product.productName}
                              onClick={() =>
                                !field.value.includes(product._id)
                                  ? field.onChange([
                                      ...field.value,
                                      product._id,
                                    ])
                                  : field.onChange(
                                      field.value.filter(
                                        (e) => e !== product._id
                                      )
                                    )
                              }
                              className={cn(
                                " active:scale-[.9]",
                                field.value.includes(product._id) &&
                                  "opacity-50"
                              )}
                              imageUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.images.image1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
                      onClick={scrollPrev}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
                      onClick={scrollNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-[12rem] flex items-center justify-center">
                    <Loader />
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid  grid-cols-1">
          <AnimatedButton
            type="submit"
            text="create section"
            loadingText="creating"
            isLoading={isPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default SectionForm;
