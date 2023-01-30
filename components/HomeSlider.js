import React from "react";
import VideoBackground from "@/components/VideoBackground";
import PlaceSearch from "@/components/LocationSearch";
import SearchBox from "@/components/SearchBox";

function HomeSlider() {
  return (
    <div className="relative flex flex-col w-full items-center">
      <VideoBackground />
      <div className="relative flex flex-col w-full max-w-7xl">
        <div className="lg:absolute lg:bottom-20 lg:right-16 w-full max-w-3xl p-4 mt-4  bg-white lg:bg-transparent shadow-sm">
          <div className="py-4 font-semibold lg:text-white lg:text-4xl">
            Browse hundreds of business in your area
          </div>
          <div className="space-y-3 lg:space-y-0 lg:flex items-center gap-4">
            <PlaceSearch />
            <SearchBox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
