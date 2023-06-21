import { Button } from '@/components';
import { use404 } from '@/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Custom404() {
  const { t, onClick } = use404();

  return (
    <div className='bg-lg-main w-screen h-screen flex justify-center items-center text-white'>
      <div className='flex flex-col items-center'>
        <div className='relative w-80 h-60'>
          <img
            src='/assets/images/404.png'
            alt=''
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10'
          />
          <img
            src='/assets/images/404-circle.png'
            alt=''
            className='absolute bottom-0 left-1/2 transform -translate-x-1/2'
          />
        </div>
        <h1 className='mt-8 sm:text-5xl text-2xl font-bold'>
          {t('404.title')}
        </h1>
        <p className='mt-4  text-base  sm:text-2xl font-medium sm:mb-12 mb-8 text-center'>
          {t('404.text')}
        </p>
        <Button
          classes='sm:!text-xl text-base px-7  sm:px-4 py-2 sm:py-3 '
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
