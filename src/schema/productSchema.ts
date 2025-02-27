import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


const colorSchema = z.object({
  hex: z.string(),
  image: z.optional(z.any())
    .refine(
      (value) => {
        if (typeof value === "string") return true;
        if (value) {
          if (!(value?.length >= 1 && value?.length <= 4)) return false;
          return (
            value[0].size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(value[0].type)
          );
        }
        return false;
      },
      {
        message: "Please upload a valid image (jpg, jpeg, png, webp) with max size 5MB.",
      }
    ),
  title: z.string().min(2, "At least 2 characters required"),
});


const featuresSchema = z.object({
  key: z.string().min(2, "At least 2 characters required"),
  value: z.string().min(2, "At least 2 characters required")
})

const productSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length >= 1 && files?.length <= 4, "You must upload between 1 and 4 images.")
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
  barcode: z.string().optional(),
  category: z.string().nonempty("category must be vali"),
  subcategories: z.string().nonempty("category must be vali"),
  price: z.number(),
  productDescription: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  brand: z.string(),
  modelNumber: z.number().optional(),
  serialNumber: z.number().optional(),
  discountInPercentage: z.number().max(80, "maximum 80% discount"),
  inStock: z.number().min(0, "Number must be greater than zero"),
  color: z.array(colorSchema),
  features: z.array(featuresSchema),
});

export default productSchema;