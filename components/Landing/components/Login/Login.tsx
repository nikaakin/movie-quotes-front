import { Button, GoogleIcon, Input } from '@/components';
import { useLogin } from './useLogin';

export const Login = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    onShowPasswordReset,
    onShowRegistration,
    setValue,
    isValid,
    isLoading,
    control,
    getFieldState,
    invalidCredentialsError,
    t,
  } = useLogin();

  return (
    <div
      className=' sm:bg-zinc-850 sm:bg-none  bg-lg-modals w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col overflow-auto'
    >
      <h1 className='mx-auto font-medium sm:text-3xl text-2xl  text-center mb-3'>
        {t('form.login.title')}
      </h1>
      <h3 className='text-gray-550 text-center mb-6 '>
        {t('form.login.second_title')}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          getFieldState={getFieldState}
          title={t('form.login.inputs.emailOrUsername.title')!}
          name='username'
          placeholder={t('form.login.inputs.emailOrUsername.placeholder')!}
          register={register('username')}
          setValue={setValue}
        />

        <Input
          shouldHide
          type='password'
          title={t('form.login.inputs.password.title')!}
          control={control}
          getFieldState={getFieldState}
          name='password'
          placeholder={t('form.login.inputs.password.placeholder')!}
          register={register('password')}
          setValue={setValue}
        />

        <div className='flex flex-row  items-center max-w-sm my-4 relative pt-4 '>
          <span className='absolute top-2 left-0 -translate-y-full text-red-550 text-base'>
            {invalidCredentialsError as string}
          </span>
          <div className='flex-1 flex items-center'>
            <input
              type='checkbox'
              className='rounded mr-2 w-4 h-4 '
              id='remember'
              {...register('remember')}
            />
            <label htmlFor='remember' className=' text-base font-normal'>
              {t('form.login.remember_me')}
            </label>
          </div>
          <button
            className='text-blue-650  underline'
            type='button'
            onClick={onShowPasswordReset}
          >
            {t('form.login.forgot_password')}
          </button>
        </div>

        <Button
          classes='w-full py-2 font-normal text-base mb-4'
          content={t('form.login.buttons.login')}
          type='submit'
          isDisabled={!isValid || isLoading}
        />
        <Button
          classes='w-full py-2 font-normal text-base mb-8'
          content={t('form.login.buttons.login_google')}
          icon={<GoogleIcon />}
          isTransparent
          isLink
        />
        <p className='text-center'>
          <span className='text-gray-550'>{t('form.login.text')}</span>{' '}
          <button
            className='text-blue-650 underline'
            onClick={onShowRegistration}
            type='button'
          >
            {t('form.register.buttons.signup')}
          </button>
        </p>
      </form>
    </div>
  );
};
