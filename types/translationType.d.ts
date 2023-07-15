import { TFunction } from 'next-i18next';

export type translationType = {
  t: TFunction;
};

export type languageType = {
  en: string;
  ka: string;
};

export type LocaleStringType = 'en' | 'ka';
