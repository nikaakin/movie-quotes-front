import Link from 'next/link';

export const Sidebar = () => {
  return (
    <div className='flex flex-col basis-1/4 pl-16 pt-4 text-2xl font-normal justify-center'>
      <Link
        href='/news-feed/profile'
        className='py-5 hover:bg-zinc-870 hover:bg-opacity-60'
      >
        Profile
      </Link>
      <Link
        href='/news-feed/home'
        className='py-5 hover:bg-zinc-870 hover:bg-opacity-60'
      >
        news feed
      </Link>
      <Link
        href='/news-feed/movies'
        className='py-5 hover:bg-zinc-870 hover:bg-opacity-60'
      >
        list ofmovies
      </Link>
    </div>
  );
};
