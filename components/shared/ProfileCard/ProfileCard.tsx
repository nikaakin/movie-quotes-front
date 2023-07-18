import { ProfileCardProps } from './type';

export const ProfileCard = ({
  image,
  children,
  username,
}: ProfileCardProps) => {
  return (
    <div className='flex flex-row  items-center gap-5'>
      {image}
      <div className='flex justify-center flex-col '>
        <h3 className='text-xl sm:text-2xl max-w-32 sm:max-w-68 overflow-hidden text-ellipsis whitespace-nowrap '>
          {username}
        </h3>
        {children}
      </div>
    </div>
  );
};
