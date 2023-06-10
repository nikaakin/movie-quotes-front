import {
  Button,
  CheckEmailIcon,
  CheckMarkIcon,
  ForgotPassword,
  Header,
  Login,
  Modal,
  NotificationModal,
  Registration,
  ResetPassword,
} from '@/components';
import { imageUrls } from '@/config';
import { useLandingPage } from '@/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Home() {
  const {
    changeIndex,
    isBackgroundIntersected,
    shouldAnimate,
    show,
    backgrounfRef,
    imageRefs,
    onShowRegister,
    onClose,
    currentModal,
    t,
    locale,
    onLogin,
    onLinkExpired,
    resetPaswordData,
  } = useLandingPage();

  return (
    <div
      className={`overflow-hidden relative pt-107  sm:pt-200 text-white ${
        locale === 'en' ? 'font-helvetica-neue' : 'font-helvetica-georgian'
      }`}
    >
      {currentModal && (
        <Modal onClose={onClose}>
          {currentModal === 'login' ? (
            <Login />
          ) : currentModal === 'register' ? (
            <Registration />
          ) : currentModal === 'forgot-password' ? (
            <ForgotPassword />
          ) : currentModal === 'reset-password' ? (
            <ResetPassword
              email={resetPaswordData.email}
              token={resetPaswordData.token}
            />
          ) : currentModal === 'register-notification' ? (
            <NotificationModal
              image={<CheckEmailIcon />}
              title={t('modals:notification.register-notification.title')}
              text={t('modals:notification.register-notification.text')}
              buttonText={t(
                'modals:notification.register-notification.button_text'
              )}
              onClick={onClose}
            />
          ) : currentModal === 'forgot-password-notification' ? (
            <NotificationModal
              image={<CheckEmailIcon />}
              title={t(
                'modals:notification.forgot-password-notification.title'
              )}
              text={t('modals:notification.forgot-password-notification.text')}
              buttonText={t(
                'modals:notification.forgot-password-notification.button_text'
              )}
              skip={t('modals:notification.forgot-password-notification.skip')!}
              onClick={onClose}
            />
          ) : currentModal === 'account-activated' ? (
            <NotificationModal
              image={<CheckMarkIcon />}
              title={t('modals:notification.accont-activated.title')}
              text={t('modals:notification.accont-activated.text')}
              buttonText={t('modals:notification.accont-activated.button_text')}
              onClick={onLogin}
            />
          ) : currentModal === 'password-changed' ? (
            <NotificationModal
              image={<CheckMarkIcon />}
              title={t('modals:notification.password-changed.title')}
              text={t('modals:notification.password-changed.text')}
              buttonText={t('modals:notification.password-changed.button_text')}
              onClick={onLogin}
            />
          ) : currentModal === 'link-expired' ? (
            <NotificationModal
              image='/assets/images/link-expired.png'
              title={t('modals:notification.link-expired.title')}
              text={t('modals:notification.link-expired.text')}
              buttonText={t('modals:notification.link-expired.button_text')}
              onClick={onLinkExpired}
            />
          ) : null}
        </Modal>
      )}

      <div className='absolute z-[100] top-0 left-0 w-full'>
        <Header />
      </div>
      <article
        className='h-screen w-full absolute bg-lg-landing-first top-0 '
        ref={backgrounfRef}
      >
        <div className='top-1/3  left-1/2 -translate-x-1/2 absolute w-72 sm:w-175 z-50 text-center'>
          <h1 className='mb-8 sm:mb-6 text-2xl sm:text-6xl font-bold text-orange-250'>
            {t('landing.main_title')}
          </h1>
          <Button
            content={t('button.get_started_text')}
            isTransparent={false}
            classes='sm:px-4 sm:py-2 px-2 py-2'
            onClick={onShowRegister}
          />
        </div>
        {isBackgroundIntersected && (
          <button
            onClick={changeIndex.bind(null, 0)}
            className='hidden absolute sm:block  bottom-0 left-0 bg-transparent w-full h-70 z-[100]'
          ></button>
        )}
      </article>
      <div className='fixed w-full h-full bg-lg-landing-second z-40 left-0 top-0 '></div>
      {imageUrls.map(({ url, movie, quote }, index) => {
        return (
          <article
            key={url}
            className=' relative w-full h-107 sm:h-300 
              overflow-hidden bg-fixed bg-cover  sm:bg-bottom bg-right bg-no-repeat flex items-center'
            style={{
              backgroundImage: `url(${url})`,
              backgroundAttachment: show ? 'fixed' : 'scroll',
            }}
            ref={imageRefs[index]}
          >
            <div
              className={`pl-[10vw] z-40 flex flex-row ${
                shouldAnimate ? 'quote-fade' : ''
              }`}
            >
              <span className='border-[1px] border-white h-0 sm:w-14 w-4 mt-4 sm:mt-10 sm:mr-4 mr-2 '></span>
              <div className='leading-10'>
                <h1 className='text-xl font-bold w-68 sm:text-5xl sm:w-1/2 !leading-normal mb-2'>
                  {quote}
                </h1>
                <h3 className='text-zinc-350 font-bold text-base sm:text-3xl'>
                  {movie}
                </h3>
              </div>
            </div>

            <button
              onClick={changeIndex.bind(null, index + 1)}
              className={`${
                index === 1 ? 'bg-lg-landing-third' : ''
              } hidden absolute sm:block  left-0 top-0 bg-transparent w-full h-full z-50`}
            ></button>
          </article>
        );
      })}
      <footer className='pl-8 py-3 sm:pl-20 text-orange-250 sm:py-4 font-medium text-[8px] sm:text-xs relative z-[110] bg-lg-main'>
        {t('landing.footer_text')}
      </footer>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'modals'])),
    },
  };
}
