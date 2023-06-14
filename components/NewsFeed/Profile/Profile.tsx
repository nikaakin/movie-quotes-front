import { Input } from '@/components';
import { useProfile } from './useProfile';

export const Profile = () => {
  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    editEmail,
    editPassword,
    editUsername,
    setEditEmail,
    setEditPassword,
    setEditUsername,
    setValue,
    getFieldState,
    control,
  } = useProfile();
  return (
    <div className='flex-1 text-white '>
      <h1 className='p-8'>{t('header.profile')}</h1>
      <section className='w-250 h-auto relative mt-20 bg-neutral-950 backdrop-blur-xl rounded-[12px] mb-20 pl-48 pt-48 pr-72 pb-40'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 '>
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-8'>
            <Input
              control={control}
              name='username'
              placeholder='saxeli'
              register={register('username')}
              getFieldState={getFieldState}
              classNames='w-125'
              title={t('profile.username')!}
              setValue={setValue}
              disabled
            />
            <button
              className='text-gray-350 text-lg sm:text-xl'
              onClick={setEditUsername.bind(null, !editUsername)}
            >
              {t('profile.edit_button')}
            </button>
          </div>
          {editUsername && (
            <Input
              control={control}
              getFieldState={getFieldState}
              required
              title={t('form.register.inputs.email.title')!}
              type='email'
              name='email'
              placeholder={t('form.register.inputs.email.placeholder')!}
              register={register('email')}
              setValue={setValue}
            />
          )}
        </form>
      </section>
    </div>
  );
};
