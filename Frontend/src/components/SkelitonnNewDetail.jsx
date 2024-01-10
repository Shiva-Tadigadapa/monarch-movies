import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";

const SkelitonnNewDetail = () => {
  return (
    <>
      <div className="mt-20   flex  gap-20 items-center justify-center    ">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="flex  flex-col   gap-5 mt-10">
            <Skeleton width={250} height={40} className=" " />
            <Skeleton className="w-[25rem] " />
            <div className=" flex flex-col ">
              <Skeleton className="w-[35rem] h-3 " />
              <Skeleton className="w-[35rem] h-3 " />
              <Skeleton className="w-[25rem] h-3 " />
              <Skeleton className="w-[15rem] h-3 " />
              <Skeleton className="w-[10rem] h-3 " />
            </div>
            <div className="flex gap-10 mt-10">
              <Skeleton className="w-[10rem] h-12" />
              <Skeleton className="w-[3rem] h-12" />
              <Skeleton className="w-[3rem] h-12" />
            </div>
          </div>
        </SkeletonTheme>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div>
            <Skeleton className="w-[35rem] h-[25rem]  " />
          </div>
        </SkeletonTheme>
      </div>
      <div className="mt-24 flex items-center justify-center">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className=" flex gap-20">
            <Skeleton className="w-[15rem] h-[5rem] " />
            <Skeleton className="w-[15rem] h-[5rem] " />
            <Skeleton className="w-[15rem] h-[5rem] " />
            <Skeleton className="w-[15rem] h-[5rem] " />
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
};

export default SkelitonnNewDetail;
