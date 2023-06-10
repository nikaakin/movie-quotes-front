import { getCsrf } from '@/services';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, token, locale } = req.query;

  try {
    await getCsrf();
    return res.redirect(
      `/${locale === 'ka' ? 'ka' : 'en'}/?token=${token}&email=${email}`
    );
  } catch (e) {
    return res.redirect(
      `/${locale === 'ka' ? 'ka' : 'en'}/?is_available=false`
    );
  }
}
