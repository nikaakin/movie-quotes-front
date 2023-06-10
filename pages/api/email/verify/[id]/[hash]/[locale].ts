import { getCsrf, verifyEmail } from '@/services';
import { AxiosError } from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, hash, locale, expires, signature } = req.query;

  try {
    await getCsrf();
    await verifyEmail(
      id as string,
      hash as string,
      expires as string,
      signature as string
    );
    return res.redirect(`/${locale === 'ka' ? 'ka' : 'en'}/?verified=true`);
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      return res.redirect(`/${locale === 'ka' ? 'ka' : 'en'}/?verified=false`);
  }
  return res.redirect(`/${locale === 'ka' ? 'ka' : 'en'}/`);
}
