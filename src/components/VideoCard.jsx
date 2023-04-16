import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/videoLength";

const VideoCard = ({ video }) => {
  const videoId = video?.videoId;
  const videoThumbnail = video?.thumbnails[0]?.url;
  const videoInSeconds = video?.lengthSeconds;
  const videoTitle = video?.title;
  const videoChannelId = video?.author?.channelId;
  const channelAvatar = video?.author?.avatar[0]?.url;
  const videoAuthor = video?.author?.title;
  const videoBadge = video?.author?.badges[0]?.type;
  const videoPublishedTime = video?.publishedTimeText;
  const videoViews = video?.stats?.views;

  return (
    <div className="flex flex-col mb-8">
      <Link to={`/video/${videoId}`}>
        <div className="relative md:rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={videoThumbnail} />
          {videoInSeconds && <VideoLength time={videoInSeconds} />}
        </div>
        <div className=" font-bold line-clamp-2 mt-2">{videoTitle}</div>
      </Link>

      <Link to={`/channel/${videoChannelId}`}>
        <div className="flex flex-col text-black cursor-pointer">
          <div className="flex items-center mt-1">
            <div className="flex h-9 w-9 rounded-full overflow-hidden">
              <img className="h-full w-full object-cover" src={channelAvatar} />
            </div>
            <div className="flex flex-col ml-3 overflow-hidden">
              <span className="text-[12px] font-semibold mt-2 text-black/[0.7] flex items-center">
                {videoAuthor}
                {videoBadge === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-[#85c742] text-[12px] ml-1" />
                )}
              </span>
              <div className="flex text-[12px] font-semibold text-black/[0.7] truncate overflow-hidden">
                <span className="truncate">{videoPublishedTime}</span>
                <span className="flex text-[24px] leading-none font-bold text-black/[0.7] relative top-[-10px] mx-1">
                  .
                </span>
                <span>{`${abbreviateNumber(videoViews, 2)} views`}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
