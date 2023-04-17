import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchFromApi } from "../utils/fetchFromApi";
import { Context } from "../context/contextApi";
import ChannelVideoCard from "./ChannelVideoCard";

const ChannelDetails = () => {
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  const [channelDetails, setChannelDetails] = useState();
  const [channelVideos, setChannelVideos] = useState([]);

  useEffect(() => {
    fetchChannelDetails();
    fetchRelatedChannelVideos();
  }, [id]);

  const fetchChannelDetails = async () => {
    setLoading(true);
    const res = await fetchFromApi(`channel/details/?id=${id}`);
    setChannelDetails(res);
    setLoading(false);
  };

  const fetchRelatedChannelVideos = async () => {
    setLoading(true);
    const { contents } = await fetchFromApi(`channel/videos/?id=${id}`);
    setChannelVideos(contents || []);
    setLoading(false);
  };

  const bannerUrl = channelDetails?.banner?.desktop[5]?.url;
  const subscribersText = channelDetails?.stats?.subscribersText;
  const avatarUrl = channelDetails?.avatar[2]?.url;
  const channelTitle = channelDetails?.title;

  return (
    <div className="flex flex-col h-[calc((h-full)-56px)] bg-[#f3f5f8]">
      <div>
        <img src={bannerUrl} alt="banner" />
      </div>
      <div className="flex justify-between items-center border-2 px-6 mb-2">
        <div className="flex">
          <div>
            <img
              src={avatarUrl}
              alt="avatar"
              className="rounded-full h-auto w-32 -mt-8 border-8 border-white"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm md:text-2xl font-bold">{channelTitle}</h2>
            <p className="text-sm font-bold">{subscribersText}</p>
          </div>
        </div>
        <div>
          <button className="bg-[#85c742] text-black px-3 py-1 md:px-6 md:py-2 text-sm md:text-lg mr-2 rounded-full">
            {subscribersText}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 p-5">
        {channelVideos.map((item, index) => (
          <ChannelVideoCard
            key={index}
            item={item}
            avatarUrl={avatarUrl}
            videoLengthInSeconds={item?.video?.lengthSeconds}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelDetails;
