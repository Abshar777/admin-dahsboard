import { z } from "zod";

const sectionSchema = z.object({
    title: z.string().min(2,"minimum 2 characters"),
    products:z.array(z.string()).min(1,"minimum 1 product"),
    
})







export type sectionSchemaType = z.infer<typeof sectionSchema>
export default sectionSchema;
    