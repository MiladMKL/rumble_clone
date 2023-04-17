import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Context } from "../context/contextApi";
import RecommendedVideoCard from "./RecommendedVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchFromApi(`video/details/?id=${id}`);
        setVideo(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        setLoading(true);
        const res = await fetchFromApi(`video/related-contents/?id=${id}`);
        setRelatedVideos(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const videoTitle = video?.title;
  const channelId = video?.author?.channelId;
  const videoAvatar = video?.author?.avatar[0]?.url;
  const channelTitle = video?.author?.title;
  const channelBadge = video?.author?.badges[0]?.type;
  const channelSubscribers = video?.author?.stats?.subscribersText;
  const videoViews = video?.stats?.views;

  return (
    <div className="flex justify-evenly flex-row h-[calc(100vh-5rem)] bg-[#f3f5f8]">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row mb-4">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          <div className="h-[400px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>
          <div className="text-black font-bold text-sm md:text-xl mt-4 line-clamp-2">
            {videoTitle || "Main Title of the Video"}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <Link to={`/channel/${channelId}`}>
              <div className="flex">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={videoAvatar}
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-3">
                  <div className="text-black text-md font-semibold flex items-center">
                    {channelTitle || "Loading..."}
                    {channelBadge === "VERIFIED_CHANNEL" && (
                      <BsFillCheckCircleFill className="text-[#85c742] text-[12px] ml-1" />
                    )}
                  </div>
                  <div className="text-black/[0.7] text-sm">
                    {channelSubscribers}
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-[#e73348]">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {video?.stats?.likes}
              </div>
              <div className="flex bg-[#85c742] items-center justify-center h-11 px-6 rounded-3xl text-black ml-4">
                {`${abbreviateNumber(videoViews || 0, 2)} Views`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-2 lg:w-[350px] xl:w-[400px] mt-6 bg-white rounded-xl overflow-y-auto">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <RecommendedVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
