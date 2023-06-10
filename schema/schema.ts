import { TFunction } from 'next-i18next';
import { z } from 'zod';

export const registrationSchema = (t: TFunction) =>
  z
    .object({
      username: z
        .string()
        .min(3, t('form.register.errors.username.min')!)
        .max(15, t('form.register.errors.username.max')!)
        .regex(/^[a-z0-9]+$/, t('form.register.errors.username.regex')!),
      email: z.string().email(t('form.register.errors.email.email')!),
      password: z
        .string()
        .min(8, t('form.register.errors.password.min')!)
        .max(15, t('form.register.errors.password.max')!)
        .regex(/^[a-z0-9]+$/, t('form.register.errors.password.regex')!),
      passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t('form.register.errors.confirm_password.match')!,
      path: ['passwordRepeat'],
    });

export const loginSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .nonempty(t('form.login.errors.emailOrUsername.required')!)
      .min(3, t('form.login.errors.emailOrUsername.min')!),
    password: z
      .string()
      .min(8, t('form.login.errors.password.min')!)
      .max(15, t('form.login.errors.password.max')!)
      .regex(/^[a-z0-9]+$/, t('form.login.errors.password.regex')!),
    remember: z.boolean().optional(),
  });

export const forgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('form.forgot_password.errors.email')!),
  });

export const resetPasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string()
        .min(8, t('form.register.errors.password.min')!)
        .max(15, t('form.register.errors.password.max')!)
        .regex(/^[a-z0-9]+$/, t('form.register.errors.password.regex')!),
      passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t('form.register.errors.confirm_password.match')!,
      path: ['passwordRepeat'],
    });
