import { MAX_SIZE, MIME_TYPES } from '@/config';
import { TFunction } from 'next-i18next';
import { z } from 'zod';

export const createQuoteSchema = (t: TFunction) =>
  z.object({
    description_en: z.string().regex(
      /^[A-Za-z\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.description'),
        language: t('modals:attributes.language_en'),
      })!
    ),
    description_ka: z.string().regex(
      /^[ა-ჰ\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.description'),
        language: t('modals:attributes.language_ka'),
      })!
    ),
    image: z
      .custom<FileList>()
      .refine(
        (file) => file?.[0],
        t('modals:validation.required', {
          attribute: t('modals:attributes.image'),
        })!
      )
      .refine(
        (file) => file![0]?.size <= MAX_SIZE,
        t('common:profile.image_size')!
      )
      .refine(
        (file) => MIME_TYPES.includes(file![0]?.type),
        t('common:profile.image_type')!
      ),
    movie: z.object(
      {
        value: z.number(),
        label: z.string(),
      },
      {
        required_error: t('modals:validation.required', {
          attribute: t('modals:attributes.movie'),
        })!,
      }
    ),
  });