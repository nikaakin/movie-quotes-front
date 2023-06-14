import { Input } from '@/components';
import { useProfile } from './useProfile';

export const Profile = () => {
  const { t, register, errors, dirtyFields, handleSubmit, onSubmit } =
    useProfile();
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
          <button className='absolute text-xl mt-2 left-1/2 -translate-x-1/2'>
            {t('profile.upload')}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            errors={errors}
            name='username_display'
            placeholder=''
            register={register('username_display')}
            dirtyFields={dirtyFields}
            classNames=''
            title='Username'
          />
        </form>
      </section>
    </div>
  );
};
