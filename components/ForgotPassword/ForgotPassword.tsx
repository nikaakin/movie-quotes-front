import { ArrowIcon, Button, Input, Login } from '@/components';
import { useForgotPassword } from './useForgotPassword';

export const ForgotPassword = () => {
  const {
    errors,
    handleSubmit,
    onSubmit,
    register,
    showNotification,
    onShowLoginChange,
    showLogin,
  } = useForgotPassword();

  if (showNotification) return <>showNotification</>;

  if (showLogin) return <Login />;

  return (
    <div
      className='bg-zinc-850 w-full h-full py-16 sm:py-14 
     sm:px-32 text-white sm:rounded-[10px] flex items-center flex-col '
    >
      <h1 className='mx-auto font-medium text-3xl  text-center mb-3'>
        Create an account
      </h1>
      <h3 className='text-gray-550 text-center mb-6 w-90'>
        Enter the email and we’ll send an email with instructions to reset your
        password
      </h3>
      <form className='w-90' onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          title='Name'
          errors={errors}
          name='email'
          placeholder='Enter email or username'
          register={register('email')}
        />

        <Button
          classes='w-full py-2 font-normal text-base mb-8 mt-2'
          content='Send instructions'
        />

        <p className='text-center'>
          <button
            className='relative text-gray-550'
            onClick={onShowLoginChange}
          >
            <span className='absolute top-1/2 -left-5 -translate-y-1/2'>
              <ArrowIcon />
            </span>
            Back to log in
          </button>
        </p>
      </form>
    </div>
  );
};
