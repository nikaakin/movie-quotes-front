import { ArrowIcon, DisplayInput, Input } from '@/components';
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
  } = useProfile();
  return (
    <div className='flex-1 text-white '>
      <h1 className='p-8 hidden sm:block '>{t('header.profile')}</h1>
      <button className='p-6 sm:hidden block'>
        <ArrowIcon />
      </button>
      <section className='w-full h-full sm:w-250 sm:h-auto relative sm:mt-20 bg-zinc-870 sm:bg-neutral-950 backdrop-blur-xl rounded-[12px] mb-20 sm:pl-48 sm:pt-48 sm:pr-72 sm:pb-40 px-8'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 sm:-translate-y-1/3 translate-y-7 '>
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

        <form onSubmit={handleSubmit(onSubmit)} className='pt-80 sm:pt-0'>
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
          {editUsername && (
            <Input
              required
              control={control}
              getFieldState={getFieldState}
              title={t('form.register.inputs.username.title')!}
              name='username'
              placeholder={t('form.register.inputs.username.placeholder')!}
              register={register('username')}
              setValue={setValue}
            />
          )}
          <DisplayInput button={<></>} />

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
          {editPassword && (
            <Fragment>
              <Input
                required
                shouldHide
                control={control}
                getFieldState={getFieldState}
                type='password'
                title={t('form.register.inputs.password.title')!}
                name='password'
                placeholder={t('form.register.inputs.password.placeholder')!}
                register={register('password')}
                setValue={setValue}
              />
              <Input
                required
                shouldHide
                control={control}
                getFieldState={getFieldState}
                type='password'
                title={t('form.register.inputs.password_confirm.title')!}
                name='passwordRepeat'
                placeholder={
                  t('form.register.inputs.password_confirm.placeholder')!
                }
                register={register('passwordRepeat')}
                setValue={setValue}
              />
            </Fragment>
          )}
        </form>
      </section>
    </div>
  );
};
