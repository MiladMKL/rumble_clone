import React from "react";
import { Link } from "react-router-dom";
import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/videoLength";

const SearchFeedVideoCard = ({ video }) => {
  const videoId = video?.videoId;
  const videoThumbnail = video?.thumbnails[0]?.url;
  const videoLengthInSeconds = video?.lengthSeconds;
  const videoTitle = video?.title;
  const videoDescription = video?.descriptionSnippet;
  const videoAvatar = video?.author?.avatar[0]?.url;
  const videoAuthor = video?.author?.title;
  const channelBadge = video?.author?.badges[0]?.type;
  const videoViews = video?.stats?.views;
  const videoPublishedTime = video?.publishedTimeText;

  return (
    <Link to={`/video/${videoId}`}>
      <div className="flex flex-col md:flex-row mb-8 md:mb-3 lg:hover:bg-gray-200 rounded-xl p-4 bg-white">
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={videoThumbnail} />
          {videoLengthInSeconds && <VideoLength time={videoLengthInSeconds} />}
        </div>
        <div className="flex flex-col justify-evenly ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-black">
            {videoTitle}
          </span>
          <div className="flex text-sm font-semibold text-black/[0.7] truncate overflow-hidden">
            <span>{`${abbreviateNumber(videoViews, 2)} views`}</span>
            <span className="flex text-[24px] leading-none font-bold text-black/[0.7] relative top-[-10px] mx-1">
              .
            </span>
            <span className="truncate">{videoPublishedTime}</span>
          </div>
          <span className="text-sm line-clamp-1 md:line-clamp-2 text-black/[0.7] md:pr-24 md:my-4">
            {videoDescription}
          </span>

          <div className="hidden md:flex items-center ">
            <div className="flex items-start mr-3">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img className="h-full w-full object-cover" src={videoAvatar} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold mt-2 text-black/[0.7] flex items-center">
                {videoAuthor}
                {channelBadge === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-lime-500 text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchFeedVideoCard;
