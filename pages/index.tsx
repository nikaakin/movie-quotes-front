import {
  Button,
  CheckEmailIcon,
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
    backgrounfRef,
    imageRefs,
    onShowRegister,
    onClose,
    currentModal,
    t,
    onLogin,
    onLinkExpired,
    resetPaswordData,
    isBackgroundIntersected,
  } = useLandingPage();

  return (
    <div className=' relative pt-107 sm:pt-200 text-white '>
      {currentModal && (
        <Modal
          onClose={onClose}
          background='black bg-opacity-50 backdrop-blur-sm'
        >
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
              image={<CheckEmailIcon />}
              title={t('modals:notification.accont-activated.title')}
              text={t('modals:notification.accont-activated.text')}
              buttonText={t('modals:notification.accont-activated.button_text')}
              onClick={onLogin}
            />
          ) : currentModal === 'password-changed' ? (
            <NotificationModal
              image={<CheckEmailIcon />}
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
            className='absolute sm:block  bottom-0 left-0 bg-transparent w-full h-70 z-[100]'
          ></button>
        )}
      </article>
      {imageUrls.map(({ url, movie, quote }, index) => {
        return (
          <div
            key={url}
            className=' h-screen   sticky top-0 overflow-x-hidden'
            onClick={changeIndex.bind(null, index + 1)}
          >
            <div
              className={`w-screen h-screen ${
                index === 1 && 'bg-lg-landing-third'
              }  absolute block  left-0 top-0 bg-transparent z-50`}
            ></div>
            <div className='absolute w-screen h-screen bg-lg-landing-second z-40 left-0 top-0 '></div>
            <article
              className={`h-screen z-${index * 10} `}
              ref={imageRefs[index]}
            >
              <div
                className={`w-screen h-screen absolute top-0 bg-cover bg-no-repeat  bg-center  ${
                  index !== 0 && 'bg-fixed'
                }`}
                style={{
                  backgroundImage: `url(${url})`,
                }}
              ></div>
            </article>

            <div className=' absolute top-0 pl-[10vw] z-50 flex flex-row sm:pt-[30vh] pt-[40vh] '>
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
          </div>
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
