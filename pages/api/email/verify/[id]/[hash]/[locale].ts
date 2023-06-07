import axios, { getCsrf, verifyEmail } from '@/services';

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, hash, locale, expires, signature } = req.query;
  const queries = `expires=${expires}&signature=${signature}`;

  axios.default.interceptors.request.use((config) => {
    config.headers['Accept-Language'] = locale;
    return config;
  });
  await getCsrf().then(async () => {
    await verifyEmail(id as string, hash as string, queries);
    axios.default.interceptors.request.clear();
  });

  return res.redirect(`/${locale === 'ka' ? 'ka' : ''}/news-feed`);
}
