import { z } from "zod";

const OutlineItemSchema = z.object({
    title: z.string()
});

const OutlineSectionSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
        title: z.string(),
        children: z.array(z.union([
            z.object({
                title: z.string(),
                children: z.lazy(() => z.array(OutlineSectionSchema).optional())
            }),
            OutlineItemSchema
        ])).optional()
    })
);

// Define the schema for the entire outline
const OutlineSchema = z.object({
    title: z.string(),
    children: z.array(OutlineSectionSchema)
});

export default OutlineSchema;