import useBillBoard from '@/hooks/useBillBoard';
import React, { useCallback } from 'react';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from '@/components/PlayButton';
import useInfoModal from '@/hooks/useInfoModal';

const BillBoard = () => {
  const { data } = useBillBoard();
  const movieData = data? data[0] : null;
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(movieData?.id)
  }, [openModal, movieData?.id]);

  // console.log(data);
  return (
    <div className='relative h-[56.25vw]'>
      <video 
        autoPlay
        muted
        loop
        poster={movieData?.thumbnailUrl} 
        src={movieData?.videoUrl}
        className='w-full h-[56.23vw] object-cover brightness-[60%]'
      >
      </video>
      <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl'>
          {movieData?.title}
        </p>
        <p className='text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl'>
          {movieData?.description}
        </p>
        <div className='flex flex-row items-center mt-3 md:mt-4 gap-3'>
          <PlayButton movieId={movieData?.id} />
          <button
            onClick={handleOpenModal}
            className='bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition'
          >
            <AiOutlineInfoCircle size={25} className='mr-1' />
            More info
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillBoard;
