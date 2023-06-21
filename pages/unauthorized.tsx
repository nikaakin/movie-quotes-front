import { Button } from '@/components';
import { use403 } from '@/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom403() {
  const { t, onClick } = use403();

  return (
    <div className='bg-lg-main w-screen h-screen flex justify-center items-center text-white'>
      <div className='flex flex-col items-center'>
        <div className='relative w-80 h-60'>
          <img
            src='/assets/images/403-gandolf.png'
            alt='gandolf'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
          />
          <img
            src='/assets/images/403-shape.png'
            alt='shape'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          />
        </div>
        <h1 className='mt-8 text-5xl font-bold'>{t('403.title')}</h1>
        <p className='mt-4  text-2xl font-medium mb-12'>{t('403.text')}</p>
        <Button
          classes='!text-xl px-4 py-3 '
          onClick={onClick}
          content={t('403.button')}
        />
      </div>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}
