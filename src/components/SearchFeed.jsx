import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchFromApi } from "../utils/fetchFromApi";
import { Context } from "../context/contextApi";
import LeftNavigation from "./LeftNavigation";
import SearchFeedVideoCard from "./SearchFeedVideoCard";

const SearchResult = () => {
  const [result, setResult] = useState();
  const { searchQuery } = useParams();
  const { setLoading, mobileMenu } = useContext(Context);

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchFromApi(`search/?q=${searchQuery}`).then((res) => {
      setResult(res?.contents);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-row h-[calc(100vh-5rem)]">
      {mobileMenu && <LeftNavigation />}
      <div className="grow w-[calc(100vw-240px)] h-full overflow-y-auto bg-[#f3f5f8]">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            console.log("SearchFeed", item);
            let video = item.video;
            return (
              <SearchFeedVideoCard
                key={video.videoId + video.lengthSeconds}
                video={video}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
