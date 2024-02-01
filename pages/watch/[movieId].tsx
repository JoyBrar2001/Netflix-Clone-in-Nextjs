import React from "react";

import useMovie from '@/hooks/useMovie';
import { useRouter } from "next/router";

import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
       className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70"
      >
        <AiOutlineArrowLeft 
          onClick={() => router.push('/')}
          className="text-white cursor-pointer" size={40} 
        />
        <p className="text-white text-xl lg:text-3xl">
          <span className="font-light">Watching: </span>{data?.title}
        </p>
      </nav>

      <video 
        src={data?.videoUrl}
        autoPlay
        controls
        className="h-full w-full"
      ></video>
    </div>
  );
}

export default Watch;