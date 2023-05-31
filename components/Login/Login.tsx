import {
  Button,
  ForgotPassword,
  GoogleIcon,
  Input,
  Registration,
} from '@/components';
import { useLogin } from './useLogin';

export const Login = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    showNotification,
    showPasswordReset,
    onShowPasswordReset,
    showRegistration,
    onShowRegistrationChange,
  } = useLogin();

  if (showNotification) return <>showNotification</>;

  if (showPasswordReset) return <ForgotPassword />;

  if (showRegistration) return <Registration />;

  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        Create an account
      </h1>
      <h3 className='text-gray-550 text-center mb-6 '>Start your journey!</h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          title='Email'
          errors={errors}
          name='emailOrUsername'
          placeholder='Enter email or username'
          register={register('emailOrUsername')}
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

        <div className='flex flex-row  items-center max-w-sm my-4'>
          <div className='flex-1'>
            <input
              type='checkbox'
              className='rounded mr-2'
              id='remember'
              {...register('remember')}
            />
            <label htmlFor='remember' className=' text-base font-normal'>
              Remember me
            </label>
          </div>
          <button
            className='text-blue-650  underline'
            type='button'
            onClick={onShowPasswordReset}
          >
            Forgot password
          </button>
        </div>

        <Button
          classes='w-full py-2 font-normal text-base mb-4'
          content='Sign in'
          type='submit'
        />
        <Button
          classes='w-full py-2 font-normal text-base mb-8'
          content='Sign in with Google'
          icon={<GoogleIcon />}
          isTransparent
        />

        <p className='text-center'>
          <span className='text-gray-550'>Dont have account yet?</span>{' '}
          <button
            className='text-blue-650 underline'
            onClick={onShowRegistrationChange}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};
