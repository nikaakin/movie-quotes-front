import { useDropdown } from './useDropdown';

export const Dropdown = () => {
  const { setShow, show } = useDropdown();

  return (
    <div className='relative hidden  sm:block'>
      <button
        onClick={() => setShow(!show)}
        className='text-white bg-transparent rounded  focus:outline-none  font-medium  text-base px-4 py-2.5 text-center inline-flex items-center'
        type='button'
      >
        Eng
        <svg
          className='w-4 h-4 ml-2'
          aria-hidden='true'
          fill='white'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      {show && (
        <div className='z-10 absolute top-0 left-1/2 translate-y-14 -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700'>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
            <li>
              <button className='block px-10 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                ka
              </button>
            </li>
            <li>
              <button className='block px-10 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                Eng
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
