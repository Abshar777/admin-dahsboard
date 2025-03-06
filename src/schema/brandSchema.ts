import { z } from "zod";

const brandSchema = z.object({
    brand: z.string().min(2,"minimum 2 characters"),
    
})


export const brandEditSchema = z.object({
    brand: z.string().min(2,"minimum 2 characters"),
    isDisabled:z.boolean()
    
})





export type brandSchemaType = z.infer<typeof brandSchema>
export default brandSchema;
    