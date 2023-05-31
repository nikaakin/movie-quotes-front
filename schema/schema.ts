import { z } from 'zod';

const username = z
  .string()
  .min(3, 'Username must be at least 3 characters long')
  .max(15, 'Username must be at most 15 characters long')
  .regex(
    /^[a-z0-9]+$/,
    'Username must contain only lowercase letters and numbers'
  );

const email = z.string().email('Invalid email address');

const emailOrUsername = z.string();

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(15, 'Password must be at most 15 characters long')
  .regex(
    /^[a-z0-9]+$/,
    'Password must contain only lowercase letters and numbers'
  );

const passwordRepeat = z.string();
const remember = z.boolean().optional();

export const registrationSchema = z
  .object({
    username,
    email,
    password,
    passwordRepeat,
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: 'Passwords do not match',
    path: ['passwordRepeat'],
  });

export const loginSchema = z.object({
  emailOrUsername,
  password,
  remember,
});

export const forgotPasswordSchema = z.object({
  email,
});
