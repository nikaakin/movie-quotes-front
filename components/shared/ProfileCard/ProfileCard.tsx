import { ProfileCardProps } from './type';

export const ProfileCard = ({
  image,
  children,
  username,
}: ProfileCardProps) => {
  return (
    <div className='flex flex-row  items-center gap-5'>
      {image}
      <div className='flex justify-center flex-col break-all '>
        <h3 className='text-xl sm:text-2xl '>{username}</h3>
        {children}
      </div>
    </div>
  );
};
