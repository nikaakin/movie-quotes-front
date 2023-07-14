import { Button, GoogleIcon, Input } from '@/components';
import { useRegistration } from './useRegistration';

export const Registration = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    onShowLogin,
    setValue,
    isValid,
    isLoading,
    control,
    getFieldState,
    onPasswordChange,
    t,
  } = useRegistration();

  return (
    <div
      className='sm:bg-zinc-850 sm:bg-none   bg-lg-modals w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col   overflow-auto'
    >
      <h1 className='mx-auto font-medium sm:text-3xl text-2xl  text-center mb-3'>
        {t('form.register.title')!}
      </h1>
      <h3 className='text-gray-550 text-center mb-6'>
        {t('form.register.second_title')!}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
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
        <Input
          required
          control={control}
          getFieldState={getFieldState}
          title={t('form.register.inputs.email.title')!}
          type='email'
          name='email'
          placeholder={t('form.register.inputs.email.placeholder')!}
          register={register('email')}
          setValue={setValue}
        />
        <Input
          required
          shouldHide
          control={control}
          getFieldState={getFieldState}
          type='password'
          title={t('form.register.inputs.password.title')!}
          name='password'
          placeholder={t('form.register.inputs.password.placeholder')!}
          register={register('password', {
            onChange: (e) => onPasswordChange(e),
          })}
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
          placeholder={t('form.register.inputs.password_confirm.placeholder')!}
          register={register('passwordRepeat')}
          setValue={setValue}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-4'
          content={t('form.register.buttons.signup')!}
          type='submit'
          isDisabled={!isValid || isLoading}
        />
        <Button
          classes='w-full py-2 font-normal text-base mb-8'
          content={t('form.register.buttons.signup_google')!}
          icon={<GoogleIcon />}
          isLink
          isTransparent
        />

        <p className='text-center'>
          <span className='text-gray-550'>{t('form.register.text')}</span>{' '}
          <button
            className='text-blue-650 underline'
            onClick={onShowLogin}
            type='button'
          >
            {t('form.register.button_text')}
          </button>
        </p>
      </form>
    </div>
  );
};
