import {
  registrationSchema,
  loginSchema,
  forgotPasswordSchema,
} from '@/schema';

type registrationSchemaType = z.infer<typeof registrationSchema>;
type loginSchemaType = z.infer<typeof loginSchema>;
type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
