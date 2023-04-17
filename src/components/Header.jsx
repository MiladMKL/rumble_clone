import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddFill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import rumbleLogo from "../assets/rumble-full-logo-v4.svg";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { mobileMenu, setMobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const mobileMenuToggle = () => setMobileMenu(!mobileMenu);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between min-h-[56px] sm:min-h-[70px] px-4 bg-white border-b-2 border-gray-300">
      <div className="flex h-5 items-center">
        <button
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-300 cursor-pointer"
          onClick={mobileMenuToggle}
        >
          {mobileMenu ? (
            <CgClose size={24} className="text-black text-xl" />
          ) : (
            <SlMenu size={24} className="text-black text-xl" />
          )}
        </button>

        <Link to="/" className="flex items-center">
          <img className="h-7 sm:h-9" src={rumbleLogo} alt="Rumble" />
        </Link>
      </div>

      <div className="relative flex items-center">
        <div className="flex h-8 md:h-10 border border-gray-300 rounded-xl active:border-gray-500">
          <input
            type="text"
            className="bg-transparent outline-black px-5 w-40 md:w-64 lg:w-[600px] rounded-xl"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            placeholder="Search"
            value={searchQuery}
          />
        </div>
        <button
          className="absolute inset-y-0 right-0 w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <IoIosSearch className="text-xl" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-300 cursor-pointer text-lime-600">
          <RiVideoAddFill size={25} className="text-xl cursor-pointer" />
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4 hover:bg-gray-300 cursor-pointer">
          <img
            src="https://xsgames.co/randomusers/assets/avatars/male/64.jpg"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
