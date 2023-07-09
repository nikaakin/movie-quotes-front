import { BellIcon, CommentWithQuoteIcon, HeartIcon } from '@/components';
import { useNotification } from './useNotification';
import { Fragment } from 'react';

export const Notification = () => {
  const { isOutside, ref, notifications, dateCalc, t } = useNotification();
  return (
    <div className='flex items-center relative' ref={ref}>
      <button className='relative'>
        <BellIcon />
        {notifications.length && (
          <span className='absolute top-0 right-0 translate-x-1/2  text-white font-medium text-base w-6 h-6 rounded-full bg-red-650'>
            {notifications.length}
          </span>
        )}
      </button>

      {!isOutside && (
        <div
          className='
        px-8 sm:pt-10 pt-6  sm:pb-12 pb-9 flex flex-col
        z-[100] bg-black w-screen h-[85vh] sm:w-250 sm:h-206 absolute -bottom-7 sm:rounded-[12px] -right-9 sm:right-0 translate-y-full sm:translate-x-64 before:w-0 before:-translate-y-full before:h-0 before:absolute before:top-0 before:right-12 sm:before:right-68 before:translate-x-1/2 before:border-l-[12px] before:border-l-transparent before:border-r-[12px] before:border-r-transparent before:border-b-[20px] sm:before:border-b-[30px] before:border-b-black'
        >
          <header className='flex justify-between mb-6'>
            <h1 className='text-xl sm:text-3xl font-medium'>
              {t('common:notification.title')}
            </h1>
            <button className='text-sm underline sm:text-xl'>
              {t('common:notification.mark_all_as_read')}
            </button>
          </header>
          <section className='flex flex-col flex-1 overflow-auto gap-2 h-28'>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className='border border-gray-550 border-opacity-50 sm:px-6 px-4 py-4'
              >
                <div className='flex gap-3 sm:gap-6'>
                  <div
                    className={`bg-white rounded-[50%] w-14 h-14 sm:w-20 sm:h-20 overflow-hidden mb-3 sm:mb-0 sm:mr-0 ${
                      !notification.seen && 'border-2 border-green-750'
                    }`}
                  >
                    <img
                      src={notification.user.image}
                      alt='avatar'
                      className='object-fill w-full h-full'
                    />
                  </div>
                  <div className='flex flex-col sm:flex-row justify-between flex-1 gap-2'>
                    <div>
                      <h2 className='mb-1 text-xl capitalize'>
                        {notification.user.username}
                      </h2>
                      <div className='flex items-center gap-3  sm:text-xl text-base '>
                        {notification.comment ? (
                          <Fragment>
                            <CommentWithQuoteIcon />
                            {t('common:notification.commented')}
                          </Fragment>
                        ) : (
                          <Fragment>
                            <HeartIcon shouldFill />
                            {t('common:notification.reacted')}
                          </Fragment>
                        )}
                      </div>
                    </div>
                    <div className='relative text-zinc-350 sm:text-xl text-base '>
                      {dateCalc(notification.created_at)}{' '}
                      {!notification.seen && (
                        <span className='text-green-750 sm:text-xl text-base absolute sm:-bottom-4 sm:right-0 sm:-translate-y-full sm:left-auto sm:translate-x-0 sm:top-auto -left-5 -translate-x-full top-0'>
                          {t('common:notification.new')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
