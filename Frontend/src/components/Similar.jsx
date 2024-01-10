import React from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y,Zoom,EffectFade ,Parallax ,Autoplay ,Thumbs  } from "swiper/modules";

// import axios from "axios";
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

const Similar = (props) => {
    const {similar}=props;
  const controller = new AbortController();
  const {signal} = controller;


  


  const { id } = useParams();


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

          {similar &&
            similar.map((item,index) => {
        // {topDay.map((item, index) => {
          // console.log("item", item)
          // const imageData = rec1imgs.find((img) => img.id === item.id);
          // console.log("imageData", imageData)
          return (
            <SwiperSlide className=" h-[10rem]   z-[9999] w-[18rem] select-none rounded-md  hover:scale-[1.06]  transition-all ">
              <Link to={`/detail/${item.id}/movie`} key={index}>
              <img  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path || 'cUIqZd6jJCbO94Txt1CkTs7MSeP.jpg' }`} className="  " alt={`Slide `} />
            </Link>
            </SwiperSlide>
          );
        })}
      </Swiper> 

   
    </>
  );
};


export default Similar;