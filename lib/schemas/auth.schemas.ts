import { z } from 'zod';

export const createSignInSchema = (t: (key: string, params?: Record<string, unknown>) => string) => z.object({
    email: z
        .string()
        .min(1, t('validation.emailRequired'))
        .email(t('validation.emailInvalid'))
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(6, t('validation.passwordMinLength', { min: 6 })),
});

export const createSignUpSchema = (t: (key: string, params?: Record<string, unknown>) => string) => z.object({
    name: z
        .string()
        .min(1, t('validation.nameRequired'))
        .min(2, t('validation.nameMinLength', { min: 2 }))
        .max(50, t('validation.nameMaxLength', { max: 50 }))
        .trim(),
    email: z
        .string()
        .min(1, t('validation.emailRequired'))
        .email(t('validation.emailInvalid'))
        .toLowerCase()
        .trim(),
    password: z
        .string()
        .min(1, t('validation.passwordRequired'))
        .min(6, t('validation.passwordMinLength', { min: 6 }))
        .max(100, t('validation.passwordMaxLength', { max: 100 })),
    confirmPassword: z
        .string()
        .min(1, t('validation.confirmPasswordRequired')),
}).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordsDoNotMatch'),
    path: ['confirmPassword'],
});

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>; 