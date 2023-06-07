import { getCsrf, verifyEmail } from '@/services';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, hash, locale, expires, signature } = req.query;

  await getCsrf().then(async () => {
    await verifyEmail(
      id as string,
      hash as string,
      expires as string,
      signature as string
    );
  });

  return res.redirect(`/${locale === 'ka' ? 'ka' : 'en'}/news-feed`);
}
