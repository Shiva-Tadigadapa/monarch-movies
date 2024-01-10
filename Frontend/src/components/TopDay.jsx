import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SelectImages } from "../features/APISlice/ApiSlice";
import { SelectCostopDay } from "../features/APISlice/ApiSlice";
import { useState } from "react";
// import TopDay from "./TopDay";
import { useEffect } from "react";
import { Navigation, Pagination, Scrollbar, A11y,Zoom,EffectFade ,Parallax ,Autoplay ,Thumbs  } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/effect-fade';
import "swiper/css/zoom";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/thumbs";

const TopDay = (props) => {
  const {trending, mergedTrendingImages} = props;
  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(false);




  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Zoom,Autoplay ,Thumbs , EffectFade, Parallax]}
        spaceBetween={20}
        slidesPerView={4}
        // centeredSlides={true}
        // slidesPerGroupAuto={}
        // loop={true}
        slidesPerGroup={4}
        slidesPerGroupSkip={0}

        navigation
        Thumbs  = {true}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
      {trending.map((item, index) => {
          const imageData = mergedTrendingImages.find((img) => img.id === item.id);
          return (
            <SwiperSlide key={index} className=" mt-10 h-[10rem] w-[18rem] select-none rounded-md overflow-hidden  z-[2]">
              <img src={`https://image.tmdb.org/t/p/original/${imageData?.images.backdrops || item.backdrop_path}`} className=" " alt={`Slide ${index}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>

    
  
      
    </>
  );
};


export default TopDay;
