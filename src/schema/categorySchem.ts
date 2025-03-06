import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const categorySchema = z.object({
    img: z.union([
        z.string().optional(), // Accepts an existing image URL
        z
            .any()
            .refine((files) => !files || files.length === 1, "Image is required.")
            .refine(
                (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
                `Max file size is 5MB.`
            )
            .refine(
                (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                ".jpg, .jpeg, .png, and .webp files are accepted."
            )
            .optional(), // Allows image to be optional
    ]).optional(),
    category: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    isActive: z.boolean().optional(),
});

export default categorySchema;
