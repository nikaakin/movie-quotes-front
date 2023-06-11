import { ArrowIcon, Button, Input, ResetPasswordProps } from '@/components';
import { useResetPassword } from './useResetPassword';

export const ResetPassword = ({ email, token }: ResetPasswordProps) => {
  const { errors, handleSubmit, onSubmit, register, t, onShowLogin } =
    useResetPassword({
      email,
      token,
    });
  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        {t('form.reset-password.title')}
      </h1>
      <h3 className='text-gray-550 text-center mb-6 w-90'>
        {t('form.reset-password.second_title')}
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          shouldHide
          type='password'
          title={t('form.reset-password.inputs.password.title')!}
          errors={errors}
          name='password'
          placeholder={t('form.reset-password.inputs.password.placeholder')!}
          register={register('password')}
        />
        <Input
          required
          shouldHide
          type='password'
          title={t('form.reset-password.inputs.password_confirm.title')!}
          errors={errors}
          name='passwordRepeat'
          placeholder={
            t('form.reset-password.inputs.password_confirm.placeholder')!
          }
          register={register('passwordRepeat')}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-8 mt-2'
          content={t('form.reset-password.buttons.send')!}
          type='submit'
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
