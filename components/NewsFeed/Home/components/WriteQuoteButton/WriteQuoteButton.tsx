import { Fragment } from 'react';

export const WriteQuoteButton = () => {
  return (
    <Fragment>
      <input
        type='radio'
        name='home_header'
        id='write_quote'
        className='peer/write-quote'
        hidden
      />
      <label
        htmlFor='write_quote'
        className='cursor-pointer text-white peer-checked/write-quote:text-red-500'
      >
        tetstet
      </label>
    </Fragment>
  );
};
