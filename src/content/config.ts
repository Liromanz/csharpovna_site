import { defineCollection, z } from "astro:content";

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  group: z.string(),
  placeholder: z.boolean().default(false),
  keywords: z.array(z.string()).optional(),
  engagement: z.boolean().default(true),
  accessLevel: z.enum(["public", "subscriber"]).default("public"),
  quiz: z
    .object({
      questions: z
        .array(
          z.object({
            id: z.string(),
            prompt: z.string(),
            placement: z.enum(["inline", "end"]).default("end"),
            checkType: z.enum(["exact", "code-runtime"]).default("exact"),
          }),
        )
        .optional(),
    })
    .optional(),
});

export const collections = {
  csharp: defineCollection({ type: "content", schema: lessonSchema }),
  wpf: defineCollection({ type: "content", schema: lessonSchema }),
  java: defineCollection({ type: "content", schema: lessonSchema }),
};

export type LessonFrontmatter = z.infer<typeof lessonSchema>;
