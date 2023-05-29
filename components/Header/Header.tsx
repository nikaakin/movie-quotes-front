import React from 'react';
import { Dropdown } from './components';
import { Button } from '@/components';

export const Header = () => {
  return (
    <header className='py-6 sm:py-8 sm:px-16 px-4 flex justify-between w-full text-white'>
      <h1 className='uppercase text-orange-250 text-base font-medium '>
        Movies Quotes
      </h1>
      <div className='flex flex-row justify-between gap-2 sm:gap-4'>
        <Dropdown />
        <Button content='Login in' classes='sm:px-6 sm:py-2 px-2 py-1' />
        <Button
          content='Sign Up'
          isTransparent={false}
          classes='sm:px-6 sm:py-2 px-2 py-1'
        />
      </div>
    </header>
  );
};
