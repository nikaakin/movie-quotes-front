import { ArrowIcon, Button, Input } from '@/components';
import { useForgotPassword } from './useForgotPassword';

export const ForgotPassword = () => {
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
    t,
  } = useForgotPassword();

  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        {t('form.forgot_password.title')}
      </h1>
      <h3 className='text-gray-550 text-center mb-6 w-90'>
        {t('form.forgot_password.second_title')}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          control={control}
          getFieldState={getFieldState}
          title={t('form.forgot_password.inputs.email.title')!}
          name='email'
          placeholder={t('form.forgot_password.inputs.email.placeholder')!}
          register={register('email')}
          setValue={setValue}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-8 mt-2'
          content={t('form.forgot_password.buttons.send')!}
          type='submit'
          isDisabled={!isValid || isLoading}
        />

        <p className='text-center'>
          <button
            className='relative text-gray-550'
            onClick={onShowLogin}
            type='button'
          >
            <span className='absolute top-1/2 -left-5 -translate-y-1/2'>
              <ArrowIcon />
            </span>
            {t('form.forgot_password.back')!}
          </button>
        </p>
      </form>
    </div>
  );
};
