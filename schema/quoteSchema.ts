import { MAX_SIZE, MIME_TYPES } from '@/config';
import { TFunction } from 'next-i18next';
import { z } from 'zod';

export const createQuoteSchema = (t: TFunction) =>
  z.object({
    quote_en: z.string().regex(
      /^[A-Za-z0-9 ,!'\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.description'),
        language: t('modals:attributes.language_en'),
      })!
    ),
    quote_ka: z.string().regex(
      /^[ა-ჰ0-9 ,!'\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.description'),
        language: t('modals:attributes.language_ka'),
      })!
    ),
    image: z
      .custom<FileList>()
      .refine(
        (file) => file?.[0] || (file && typeof file === 'string'),
        t('modals:validation.required', {
          attribute: t('modals:attributes.image'),
        })!
      )
      .refine(
        (file) => file![0]?.size <= MAX_SIZE || typeof file === 'string',
        t('common:profile.image_size')!
      )
      .refine(
        (file) =>
          MIME_TYPES.includes(file![0]?.type) || typeof file === 'string',
        t('common:profile.image_type')!
      ),
    movie: z.object(
      {
        value: z.number({
          invalid_type_error: t('modals:validation.required', {
            attribute: t('modals:attributes.movie'),
          })!,
        }),
        label: z.string(),
      },
      {
        required_error: t('modals:validation.required', {
          attribute: t('modals:attributes.movie'),
        })!,
        invalid_type_error: t('modals:validation.required', {
          attribute: t('modals:attributes.movie'),
        })!,
      }
    ),
  });
