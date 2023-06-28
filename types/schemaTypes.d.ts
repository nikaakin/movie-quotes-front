import {
  registrationSchema,
  loginSchema,
  forgotPasswordSchema,
  editSchema,
} from '@/schema';
import { createMovieSchema } from '@/schema';

type registrationSchemaType = registrationSchema;
type loginSchemaType = loginSchema;
type forgotPasswordSchemaType = forgotPasswordSchema;
type ResetPasswordSchemaType = forgotPasswordSchema;
type editSchemaType = editSchema;
type createMovieSchemaType = createMovieSchema;
