import { Header, Button } from '@/components';
import { useLandingPage } from './useLandingPage';
import { imageUrls } from '@/config';

export const LandingPage = () => {
  const {
    changeIndex,
    isBackgroundIntersected,
    isMobile,
    shouldAnimate,
    show,
    backgrounfRef,
    imageRefs,
  } = useLandingPage();
  return (
    <div className='overflow-hidden relative pt-[430px]  sm:pt-[800px] text-white'>
      <div className='absolute z-[100] top-0 left-0 w-full'>
        <Header />
      </div>

      <article
        className='h-screen w-full absolute bg-lg-landing-first top-0 '
        ref={backgrounfRef}
      >
        <div className='top-1/3  left-1/2 -translate-x-1/2 absolute w-72 sm:w-[700px] z-[50] text-center'>
          <h1 className='mb-8 sm:mb-6 text-2xl sm:text-6xl font-bold text-orange-250'>
            Find any quote in millions of movie lines
          </h1>
          <Button
            content='Get started'
            isTransparent={false}
            classes='sm:px-4 sm:py-2 px-2 py-2'
          />
        </div>
        {!isMobile && isBackgroundIntersected && (
          <button
            onClick={changeIndex.bind(null, 0)}
            className='absolute bottom-0 left-0 bg-transparent w-full h-[280px] z-[100]'
          ></button>
        )}
      </article>
      <div className='fixed w-full h-full bg-lg-landing-second z-40 left-0 top-0 '></div>
      {imageUrls.map(({ url, movie, quote }, index) => {
        return (
          <article
            key={url}
            className=' relative w-full h-[430px] sm:h-[1200px] 
              overflow-hidden bg-fixed bg-cover bg-bottom bg-no-repeat flex items-center'
            style={{
              backgroundImage: `url(${url})`,
              backgroundAttachment: show ? 'fixed' : 'scroll',
            }}
            ref={imageRefs[index]}
          >
            <div
              className={`pl-[10vw] z-40 flex flex-row ${
                shouldAnimate ? 'quote-fade' : ''
              }`}
            >
              <span className='border-[1px] border-white h-0 sm:w-14 w-4  mt-4 sm:mr-4 mr-2 '></span>
              <div className='leading-10'>
                <h1 className='text-xl font-bold w-[270px] sm:text-5xl sm:w-1/2 !leading-normal mb-2'>
                  {quote}
                </h1>
                <h3 className='text-zinc-350 font-bold text-base sm:text-3xl'>
                  {movie}
                </h3>
              </div>
            </div>

            {!isMobile && (
              <button
                onClick={changeIndex.bind(null, index + 1)}
                className={`${
                  index === 1 ? 'bg-lg-landing-third' : ''
                } absolute left-0 top-0 bg-transparent w-full h-full z-50`}
              ></button>
            )}
          </article>
        );
      })}
    </div>
  );
};
