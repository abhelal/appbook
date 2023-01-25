import React from "react";
import HomeSlider from "@/components/HomeSlider";
import PopularCategory from "@/components/PopularCategory";
import HomeComponents from "@/components/HomeComponents";
import Footer from "@/components/Footer";
import FavouriteBusiness from "@/components/FavouriteBusiness";
import NearBusiness from "@/components/NearBusiness";

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      <HomeSlider />
      <div className="flex flex-col w-full max-w-screen-2xl">
        <PopularCategory />
        <FavouriteBusiness />
        <NearBusiness />
        <HomeComponents />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
