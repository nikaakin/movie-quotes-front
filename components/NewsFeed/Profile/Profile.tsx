import { ArrowIcon, Button, DisplayInput, Input } from '@/components';
import { useProfile } from './useProfile';
import { Fragment } from 'react';

export const Profile = () => {
  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    editPassword,
    editUsername,
    setEditPassword,
    setEditUsername,
    setValue,
    getFieldState,
    control,
    resetState,
    isValid,
  } = useProfile();

  return (
    <div className='flex-1 text-white bg-neutral-950 sm:bg-transparent h-full'>
      <h1 className='p-8 hidden sm:block '>{t('header.profile')}</h1>
      <button className='p-6 sm:hidden block' onClick={resetState}>
        <ArrowIcon />
      </button>
      <section className='w-full h-full sm:w-250 sm:h-auto relative sm:mt-20 bg-zinc-870 sm:bg-neutral-950 backdrop-blur-xl sm:rounded-[12px] rounded-t-[12px] mb-20 sm:pl-48 sm:pt-48 sm:pr-72 pb-10 px-8'>
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 sm:-translate-y-1/3 translate-y-7 ${
            editPassword || editUsername ? 'hidden' : ''
          } sm:!block`}
        >
          <div className=' bg-white rounded-[50%] w-48 h-48 overflow-hidden '>
            <img
              src='/assets/images/link-expired.png'
              alt='avatar'
              className='object-fill w-full h-full '
            />
          </div>
          <button className='absolute text-xl mt-2 left-1/2 -translate-x-1/2 w-full'>
            {t('profile.upload')}
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`  ${
            editPassword || editUsername ? 'pt-10' : 'pt-80'
          }  sm:pt-0`}
        >
          <div
            className={`${
              editPassword || editUsername ? 'hidden' : ''
            } sm:!block`}
          >
            <DisplayInput
              button={
                <button
                  className='text-gray-350 text-lg sm:text-xl sm:mt-2  absolute right-0 top-0  sm:-right-8 sm:translate-x-full'
                  onClick={setEditUsername.bind(null, !editUsername)}
                >
                  {t('profile.edit_button')}
                </button>
              }
            />
          </div>
          {editUsername && (
            <Input
              required
              control={control}
              getFieldState={getFieldState}
              title={t('modals:form.register.inputs.username.title')!}
              name='username'
              placeholder={
                t('modals:form.register.inputs.username.placeholder')!
              }
              register={register('username')}
              setValue={setValue}
            />
          )}
          <div
            className={`${
              editPassword || editUsername ? 'hidden' : ''
            } sm:!block`}
          >
            <DisplayInput button={<></>} />
          </div>
          <div
            className={`${
              editPassword || editUsername ? 'hidden' : ''
            } sm:!block`}
          >
            <DisplayInput
              button={
                <button
                  className='text-gray-350 text-lg sm:text-xl sm:mt-2  absolute right-0 top-0  sm:-right-8 sm:translate-x-full'
                  onClick={setEditPassword.bind(null, !editPassword)}
                >
                  {t('profile.edit_button')}
                </button>
              }
            />
          </div>
          {editPassword && (
            <Fragment>
              <Input
                required
                shouldHide
                control={control}
                getFieldState={getFieldState}
                type='password'
                title={t('modals:form.register.inputs.password.title')!}
                name='password'
                placeholder={
                  t('modals:form.register.inputs.password.placeholder')!
                }
                register={register('password')}
                setValue={setValue}
              />
              <Input
                required
                shouldHide
                control={control}
                getFieldState={getFieldState}
                type='password'
                title={t('modals:form.register.inputs.password_confirm.title')!}
                name='passwordRepeat'
                placeholder={
                  t('modals:form.register.inputs.password_confirm.placeholder')!
                }
                register={register('passwordRepeat')}
                setValue={setValue}
              />
            </Fragment>
          )}
        </form>
      </section>
      <div className='text-xl sm:mr-105 flex justify-between sm:justify-end pr-8 sm:pr-0 pl-14 pb-10 sm:gap-8 '>
        <button type='button'>{t('profile.cancel')}</button>
        <Button
          content={t('profile.save')}
          classes='py-2 px-4 sm:!text-xl !text-base'
          isDisabled={isValid}
          type='button'
        />
      </div>
    </div>
  );
};
