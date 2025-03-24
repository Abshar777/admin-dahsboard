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
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import AnimatedButton from "../global/globalButton";
import { useRouter } from "nextjs-toploader/app";
import { useCetogeryBySubCategory } from "@/hooks/useSubCategory";
import { IndianRupee, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  color: [{ hex: "#000000", title: "Black", image: undefined }],
};

const ProductForm = ({ id }: { id?: string }) => {
  const [img, setImg] = useState<string[]>([]);
  const [productImg, setProductImg] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const feildName = ["image1", "image2", "image3", "image4"];
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "color",
  });
  const features = useFieldArray({
    control: form.control,
    name: "features",
  });

  const addFeatures = () => features.append({ key: "", value: "" });
  const removeFeatures = (index: number) => features.remove(index);

  const addColor = () => {
    append({ hex: "#000000", title: "Black" });
  };
  const deleteColor = (index: number) => {
    remove(index);
  };

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
      let imagesArray = [];
      for (const key in (data as any)?.images) {
        if ((data as any)?.images[key]) {
          imagesArray.push((data as any)?.images[key]);
        }
      }

      setProductImg({
        image1: imagesArray[0],
        image2: imagesArray[1],
        image3: imagesArray[2],
        image4: imagesArray[3],
      });
      console.log(imagesArray, "imagesArray");
      form.reset({
        ...(data as any),
        category: (data as any)?.category?._id,
        brand: (data as any)?.brand?._id,
        subcategories: (data as any)?.subcategories?.[0]?.subcategory,
        modelNumber: Number((data as any)?.modelNumber) || 0,
        serialNumber: Number((data as any)?.serialNumber) || 0,
        images: imagesArray,
        color: (data as any)?.colors || [{ hex: "#000000", title: "Black" }],
        features: (data as any)?.features || [],
      });
      setselectedCat((data as any)?.category?._id);
    }
    if (data && (data as any)?.colors) {
      const colors = (data as any)?.colors;
      const colorImg = colors.map((color: any) => color.image);
      setImg(colorImg);
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {feildName.map((item) => (
                    <div key={item} className="  w-full   gap-4">
                      <label
                        className="w-full h-[8rem]  rounded-xl overflow-hidden"
                        htmlFor={item}
                      >
                        {productImg[item] ? (
                          <img
                            className="w-full h-full rounded-xl  object-cover"
                            src={
                              (productImg[item] as string).startsWith("blob")
                                ? (productImg[item] as string)
                                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${productImg[item]}`
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
                        id={item}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        hidden
                        multiple={false}
                        onChange={(e) => {
                          console.log((e.target.files as FileList)[0]);
                          field.onChange([
                            ...field.value,
                            (e.target.files as FileList)[0],
                          ]);
                          setProductImg({
                            ...productImg,
                            [item]: URL.createObjectURL(
                              (e.target.files as FileList)[0]
                            ),
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
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
              return (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(e) => {
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
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Colors</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                fields.length < 3 ? addColor() : toast.error("max 3 colors")
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Color
            </Button>
          </div>
          {/* here is the color component want to came  */}
          <div className="grid grid-cols-4 gap-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex border p-4 rounded-xl flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name={`color.${index}.image`}
                  render={({ field }) => {
                    // console.log(field.value, "render");
                    return (
                      <div className="space-y-6 w-full">
                        <FormItem className="w-full">
                          <FormLabel>Images</FormLabel>
                          <FormControl className="">
                            <div className="  w-full   gap-4">
                              <label
                                className="w-full h-[4rem] rounded-xl overflow-hidden"
                                htmlFor={index + "img"}
                              >
                                {img[index] ? (
                                  <img
                                    className="w-full h-[15rem] rounded-xl  object-cover"
                                    src={
                                      (img[index] as string).startsWith("blob")
                                        ? (img[index] as string)
                                        : `${process.env.NEXT_PUBLIC_BACKEND_URL}${field.value}`
                                    }
                                  />
                                ) : (
                                  <div
                                    className={cn(
                                      "group relative grid h-[15rem] w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                                      "ring-offset-background text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    )}
                                  >
                                    upload
                                  </div>
                                )}
                              </label>
                              <input
                                id={index + "img"}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                hidden
                                multiple={false}
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    const file = e.target.files[0];
                                    const newImg = [...img]; // Create a new array
                                    newImg[index] = URL.createObjectURL(file);
                                    console.log(img, newImg, "new Img", index);
                                    setImg(newImg); // Update the state properly

                                    field.onChange(e.target.files); // Ensure React Hook Form updates the value
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    );
                  }}
                />
                <div
                  key={field.id}
                  className="grid grid-cols-1  gap-4 p-4  rounded-lg md:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name={`color.${index}.hex`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color Hex</FormLabel>
                        <FormControl className="w-full grid grid-cols-3  ">
                          <Input
                            className="rounded-full   border-0"
                            type="color"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`color.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Royal Blue" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-2"
                  onClick={() => deleteColor(index)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Color
                </Button>
              </div>
            ))}
          </div>
          {/*end  */}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Product Features</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                features.fields.length < 5
                  ? addFeatures()
                  : toast.error("max 5 Features")
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Features
            </Button>
          </div>
          {/* here is the color component want to came  */}
          <div className="grid  grid-cols-1 gap-4">
            {features.fields.map((field, i) => (
              <div key={field.id} className="flex items-center  gap-2">
                <div className="grid flex-1 grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name={`features.${i}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
                        <FormControl>
                          <Input placeholder="Key" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`features.${i}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input placeholder="Value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="h-full relative">
                  <Button
                    onClick={() => removeFeatures(i)}
                    type="button"
                    className="translate-y-8"
                  >
                    X
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {/*end  */}
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

        <div className="flex items-center justify-end mt-10">
          <h1 className="text-2xl flex items-center dark:text-green-200 light:text-green-700 capitalize">
            final Price: {finalPrice} INR
          </h1>
        </div>

        <AnimatedButton
          type="submit"
          text={id ? "edit product" : "add product"}
          isLoading={editPending || isLoading}
        />
      </form>
    </Form>
  );
};

export default ProductForm;
