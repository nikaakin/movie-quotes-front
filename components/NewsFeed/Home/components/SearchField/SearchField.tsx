import { Fragment } from 'react';

export const SearchField = () => {
  return (
    <Fragment>
      <input
        type='radio'
        name='home_header'
        id='search_field'
        className='peer/search-field'
        hidden
      />
      <label
        htmlFor='search_field'
        className='text-white peer-checked/search-field:text-red-500 cursor-pointer'
      >
        text
      </label>
    </Fragment>
  );
};
