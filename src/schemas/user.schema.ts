import z from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(2).max(100).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserSchema = z.infer<typeof userSchema>;
