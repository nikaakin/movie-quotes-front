import { Button, GoogleIcon, Input } from '@/components';
import { useRegistration } from './useRegistration';
import { Login } from '@/components';

export const Registration = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    onShowLoginChange,
    showLogin,
    showNotification,
  } = useRegistration();

  if (showLogin) return <Login />;

  if (showNotification) return <>showNotification</>;

  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        Create an account
      </h1>
      <h3 className='text-gray-550 text-center mb-6'>Start your journey!</h3>
      <form className='w-[360px]' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          title='Name'
          errors={errors}
          name='username'
          placeholder='At least 3 & max.15 lower case characters'
          register={register('username')}
        />
        <Input
          required
          title='Email'
          type='email'
          errors={errors}
          name='email'
          placeholder='Enter your email'
          register={register('email')}
        />
        <Input
          required
          shouldHide
          type='password'
          title='Password'
          errors={errors}
          name='password'
          placeholder='At least 8 & max.15 lower case characters'
          register={register('password')}
        />
        <Input
          required
          shouldHide
          type='password'
          title='Confirm password'
          errors={errors}
          name='passwordRepeat'
          placeholder='Confirm password'
          register={register('passwordRepeat')}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-4'
          content='Get started'
          type='submit'
        />
        <Button
          classes='w-full py-2 font-normal text-base mb-8'
          content='Sign up with Google'
          icon={<GoogleIcon />}
          isTransparent
        />

        <p className='text-center'>
          <span className='text-gray-550'>Already have an account?</span>{' '}
          <button
            className='text-blue-650 underline'
            onClick={onShowLoginChange}
            type='button'
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};
