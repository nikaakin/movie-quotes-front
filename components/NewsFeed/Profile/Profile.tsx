import {
  ArrowIcon,
  Button,
  ConfirmationModal,
  DisplayInput,
  EditNotification,
  Input,
  Modal,
  PasswordValidDisplay,
} from '@/components';
import { useProfile } from './useProfile';
import { Fragment } from 'react';

export const Profile = () => {
  const {
    t,
    register,
    onSubmit,
    editPassword,
    editUsername,
    setEditPassword,
    setEditUsername,
    setValue,
    getFieldState,
    control,
    resetState,
    email,
    username,
    google_id,
    currentModal,
    onClose,
    onSaveChanges,
    isMorethen,
    isLessThen,
    onPasswordInputChange,
    avatar,
    onImageChange,
    imageError,
    errors,
    editEmail,
    setEditEmail,
    submitOnBigScreen,
  } = useProfile();

  return (
    <div className='flex-1 text-white bg-neutral-950 sm:bg-transparent h-full'>
      {currentModal === 'confirmation-notification' ? (
        <Modal onClose={onClose} background='lg-main' shouldHaveX={false}>
          <ConfirmationModal
            onClose={onClose}
            onSubmit={onSubmit}
            cancel={t('profile.cancel')}
            confirm={t('modals:confirmation.confirm')}
            title={t('modals:confirmation.title')}
          />
        </Modal>
      ) : (
        <Fragment>
          {currentModal === 'edit-notification' && (
            <Modal onClose={onClose} background='lg-main' shouldHaveX={false}>
              <EditNotification
                onClose={onClose}
                title={t('profile.changed')}
              />
            </Modal>
          )}
          <h1 className='p-8 hidden sm:block '>{t('header.profile')}</h1>
          <button className='p-6 sm:hidden block' onClick={resetState}>
            <ArrowIcon />
          </button>
          <section className='w-full h-full sm:w-250 sm:h-auto relative sm:mt-20 bg-zinc-870 sm:bg-neutral-950 backdrop-blur-xl sm:rounded-[12px] rounded-t-[12px] mb-20 sm:pl-48 sm:pt-48 sm:pr-72 pb-10 px-8'>
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 sm:-translate-y-1/3 translate-y-7 ${
                (editPassword || editUsername || editEmail) && 'hidden'
              } sm:!block`}
            >
              <div className=' bg-white rounded-[50%] w-48 h-48 overflow-hidden '>
                <img
                  src={avatar}
                  alt='avatar'
                  className='object-fill w-full h-full '
                />
              </div>
              <input
                type='file'
                className='hidden'
                id='image'
                {...register('image', {
                  shouldUnregister: true,
                  onChange: onImageChange,
                })}
              />
              <label
                htmlFor='image'
                className='text-xl flex justify-center w-full cursor-pointer text-center'
              >
                {t('profile.upload')}
              </label>
              {imageError && (
                <span className='absolute left-2 bottom-0 translate-y-full text-red-550 text-base'>
                  {imageError as string}
                </span>
              )}
            </div>

            <form
              className={`  ${
                editPassword || editUsername || editEmail ? 'pt-10' : 'pt-80'
              }  sm:pt-0`}
            >
              <div
                className={`${
                  (editPassword || editUsername || editEmail) && 'hidden'
                } sm:!block`}
              >
                <DisplayInput
                  title={t('modals:form.register.inputs.username.title')!}
                  placeholder={username}
                  button={
                    <button
                      type='button'
                      className='text-gray-350 text-lg sm:text-xl sm:mt-2  absolute right-0 top-0  sm:-right-8 sm:translate-x-full'
                      onClick={setEditUsername.bind(null, !editUsername)}
                    >
                      {t('profile.edit_button')}
                    </button>
                  }
                />
              </div>

              {editUsername && (
                <Input
                  control={control}
                  getFieldState={getFieldState}
                  title={t('modals:form.register.inputs.username.title')!}
                  name='username'
                  placeholder={
                    t('modals:form.register.inputs.username.placeholder')!
                  }
                  register={register('username', { shouldUnregister: true })}
                  setValue={setValue}
                />
              )}

              <div
                className={`${
                  (editPassword || editUsername || editEmail) && 'hidden'
                } sm:!block`}
              >
                <DisplayInput
                  title={t('modals:form.register.inputs.email.title')!}
                  button={
                    google_id ? (
                      <></>
                    ) : (
                      <button
                        type='button'
                        className='text-gray-350 text-lg sm:text-xl sm:mt-2  absolute right-0 top-0  sm:-right-8 sm:translate-x-full'
                        onClick={setEditEmail.bind(null, !editEmail)}
                      >
                        {t('profile.edit_button')}
                      </button>
                    )
                  }
                  placeholder={email}
                />
              </div>

              {editEmail && (
                <Input
                  control={control}
                  getFieldState={getFieldState}
                  title={t('modals:form.register.inputs.email.title')!}
                  name='newEmail'
                  placeholder={
                    t('modals:form.register.inputs.email.placeholder')!
                  }
                  register={register('newEmail', { shouldUnregister: true })}
                  setValue={setValue}
                />
              )}

              {!google_id && (
                <div
                  className={`${
                    editPassword || editUsername || editEmail ? 'hidden' : ''
                  } sm:!block`}
                >
                  <DisplayInput
                    placeholder='*********'
                    title={t('modals:form.register.inputs.password.title')!}
                    button={
                      <button
                        type='button'
                        className='text-gray-350 text-lg sm:text-xl sm:mt-2  absolute right-0 top-0  sm:-right-8 sm:translate-x-full'
                        onClick={setEditPassword.bind(null, !editPassword)}
                      >
                        {t('profile.edit_button')}
                      </button>
                    }
                  />
                </div>
              )}

              {editPassword && (
                <Fragment>
                  <PasswordValidDisplay
                    isLessThen={isLessThen}
                    isMoreThen={isMorethen}
                    max={t('profile.password_validation_max')}
                    min={t('profile.password_validation_min')}
                    title={t('profile.password_validation_header')}
                  />

                  <Input
                    shouldHide
                    control={control}
                    getFieldState={getFieldState}
                    type='password'
                    title={t('modals:form.register.inputs.password.title')!}
                    name='password'
                    placeholder={
                      t('modals:form.register.inputs.password.placeholder')!
                    }
                    register={register('password', {
                      shouldUnregister: true,
                      onChange: onPasswordInputChange,
                    })}
                    setValue={setValue}
                  />
                  <Input
                    shouldHide
                    control={control}
                    getFieldState={getFieldState}
                    type='password'
                    title={
                      t('modals:form.register.inputs.password_confirm.title')!
                    }
                    name='passwordRepeat'
                    placeholder={
                      t(
                        'modals:form.register.inputs.password_confirm.placeholder'
                      )!
                    }
                    register={register('passwordRepeat', {
                      shouldUnregister: true,
                    })}
                    setValue={setValue}
                  />
                </Fragment>
              )}
            </form>
          </section>
          <div className='text-xl sm:mr-105 flex justify-between sm:justify-end pr-8 sm:pr-0 pl-14 pb-10 sm:gap-8 '>
            <button type='button' onClick={resetState}>
              {t('profile.cancel')}
            </button>
            <Button
              content={t('profile.save')}
              classes='py-2 px-4  !text-base block sm:hidden'
              isDisabled={Object.keys(errors).length > 0}
              type='submit'
              onClick={onSaveChanges}
            />
            <Button
              content={t('profile.save')}
              classes='py-2 px-4 !text-xl  hidden sm:block'
              isDisabled={Object.keys(errors).length > 0}
              type='submit'
              onClick={submitOnBigScreen}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};
