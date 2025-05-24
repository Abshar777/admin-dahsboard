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
  images: z.optional(z.any())
    .refine(
      (value) => {

        if (value) {
          if (!(value?.length >= 1 && value?.length <= 4)) return false;
          if (typeof value[0] === "string") {
            return true;
          }
          if (value[0].size <= MAX_FILE_SIZE &&
            ACCEPTED_IMAGE_TYPES.includes(value[0].type)) {
            return true;
          }

        }
        return false;
      },
      {
        message: "Please upload a valid image (jpg, jpeg, png, webp) with max size 5MB.",
      }
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
  deliveryCharge: z.number(),
  serviceCharge: z.number(),
});

export default productSchema;