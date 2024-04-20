import { z } from "zod";

export const commentSchema = z.object({
    body: z.string().max(200, {message:"Comment is too long"})
})