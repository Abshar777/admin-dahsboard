import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const bannerSchema = z.object({
    img: z.union([
        z.string().optional(), // Accepts an existing image URL
        z
            .any()
            .refine((files) => files?.length >= 1 && files?.length <= 4, "You must upload between 1 and 4 images.")
            .refine(
                (files) => files?.[0]?.size <= MAX_FILE_SIZE,
                `Max file size is 5MB.`
            )
            .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                ".jpg, .jpeg, .png and .webp files are accepted."
            ), // Allows image to be optional
    ]).optional(),
    title: z.string().min(2, "minimum 2 charecters required"),
    mobileImg: z.union([
        z.string().optional(), // Accepts an existing image URL
        z
            .any()
            .refine((files) => files?.length >= 1 && files?.length <= 4, "You must upload between 1 and 4 images.")
            .refine(
                (files) => files?.[0]?.size <= MAX_FILE_SIZE,
                `Max file size is 5MB.`
            )
            .refine(
                (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                ".jpg, .jpeg, .png and .webp files are accepted."
            ), // Allows image to be optional
    ]).optional(),
    page:z.string().min(2, "minimum 2 charecters required")
});

export default bannerSchema;
