import React, { useContext } from "react";
import { Context } from "../context/contextApi";
import LeftNavigation from "./LeftNavigation";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { loading, mobileMenu, searchResults } = useContext(Context);

  return (
    <div className="flex flex-row h-[calc(100vh-5rem)]">
      {mobileMenu && <LeftNavigation />}
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-[#f3f5f8] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            searchResults.map((item) => {
              if (item.type !== "video") return false;
              return (
                <VideoCard key={item?.video?.videoId} video={item?.video} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
