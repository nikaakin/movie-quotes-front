import { MAX_SIZE, MIME_TYPES } from '@/config';
import { TFunction } from 'next-i18next';
import { z } from 'zod';

export const movieSchema = (t: TFunction) =>
  z.object({
    title_en: z.string().regex(
      /^[A-Za-z\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.title'),
        language: t('modals:attributes.language_en'),
      })!
    ),
    title_ka: z.string().regex(
      /^[ა-ჰ\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.title'),
        language: t('modals:attributes.language_ka'),
      })!
    ),
    director_en: z.string().regex(
      /^[A-Za-z\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.director'),
        language: t('modals:attributes.language_en'),
      })!
    ),
    director_ka: z.string().regex(
      /^[ა-ჰ\s]+$/,
      t('modals:validation.regex', {
        attribute: t('modals:attributes.director'),
        language: t('modals:attributes.language_ka'),
      })!
    ),
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
    year: z.coerce
      .number()
      .min(
        1900,
        t('modals:validation.year_min', {
          min: 1900,
        })!
      )
      .max(
        2023,
        t('modals:validation.year_max', {
          max: 2023,
        })!
      ),
    genres: z.array(z.object({ value: z.number(), label: z.string() })).min(
      1,
      t('modals:validation.required', {
        attribute: t('modals:attributes.genres'),
      })!
    ),
  });
