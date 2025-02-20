import { z } from "zod";


const subCategorySchema = z.object({
    category: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Product name must be at least 2 characters.",
    }),

});

export default subCategorySchema;
