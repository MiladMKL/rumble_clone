import React from "react";

import { AiOutlineFlag } from "react-icons/ai";
import { MdLiveTv } from "react-icons/md";
import { FiFilm } from "react-icons/fi";
import { IoGameControllerSharp } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { GiDiamondTrophy } from "react-icons/gi";
import { RiFeedbackLine } from "react-icons/ri";
import {
  FiSettings,
  FiHelpCircle,
  FiHome,
  FiTrendingUp,
  FiMusic,
} from "react-icons/fi";

export const categories = [
  { name: "New", icon: <FiHome />, type: "home" },
  { name: "Trending", icon: <FiTrendingUp />, type: "category" },
  { name: "Music", icon: <FiMusic />, type: "category" },
  { name: "Films", icon: <FiFilm />, type: "category" },
  { name: "Live", icon: <MdLiveTv />, type: "category" },
  { name: "Gaming", icon: <IoGameControllerSharp />, type: "category" },
  { name: "News", icon: <ImNewspaper />, type: "category" },
  {
    name: "Sports",
    icon: <GiDiamondTrophy />,
    type: "category",
    divider: true,
  },
  { name: "Settings", icon: <FiSettings />, type: "menu" },
  { name: "Report History", icon: <AiOutlineFlag />, type: "menu" },
  { name: "Help", icon: <FiHelpCircle />, type: "menu" },
  { name: "Send feedback", icon: <RiFeedbackLine />, type: "menu" },
];
