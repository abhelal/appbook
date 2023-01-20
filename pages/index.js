import React from "react";
import HomeSlider from "@/components/HomeSlider";
import PopularCategory from "@/components/PopularCategory";
import HomeComponents from "@/components/HomeComponents";
import Footer from "@/components/Footer";
import FavouriteBusiness from "@/components/FavouriteBusiness";

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      <HomeSlider />
      <div className="flex flex-col w-full max-w-screen-2xl">
        <PopularCategory />
        <FavouriteBusiness />
        <HomeComponents />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
