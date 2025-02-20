import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const productSchema = z.object({
    images: z
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
      productName: z.string().min(2, {
      message: "Product name must be at least 2 characters.",
    }),
    barcode:z.string().optional(),
    category: z.string(),
    price: z.string(),
    productDescription: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    brand:z.string(),
    modelNumber:z.number().min(10, "Number must be at least 10 characters"),
    serialNumber:z.number(),
    discountInPercentage:z.number(),
    inStock:z.number(),
  });

  export default productSchema;