import z from "zod";

export const newContactRequestSchema = (t: any) =>
  z.object({
    turnstileToken: z.string(),
    name: z
      .string({ message: t("errors.required") })
      .min(2, t("errors.name_min"))
      .max(100, t("errors.name_max")),
    email: z
      .string({ message: t("errors.required") })
      .email(t("errors.email_invalid")),
    message: z
      .string({ message: t("errors.required") })
      .min(2, t("errors.message_min"))
      .max(1000, t("errors.message_max")),
  });
export type NewContactRequestSchema = z.infer<
  ReturnType<typeof newContactRequestSchema>
>;
