import { useState, useEffect } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Zoom,
  EffectFade,
  Parallax,
  Autoplay,
  Thumbs,
} from "swiper/modules";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/zoom";
import "swiper/css/parallax";
import "swiper/css/autoplay";
import "swiper/css/thumbs";
import { Link } from "react-router-dom";
const Popular = (props) => {
  const { data, name } = props;
  const [topratedMovieIds, setTopratedMovieIds] = useState([]);
  const [topratedImagesM, setTopratedImagesM] = useState([]);
  // const mergedTopRatedImages = [...topratedImagesM];

  useEffect(() => {
    const fetchData = async () => {
      const stopratedMovieIds = data.map((item) => item.id);
      console.log("stopratedMovieIds", stopratedMovieIds);
      setTopratedMovieIds(stopratedMovieIds);
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          topratedMovieIds.map(async (id) => {
            try {
              const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/images?include_image_language=en&language=en`,
                {
                  headers: {
                    accept: "application/json",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWFkMjgyN2M1MWYzNmJjYmFkNDFkYzgyMWQ2ZDdjMSIsInN1YiI6IjY0MDU5OWEzMTM2NTQ1MDBiYTRmMWFlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HvHrHUvvIGrvBXNsCYChgXpEPDcJzE7vYLzL4ipxnhU",
                  },
                }
              );

              const categorizedImages = {
                backdrops: response.data.backdrops[0]?.file_path,
                logos: response.data.logos[0]?.file_path,
                posters: response.data.posters[0]?.file_path,
              };

              return { id, images: categorizedImages };
            } catch (error) {
              console.error(`Error fetching images for ID ${id}:`, error);
              return { id, images: [] };
            }
          })
        );

        console.log("results", results);
        setTopratedImagesM(results);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    if (topratedMovieIds.length > 0) {
      fetchData();
    }
  }, [topratedMovieIds]);

  return (
    <>
      <p className="  text-3xl  mt-20">{name}</p>

      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Zoom,
          Autoplay,
          Thumbs,
          EffectFade,
          Parallax,
        ]}
        spaceBetween={20}
        slidesPerView={4}
        // centeredSlides={true}
        // slidesPerGroupAuto={}
        // loop={true}
        slidesPerGroup={4}
        slidesPerGroupSkip={0}
        navigation
        Thumbs={true}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {data &&
          data.map((item, index) => {
            console.log("item", item);

            const imageData = topratedImagesM.find((img) => img.id === item.id);
            console.log("imageData", imageData);

            return (
              <SwiperSlide
                key={index}
                className=" h-[10rem]   z-[9999] w-[18rem] select-none rounded-md  hover:scale-[1.06]  transition-all"
              >
                <Link to={`/detail/${item.id}/movie`} key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${
                      imageData?.images?.backdrops || item.backdrop_path
                    }`}
                    className=" "
                    alt={`Slide ${index}`}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default Popular;
