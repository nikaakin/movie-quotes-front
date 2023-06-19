import { PencilWithBorderIcon } from '@/components';
import { Fragment } from 'react';
import { translationType } from '@/types';

export const WriteQuoteButton = ({ t }: translationType) => {
  return (
    <Fragment>
      <input
        type='radio'
        name='home_header'
        id='write_quote'
        className='peer/write-quote'
        defaultChecked
        hidden
      />
      <label
        htmlFor='write_quote'
        className='cursor-pointer text-white sm:peer-checked/write-quote:flex-1 sm:gap-4 gap-3 
        flex text-base sm:text-xl rounded-[10px] sm:bg-zinc-870 px-9 sm:py-3 sm:px-4 transition-all'
      >
        <PencilWithBorderIcon />
        <span>{t('home.write_quote')}</span>
      </label>
    </Fragment>
  );
};
