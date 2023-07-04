export type movieFormType = {
  description_en: string | undefined;
  description_ka: string | undefined;
  director_en: string | undefined;
  director_ka: string | undefined;
  genres: string | undefined;
  image: string | undefined;
  title_en: string | undefined;
  title_ka: string | undefined;
  year: number | string | undefined;
};

export type movieFormKeys = keyof movieFormType;
