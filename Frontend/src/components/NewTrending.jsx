import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SelectImages } from "../features/APISlice/ApiSlice";
import { SelectCostopDay } from "../features/APISlice/ApiSlice";
import { useState } from "react";
import TopDay from "./TopDay";
import { useEffect } from "react";
import { Navigation, Pagination, Scrollbar,Keyboard, A11y,Zoom,EffectFade ,Parallax ,Autoplay ,Thumbs  } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";




// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/effect-fade';
import "swiper/css/zoom";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import "swiper/css/keyboard";



const NewTrending = (props) => {
  const { trending, topDay, 
    trendingImgsmovie , trendingImgstv ,
    topDayImagesMovie , topDayImagesTV
  } = props;
  
  const mergedTopDayImages = [...topDayImagesMovie, ...topDayImagesTV];
  const mergedTrendingImages = [...trendingImgsmovie, ...trendingImgstv];

  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(false);

  return (
    <>
      <p
        style={{
          margin: "45px 0 0 0",
          fontSize: "28px ",
          letterSpacing: "1.5px",
        }}
      >
        Trending <span style={{ fontWeight: "900" }}>&#8593;</span>
      </p>

        <div  className=" flex  items-center  justify-start p-2 gap-5">
          <button className={` w-32 h-10 rounded-lg    ${today ? "bg-white/80 text-black  text-base" : "  bg-transparent border border-white/50 text-sm text-white"}`}
            onClick={() => {
              setToday(true);
              setWeek(false);
            }}
          >Today</button>
          <button className={` w-32 h-10 rounded-lg  ${week ? "bg-white/80 text-black text-base" : "bg-transparent border border-white/50 text-sm text-white"}`}
            onClick={() => {
              setWeek(true);
              setToday(false);
            }}
          >Week</button>
        </div>

      {today ? (
        <Swiper
        modules={[Navigation,Keyboard, Pagination, Scrollbar, A11y, Zoom,Autoplay ,Thumbs , EffectFade, Parallax]}
        spaceBetween={20}
        slidesPerView={4}
        // centeredSlides={true}
        // slidesPerGroupAuto={}
        // loop={true}
        slidesPerGroup={4}
        slidesPerGroupSkip={0}
        // grabCursor={true}
        // keyboard={{
        //   enabled: true,
        // }}
        navigation = {true}
        Thumbs  = {true}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        className=" mt-10 "
      >
          {/* slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
        }}
        scrollbar={true}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination]}
        className="mySwiper" */}


        {topDay.map((item, index) => {
          console.log("item", item)
          const imageData = mergedTopDayImages.find((img) => img.id === item.id);
          return (
            <SwiperSlide key={index} className=" h-[10rem]   z-[9999] w-[18rem] select-none rounded-md  hover:scale-[1.06]  transition-all ">
              <Link to={`/detail/${item.id}/${item.media_type}`} key={index}>
              <img  src={`https://image.tmdb.org/t/p/original/${imageData?.images.backdrops || item.backdrop_path }`} className="  " alt={`Slide ${index}`} />
            </Link>
            </SwiperSlide>
          );
        })}
      </Swiper> 
      ) : (
        <TopDay trending={trending}  mergedTrendingImages ={mergedTrendingImages}/>
      )}
    </>
  );
};




export default NewTrending;
