import React from "react";
import { abbreviateNumber } from "js-abbreviation-number";
import { Link } from "react-router-dom";
import VideoLength from "../shared/videoLength";

const ChannelVideoCard = ({ item, avatarUrl }) => {
  const thumbnailUrl = item?.video?.thumbnails?.[3]?.url ?? "";
  const lengthSeconds = item?.video?.lengthSeconds ?? 0;
  const videoTitle = item?.video?.title ?? "";
  const views = abbreviateNumber(item?.video?.stats?.views ?? 0, 2);
  const publishedTime = item?.video?.publishedTimeText ?? "";
  const viewsAndTime = `${views} views • ${publishedTime}`;

  return (
    <Link to={`/video/${item?.video?.videoId}`}>
      <div className="flex flex-col mb-8 md:mb-3 sm:flex-row lg:hover:bg-gray-200 rounded-xl md:p-4 bg-white">
        <div className="relative flex shrink-0 h-48 md:h-28 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={thumbnailUrl} />
          {lengthSeconds > 0 && <VideoLength time={lengthSeconds} />}
        </div>
        <div className="flex flex-col justify-evenly ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
          <div className="text-lg md:text-xl font-semibold line-clamp-2 mb-2">
            {videoTitle}
          </div>
          <div className="flex items-center">
            <div className="flex h-9 w-9 rounded-full overflow-hidden my-2 mr-2">
              <img className="h-full w-full object-cover" src={avatarUrl} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate overflow-hidden">
                {viewsAndTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChannelVideoCard;
