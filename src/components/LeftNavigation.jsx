import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavigationMenuItem from "./LeftNavigationMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNavigation = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(Context);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-[#f3f5f8] absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all border-r-2 border-gray-300 ${
        mobileMenu ? "translate-x-0" : ""
      }`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <LeftNavigationMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/");
                }}
                className={`${
                  selectedCategory === item.name ? "bg-gray-200" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-gray-300" />}
            </React.Fragment>
          );
        })}
        <hr className="my-5 border-white/[0.2]" />
      </div>
    </div>
  );
};

export default LeftNavigation;
