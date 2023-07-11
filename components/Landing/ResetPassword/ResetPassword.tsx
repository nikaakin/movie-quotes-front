import { ArrowIcon, Button, Input, ResetPasswordProps } from '@/components';
import { useResetPassword } from './useResetPassword';

export const ResetPassword = ({ email, token }: ResetPasswordProps) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    t,
    onShowLogin,
    setValue,
    isLoading,
    isValid,
    control,
    getFieldState,
  } = useResetPassword({
    email,
    token,
  });
  return (
    <div
      className='sm:bg-zinc-850 sm:bg-none   bg-lg-modals w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium sm:text-3xl text-2xl  text-center mb-3'>
        {t('form.reset-password.title')}
      </h1>
      <h3 className='text-gray-550 text-center mb-6 w-90'>
        {t('form.reset-password.second_title')}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          shouldHide
          control={control}
          getFieldState={getFieldState}
          type='password'
          title={t('form.reset-password.inputs.password.title')!}
          name='password'
          placeholder={t('form.reset-password.inputs.password.placeholder')!}
          register={register('password')}
          setValue={setValue}
        />
        <Input
          required
          shouldHide
          control={control}
          getFieldState={getFieldState}
          type='password'
          title={t('form.reset-password.inputs.password_confirm.title')!}
          name='passwordRepeat'
          placeholder={
            t('form.reset-password.inputs.password_confirm.placeholder')!
          }
          register={register('passwordRepeat')}
          setValue={setValue}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-8 mt-2'
          content={t('form.reset-password.buttons.send')!}
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
            {t('form.reset-password.back')!}
          </button>
        </p>
      </form>
    </div>
  );
};
