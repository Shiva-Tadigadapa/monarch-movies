import React, { Suspense } from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { GiShare } from "react-icons/gi";
import { setResults } from "../features/APISlice/ApiSlice";
// import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import db from "../firebase";
import "firebase/firestore";
import firebase from "firebase/compat/app";
// import { SelectAllResults, SelectImages } from "../features/APISlice/ApiSlice";
import { SelectImgLinks } from "../features/APISlice/ApiSlice";
// import { mo } from "../features/APISlice/ApiSlice";
// import { setResults } from "../features/APISlice/ApiSlice";
// import { SelectTopRated } from "../features/APISlice/ApiSlice";
import { GrAdd } from "react-icons/gr";
import { SelectAllResults } from "../features/APISlice/ApiSlice";
import MdetailRec from "./MdetailRec";
import SeasonDetail from "./SeasonDetail";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiPause } from "react-icons/hi";
import { wait } from "@testing-library/user-event/dist/utils";
import SkelitonnNewDetail from "./SkelitonnNewDetail";
import Similar from "./Similar";
import NewSeason from "./NewSeason";

const NewDetail = () => {
  let wids = [];

  const ReadMore = ({ Children }) => {
    const text = apiData.overview;
    // console.log(text)
    // const v1=text && text.slice(0, 150)
    // console.log(v1)
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className=" text-md m-0 p-0  text-gray-200">
        {isReadMore ? text && text.slice(0, 157) : text && text.slice(0, 327)}
        <span
          onClick={toggleReadMore}
          className="read-or-hide text-gray-400 cursor-pointer"
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

  const { id, type } = useParams();
  const dispatch = useDispatch();

  const [watchTrailer, setWatchTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [castData, setCastData] = useState("");
  const [apiData, setApiData] = useState("");
  const [imgData, setImgData] = useState("");
  const [logo, setLogo] = useState("");
  const [watch, setwatchData] = useState("");
  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(false);
  const [rec, setRec] = useState([]);
  const [similar, setSimilar] = useState([]);
  const controller = new AbortController();

  const Changestate = () => {
    watchTrailer ? setWatchTrailer(false) : setWatchTrailer(true);
  };

  let things;
  const handleFir = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        things = db.collection("watchlist2/" + user.uid + "/watchlist");
        const watchlistRef = firebase
          .firestore()
          .collection("watchlist2/" + user.uid + "/watchlist");
        const querySnapshot2 = await watchlistRef.where("id", "==", id);
        const querySnapshot3 = await querySnapshot2
          .get()
          .then((querySnapshot) => {
            console.log(querySnapshot.empty);
            if (querySnapshot.empty) {
              things.add({
                uid: user.uid,
                id: id,
                type: type,
              });
              toast.success(`Added To WatchList ${id}`);
              return;
            } else {
              querySnapshot.forEach((doc) => {
                console.log(doc.data().id);
                if (doc.data().id === id) {
                  toast.info("Already Added To WatchList");
                  return;
                } else {
                  things.add({
                    uid: user.uid,
                    id: id,
                    type: type,
                  });
                  toast.success("Added To WatchList, message ", { id });
                  return;
                }
              });
            }
          });
      }
    });
  };

  const [currentUser, setCurrentUser] = useState(null);
  // const [wids, setWids] = useState([]);

  useEffect(() => {
    async function fetchWids() {
      const watchlistRef = firebase
        .firestore()
        .collection("watchlist2/" + currentUser + "/watchlist");
      console.log(currentUser);
      // if (currentUser && currentUser) {

      const querySnapshot = await watchlistRef.get();
      // console.log(querySnapshot._delegate._snapshot.docChanges[0].doc.data.value.mapValue.fields.id.stringValue);
      querySnapshot._delegate._snapshot.docChanges.forEach((doc) => {
        wids.push([
          doc.doc.data.value.mapValue.fields.id.stringValue,
          doc.doc.data.value.mapValue.fields.type.stringValue,
          doc.doc.data.value.mapValue.fields.uid.stringValue,
        ]);
      });
    }

    fetchWids();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user.multiFactor.user.uid);
    });
    return unsubscribe;
  }, []);

  const sliceData = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      if (i < 4) {
        arr.push(data[i]);
      }
    }
    return arr;
  };

  let logo_img = useSelector(SelectImgLinks);
  let ApiImg = useSelector(SelectAllResults);
  let backImgs, real;

  const getCastDetails = async () => {
    const Castdata = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`
    );
    const CastDetail = await Castdata.json();
    setCastData(CastDetail.cast);
    // console.log(castData);
  };
  useEffect(() => {
    getCastDetails();
    // console.log(CastDetail);
  }, [id]);

  let url, url2, url3;
  const GetMovieDetails = async () => {
    setLoading(true);
    try {
      if (type == "movie") {
        url = `https://api.themoviedb.org/3/movie/${id}?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
        url2 = `https://api.themoviedb.org/3/movie/${id}/images?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
        url3 = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
      } else {
        url = `https://api.themoviedb.org/3/tv/${id}?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
        url2 = `https://api.themoviedb.org/3/tv/${id}/images?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
        url3 = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=c5ad2827c51f36bcbad41dc821d6d7c1`;
      }
      const response = await fetch(url, {
        signal: controller.signal,
      });
      const response2 = await fetch(url2, {
        signal: controller.signal,
      });
      const response3 = await fetch(url3, {
        signal: controller.signal,
      });

      const data = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      console.log(data);
      let v11;
      const v1 = data3.results.map((item) => {
        if (item.type == "Trailer") {
          v11 = item.key;
          setwatchData(v11);
          return item.key;
        }
      });
      // console.log(v11);
      // console.log(data.backdrop_path);
      // console.log(data2);
      setApiData(data);
      setLogo(null);
      setImgData(
        "https://image.tmdb.org/t/p/original" + data2.backdrops[0].file_path
      );
      const timeoutId = setTimeout(() => {
        setLoading(false);
        console.log("Code executed after 1 second");
      }, 1000);
      if (data2.backdrops[1].file_path == null) {
        setImgData(
          "https://image.tmdb.org/t/p/original" + data2.backdrops[0].file_path
        );
      } else {
        setImgData(
          "https://image.tmdb.org/t/p/original" + data2.backdrops[1].file_path
        );
      }
      setLogo("https://image.tmdb.org/t/p/original" + data2.logos[0].file_path);
      // setImgData(data2);
      // console.log(imgData);
      // console.log(data2.backdrops[3].file_path);
      // console.log(data.genres[0].name);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Previous request was aborted");
      } else {
        console.error("Error fetching movie details:", error);

        const timeoutId = setTimeout(() => {
          setLoading(false);
          console.log("Code executed after 1 second");
        }, 1000);
      }
    }

    // return () => {
    //   controller.abort();
    // };
    return () => clearTimeout(timeoutId);
  };
  const GetRecDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=c5ad2827c51f36bcbad41dc821d6d7c1&language=en-US&page=1 `
    );
    const data2 = await response.json();
    console.log(data2)
    //  const idfettch = data2.results.map((item) => item.id);
    //   setrec1Ids(idfettch);
    //   console.log("id",idfettch)

    setRec(data2.results);

    // const data = await response.json();
    // console.log(data);
    // setRec(data.results);
  }
  const GetSimilarDetails = async () => {
    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c5ad2827c51f36bcbad41dc821d6d7c1&language=en-US&page=1 `
      );
    const data2 = await response2.json();
    // console.log(data2)
    //  const idfettch = data2.results.map((item) => item.id);
    //   setrec1Ids(idfettch);
    //   console.log("id",idfettch)

    setSimilar(data2.results);
    }
  useEffect(() => {
    GetMovieDetails();
    GetRecDetails();
    GetSimilarDetails();
  }, [id]);
  if (loading) {
    return <SkelitonnNewDetail />;
  }
  return (
    <>
      {/* <div className=" mt-[5%]  h-[100vh] bg-[#1A1A1A]    flex flex-col items-center justify-center max-w-[1400px] p-4"> */}
      {/* <Suspense fallback={<Loading />}> */}
      <div className="w-[90%]  mt-[7%] ml-[5%] overflow-y-hidden">
      <div className="  w-[100%]   rounded-xl flex z-10  overflow-hidden       shadow-[inset_732px_90px_100px_#171717]   max-w-[1400px] justify-end">
        <div className=" px-10      py-4  flex flex-col   gap-2 ">
          {logo ? (
            <img
              src={logo}
              className="w-[90%] h-[140px] mt-2 rounded-md ml-16"
            />
          ) : (
            <h1 className=" text-3xl w-[90%] h-[100px] mt-7 rounded-md ml-5">
              {apiData.original_title || apiData.name}
            </h1>
          )}
          <div className=" w-[150%] text-xm font-thin mt-1  opacity-80">
            {(apiData && apiData.runtime) || apiData.episode_run_time} min
            &#8226;{" "}
            {apiData &&
              apiData.genres.map((genre) => (
                <span key={genre.id}>{genre.name} | </span>
              ))}
            {apiData &&
              sliceData(apiData.release_date || apiData.first_air_date)}{" "}
            &#8226; {apiData && apiData.original_language} &#8226;{" "}
            {apiData && apiData.vote_average.toFixed(1)}&#8226;{" "}
          </div>
          <div className="w-[90%] text-xm  font-extralight  opacity-75">
            <ReadMore>{apiData.overview}</ReadMore>
          </div>
          <WatchContainer>
            {watchTrailer ? (
              <div
                className=" mt-[30px] pl-[5px] pr-[8px] w-[170px]  rounded-2xl hover:bg-gray-700  backdrop-blur-sm flex items-center  gap-10 h-[50px] cursor-pointer transition-all"
                onClick={Changestate}
              >
                <HiPause
                  className="   transition-all "
                  style={{
                    fontSize: "38px",
                  }}
                />
                <p>Stop</p>
              </div>
            ) : (
              <div
                className="  mt-[30px] pl-[10px] px-10 pr-[10px] hover:bg-gray-900  rounded-md    bg-gray-900/10   flex items-center justify-center h-[50px] cursor-pointer transition-all"
                onClick={Changestate}
              >
                <FaPlay
                  className="   transition-all "
                  style={{
                    fontSize: "28px",
                  }}
                />

                <p
                  style={{
                    fontSize: "17px",

                    marginLeft: "20px",
                  }}
                >
                  Watch Trailer
                </p>
              </div>
            )}

            <ShareContainer>
              <MdAddCircleOutline
                onClick={() => handleFir()}
                className="hover:transform hover:scale-110 hover:animate-pulse"
                style={{
                  fontSize: "40px",
                  marginTop: "33px",
                  marginLeft: "16px",
                }}
              />
              <GiShare
                style={{
                  fontSize: "40px",
                  marginTop: "33px",
                  marginLeft: "16px",
                }}
              />
            </ShareContainer>
          </WatchContainer>
        </div>

        {watchTrailer ? (
          // <iframe width="560" height="315" src={`https://www.youtube.com/embed/?controls=0&autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <iframe
            className="  object-cover  w-[100%] z-[-2]  scale-150"
            src={`https://www.youtube.com/embed/${watch}?controls=0&autoplay=1`}
            title="YouTube video player"
            // frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        ) : (
          <img
            src={imgData && imgData}
            className="    w-[60%]   z-[-2]  "
            alt=""
          />
          // <></>
        )}
        {/* </div> */}
        {/* <MdetailRec /> */}

        {/* <SeasonDetail /> */}

        {/* <CastContainer className="mt-[590px] max-[480px]:mt-[450px]">
          <CastDetail>
            {castData &&
              castData.map((cast) => (
                <CastHolder>
                  <CastImg className="max-[480px]:w-[100px] max-[480px]:h-[100px]">
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" + cast.profile_path
                      }
                      alt=""
                    />
                  </CastImg>
                  <CastName className="flex flex-col items-center justify-center m-0">
                    <p
                      className="max-[480px]:text-[15px]"
                      style={{ fontSize: "18px", letterSpacing: "0.1px" }}
                    >
                      {cast.name}
                    </p>
                    <p
                      className="max-[480px]:text-[10px]"
                      style={{
                        margin: "0",
                        color: "gray",
                        fontSize: "14px",
                        letterSpacing: "1.2px",
                      }}
                    >
                      {cast.character}
                    </p>
                  </CastName>
                </CastHolder>
              ))}
          </CastDetail>
        </CastContainer> */}
      </div>
      {type === "movie" && (
  <>
    <div className="flex mt-[7%] items-center justify-start p-2 gap-5">
      <button
        className={`w-32 h-10 rounded-lg ${
          today
            ? "bg-white/80 text-black text-base"
            : "bg-transparent border border-white/50 text-sm text-white"
        }`}
        onClick={() => {
          setToday(true);
          setWeek(false);
        }}
      >
        Recomend's
      </button>
      <button
        className={`w-32 h-10 rounded-lg ${
          week
            ? "bg-white/80 text-black text-base"
            : "bg-transparent border border-white/50 text-sm text-white"
        }`}
        onClick={() => {
          setWeek(true);
          setToday(false);
        }}
      >
        Similar
      </button>
    </div>
    {today ? <MdetailRec rec={rec} /> : <Similar similar={similar} />}
  </>
)}
{/* {type !== "movie" && <SeasonDetail />} */}
{type !== "movie" && <NewSeason />} 

      </div>

      {/* </Suspense> */}
    </>
  );
};

export default NewDetail;




const MetaData = styled.div`
  // padding: 70px 0 0 50px;
  //responsive: {
  //add{
  //padding: 70px 0 0 8px;
  //}
`;
const TitleName = styled.div`
  font-size: 30.4px;
  // line-height: 3.4;
  margin: 0 0 10px 0;
`;

const MovieDis = styled.div`
  color: gray;
  font-size: 14.5px;
  margin: 0 0 10px 0;
`;

const TitleDis = styled.div`
  color: gray;
  font-size: 13px;
  line-height: 1.6;
  letter-spacing: 0.3px;
  width: 45%;
  // height: 50px;
  text-overflow: elipsis;
  overflow: hidden;
  // text-align: justify;
  // white-space: nowrap;

  // responsive: {
  //   add{
  //     display: none;
  //   }
`;

const WatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  // align-items: center;
`;

const ShareContainer = styled.div`
  margin: 0 0 0 10%;
  display: flex;
`;

const CastContainer = styled.div`
  margin: 38% 0 0 0;
  position: absolute;
  // border: 1px solid black;
  // overflow: hidden;
  top: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CastDetail = styled.div`
  background-color: #00000030;

  width: 90%;
  overflow: auto;
  white-space: nowrap;
  border-radius: 10px;
  padding: 10px 10px 10px 10px;
  // height: 10%;
  display: flex;
  &::-webkit-scrollbar {
    // height: 4px;              /* height of horizontal scrollbar ← You're missing this */
    // width: 4px;               /* width of vertical scrollbar */
    // border: 1px solid #d5d5d5;
    height: 8px;
    width: 10px;
    border-radius: 10px;
    border: 10px solid #1d212f;
  }

  &::-webkit-scrollbar-thumb:horizontal {
    background: #3a3c44;
    border-radius: 6px;
  }
`;

const CastImg = styled.div`
  width: 155px;
  height: 155px;
  opacity: 1;
  z-index: 1;
  border-radius: 50%;
  // background-color: red;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 69%) 0px 0px 5px -10px,
    rgb(0 0 0 / 73%) 0px 15px 25px -36px;
  border: 3px solid gray;
  img {
    opacity: 1;

    width: 100%;
    height: 100%;
    object-fit: cover;
    // border-radius: 10%;
  }
  &:hover {
    transform: scale(1.1);
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    cursor: pointer;
  }
`;

const CastName = styled.div`
  margin: 0 0 0 0;
  // background-color: blue;
  //give margin top 10px to the 1st child of p
  p {
    margin: 10px 0 0 0;
  }
  // &:first-child {
  //   margin-top: 10px;
  // }
`;

const CastHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px 0 0;
  padding: 10px;
  opacity: 1;
`;
