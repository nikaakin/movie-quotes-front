import { ProfileCardProps } from './type';

export const ProfileCard = ({ image, children }: ProfileCardProps) => {
  return (
    <div className='flex flex-row pl-16 items-center gap-5'>
      {image}
      <div className='flex justify-center flex-col'>
        <h3 className='text-xl sm:text-2xl'>Username</h3>
        {children}
      </div>
    </div>
  );
};
