import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(1, {message:"Title is too short"}).max(255, {message:"Title is too long"}),
    body: z.string().min(1, {message:"Body is too short"}).max(300, {message:"Body is too long"}),
    tags: z.array(z.string()).max(5, {message:"You can only have up to 5 tags"})
})