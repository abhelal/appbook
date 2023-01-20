import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Search() {
  const [CurrentLocation, setCurrentLocation] = useState();

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(async function (position) {
      await axios
        .post(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        )
        .then((res) => {
          setCurrentLocation(res.data.plus_code.compound_code);
          localStorage.setItem("location", res.data.plus_code.compound_code);
        });
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentLocation(localStorage.getItem("location"));
    }
  }, []);
  return (
    <div className="flex w-full h-12 items-center lg:max-w-xs rounded-md overflow-hidden border border-primary-500 focus-within:border-primary-400 focus-within:outline-none bg-white">
      <button
        onClick={() => getLocation()}
        className="flex items-center justify-center w-10 h-10"
      >
        <MapPinIcon className="w-5 h-5 text-primary-500" />
      </button>
      <div className="group relative ">
        <div className="w-full text-gray-500 border-0 focus:outline-none focus:ring-0 bg-white sm:text-sm">
          {CurrentLocation?.slice(8)}
        </div>
      </div>
    </div>
  );
}
