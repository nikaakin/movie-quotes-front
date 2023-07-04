export const HeartIcon = ({
  shouldFill = false,
  disabled = false,
}: {
  shouldFill?: boolean;
  disabled?: boolean;
}) => {
  return !shouldFill ? (
    <svg
      width='32'
      height='30'
      viewBox='0 0 32 30'
      fill=''
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 sm:w-8 sm:h-8 h-6 transition-colors duration-100 like'
    >
      <path
        className={`${!disabled && 'like-child'}`}
        d='M15.9999 5.4961L14.5659 4.0221C11.1999 0.562097 5.02791 1.7561 2.79991 6.1061C1.75391 8.1521 1.51791 11.1061 3.42791 14.8761C5.26791 18.5061 9.09591 22.8541 15.9999 27.5901C22.9039 22.8541 26.7299 18.5061 28.5719 14.8761C30.4819 11.1041 30.2479 8.1521 29.1999 6.1061C26.9719 1.7561 20.7999 0.560097 17.4339 4.0201L15.9999 5.4961ZM15.9999 30.0001C-14.6661 9.7361 6.55791 -6.0799 15.6479 2.2861C15.7679 2.3961 15.8859 2.5101 15.9999 2.6281C16.1128 2.5102 16.2302 2.39678 16.3519 2.2881C25.4399 -6.0839 46.6659 9.7341 15.9999 30.0001Z'
        fill='white'
      />
    </svg>
  ) : (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-6 sm:w-8 sm:h-8 h-6 transition-colors duration-100'
    >
      <g id='heart-fill' clipPath='url(#clip0_45_281)'>
        <path
          id='Vector'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.9996 2.6281C24.8756 -6.4959 47.0676 9.4701 15.9996 30.0001C-15.0684 9.4721 7.12357 -6.4959 15.9996 2.6281Z'
          fill='#F3426C'
        />
      </g>
      <defs>
        <clipPath id='clip0_45_281'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
