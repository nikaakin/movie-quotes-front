import { Button, GoogleIcon, Input } from '@/components';
import { useLogin } from './useLogin';
import { ErrorMessage } from '@hookform/error-message';

export const Login = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    onShowPasswordReset,
    onShowRegistration,
    t,
  } = useLogin();

  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        {t('form.login.title')}
      </h1>
      <h3 className='text-gray-550 text-center mb-6 '>
        {t('form.login.second_title')}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          title={t('form.login.inputs.emailOrUsername.title')!}
          errors={errors}
          name='username'
          placeholder={t('form.login.inputs.emailOrUsername.placeholder')!}
          register={register('username')}
        />

        <Input
          required
          shouldHide
          type='password'
          title={t('form.login.inputs.password.title')!}
          errors={errors}
          name='password'
          placeholder={t('form.login.inputs.password.placeholder')!}
          register={register('password')}
        />

        <div className='flex flex-row  items-center max-w-sm my-4 relative pt-4 '>
          <span className='absolute top-2 left-0 -translate-y-full text-red-550 text-base'>
            <ErrorMessage errors={errors} name='invalid_credentials' />
          </span>
          <div className='flex-1'>
            <input
              type='checkbox'
              className='rounded mr-2'
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
        />
        <Button
          classes='w-full py-2 font-normal text-base mb-8'
          content={t('form.login.buttons.login_google')}
          icon={<GoogleIcon />}
          isTransparent
        />

        <p className='text-center'>
          <span className='text-gray-550'>{t('form.login.text')}</span>{' '}
          <button
            className='text-blue-650 underline'
            onClick={onShowRegistration}
            type='button'
          >
            {t('form.login.button_text')}
          </button>
        </p>
      </form>
    </div>
  );
};
