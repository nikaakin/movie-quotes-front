import { MAX_SIZE, MIME_TYPES } from '@/config';
import { TFunction } from 'next-i18next';
import { z } from 'zod';

export const registrationSchema = (t: TFunction) =>
  z
    .object({
      username: z
        .string()
        .min(3, t('modals:form.register.errors.username.min')!)
        .max(15, t('modals:form.register.errors.username.max')!)
        .regex(/^[a-z0-9]+$/, t('modals:form.register.errors.username.regex')!),
      email: z.string().email(t('modals:form.register.errors.email.email')!),
      password: z
        .string()
        .min(8, t('modals:form.register.errors.password.min')!)
        .max(15, t('modals:form.register.errors.password.max')!)
        .regex(/^[a-z0-9]+$/, t('modals:form.register.errors.password.regex')!),
      passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t('modals:form.register.errors.confirm_password.match')!,
      path: ['passwordRepeat'],
    });

export const editSchema = (t: TFunction) =>
  z
    .object({
      image: z
        .custom<FileList>()
        .optional()
        .refine((file) => {
          if (file?.[0]) return file![0]?.size <= MAX_SIZE;
          return true;
        }, t('profile.image_size')!)
        .refine((file) => {
          if (file?.[0]) return MIME_TYPES.includes(file![0]?.type);
          return true;
        }, t('profile.image_type')!),
      username: z
        .string()
        .min(3, t('modals:form.register.errors.username.min')!)
        .max(15, t('modals:form.register.errors.username.max')!)
        .regex(/^[a-z0-9]+$/, t('modals:form.register.errors.username.regex')!)
        .optional(),
      password: z
        .string()
        .min(8, t('modals:form.register.errors.password.min')!)
        .max(15, t('modals:form.register.errors.password.max')!)
        .regex(/^[a-z0-9]+$/, t('modals:form.register.errors.password.regex')!)
        .optional(),
      passwordRepeat: z.string().optional(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t('modals:form.register.errors.confirm_password.match')!,
      path: ['passwordRepeat'],
    });

export const loginSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .nonempty(t('modals:form.login.errors.emailOrUsername.required')!)
      .min(3, t('modals:form.login.errors.emailOrUsername.min')!),
    password: z
      .string()
      .min(8, t('modals:form.login.errors.password.min')!)
      .max(15, t('modals:form.login.errors.password.max')!)
      .regex(/^[a-z0-9]+$/, t('form.login.errors.password.regex')!),
    remember: z.boolean().optional(),
  });

export const forgotPasswordSchema = (t: TFunction) =>
  z.object({
    email: z.string().email(t('fmodals:orm.forgot_password.errors.email')!),
  });

export const resetPasswordSchema = (t: TFunction) =>
  z
    .object({
      password: z
        .string()
        .min(8, t('modals:form.register.errors.password.min')!)
        .max(15, t('modals:form.register.errors.password.max')!)
        .regex(/^[a-z0-9]+$/, t('form.register.errors.password.regex')!),
      passwordRepeat: z.string(),
    })
    .refine((data) => data.password === data.passwordRepeat, {
      message: t('modals:form.register.errors.confirm_password.match')!,
      path: ['modals:passwordRepeat'],
    });
