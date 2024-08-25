import { z } from 'zod';

const subsectionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
});

const sectionSchema = z.object({
  section: z.string(),
  subsections: z.union([
    z.array(z.string()),
    z.array(subsectionSchema)
  ]),
});

const outlineSchema = z.object({
  topic: z.string(),
  outline: z.array(sectionSchema),
});

export default outlineSchema;