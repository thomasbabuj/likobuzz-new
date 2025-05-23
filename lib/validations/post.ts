import * as z from "zod";

const imageSchema = z.object({
  url: z.string(),
  id: z.string(),
  featured: z.boolean().default(false),
  type: z.string().default("content"),
});

export const postCreateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  content: z.string().min(10, "Content must be at least 10 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  images: z.array(imageSchema).optional().default([]),
  videos: z.array(z.string()).optional().default([]),
  published: z.boolean().default(false),
  imageUrl: z.string().nullable().optional(),
});

export type PostCreateInput = z.infer<typeof postCreateSchema>;
