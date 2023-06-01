import Link from 'next/link';
import { useDropdown } from './useDropdown';
import dynamic from 'next/dynamic';

function Component() {
  const { setShow, show, t, locale } = useDropdown();

  return (
    <div className='relative hidden  sm:block'>
      <button
        onClick={() => setShow(!show)}
        className='text-white bg-transparent rounded  focus:outline-none  font-medium  text-base px-4 py-2.5 text-center inline-flex items-center'
        type='button'
      >
        {t(`locale.${locale}`)}
        <svg
          className='w-4 h-4 ml-2'
          aria-hidden='true'
          fill='white'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 9l-7 7-7-7'
          ></path>
        </svg>
      </button>
      {show && (
        <div
          className='fixed top-0 left-0 w-full h-full  bg-transparent  z-[600] '
          onClick={() => setShow(!show)}
        ></div>
      )}
      {show && (
        <div className='z-10 absolute top-0 left-1/2 translate-y-14 -translate-x-1/2 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700'>
          <ul className='py-2 text-sm text-gray-700 dark:text-gray-200'>
            <li>
              <Link
                href='#'
                locale='ka'
                onClick={() => setShow(!show)}
                className='block px-10 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                {t('locale.ka_full')}
              </Link>
            </li>
            <li>
              <Link
                href='#'
                locale='en'
                onClick={() => setShow(!show)}
                className='block px-10 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              >
                {t('locale.en_full')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export const Dropdown = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});
