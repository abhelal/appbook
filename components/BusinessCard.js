import React, { useEffect, useState } from "react";
import CustomImage from "@/components/CustomImage";
import { getFavouriteBusiness, setBusiness } from "@features/business/businessSlice";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@utils/search";
import axios from "@libs/axios";
import { StarIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";

function BusinessCard({ business }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { favBusiness } = useSelector((state) => state.business);
  const { user } = useSelector((state) => state.auth);
  const [isFavourite, setIsFavourite] = useState(false);
  const [changingFav, setChangingFav] = useState(false);

  const bc = search(categories, business?.businessDetail_id?.business_category, [
    "category_name",
  ])[0];

  useEffect(() => {
    const isFav = search(favBusiness, business?._id, ["_id"])[0] ? true : false;
    setIsFavourite(isFav);
  }, []);

  function showBusiness(business) {
    const url =
      "business?" + "id=" + business?._id + "&name=" + business.business_id?.business_name;
    dispatch(setBusiness(business));
    router.push(url);
  }

  const makeFavourite = async () => {
    setIsFavourite(!isFavourite);
    setChangingFav(true);
    await axios
      .post("/api/v1/business/addfav", {
        business_id: business.business_id._id,
      })
      .then(() => dispatch(getFavouriteBusiness(user._id)));
    setChangingFav(false);
  };

  return (
    <div className="relative w-full bg-white shadow-md rounded-md overflow-hidden">
      <div className="absolute z-20 right-0 top-0 bg-black bg-opacity-30 p-3 rounded-bl-lg">
        <button onClick={() => makeFavourite()} className={changingFav ? "animate-ping" : ""}>
          {isFavourite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          )}
        </button>
      </div>
      <div onClick={() => showBusiness(business)} className="cursor-pointer w-full ">
        <div className="relative rounded-t-lg overflow-hidden h-28 bg-gray-300 border-b w-auto">
          <CustomImage
            src={business?.business_id?.business_avatar}
            alt=""
            width={200}
            height={200}
            loading="eager"
          />
        </div>

        <div className="px-2 py-2">
          <div className="flex justify-between h-16">
            <div className="text-left">
              <div className="font-semibold truncate max-w-xs">
                {business?.business_id?.business_name.trim().slice(0, 30)}
              </div>
              <div className="mb-2 text-xs">
                {business?.business_id?.business_tagline.trim().slice(0, 50)}
              </div>
            </div>

            <div
              style={{
                backgroundColor: bc?.category_color,
              }}
              className={`flex relative h-8 w-8 p-1.5 flex-shrink-0 items-center justify-center rounded-full overflow-hidden`}
            >
              <CustomImage src={bc?.category_image} width={20} height={20} alt="" loading="eager" />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div
              style={{
                backgroundColor: bc?.category_color,
              }}
              className="text-xs text-white rounded-md shadow-sm p-1 px-3"
            >
              {bc?.category_name}
            </div>
            <div className="flex h-6 items-center justify-center rounded-full bg-gray-100 bg-opacity-80 px-3 text-sm font-semibold">
              <StarIcon className="w-5 h-5 text-yellow-400" />

              <span className="px-1">{business?.business_id?.Stars.toString().slice(0, 4)}</span>
            </div>
          </div>
          <div className="flex gap-1 items-center text-sm text-primary-500 text-left py-1.5">
            <MapPinIcon className="w-4 h-4 flex-shrink-0 text-yellow-500" />
            <span className=" whitespace-nowrap truncate">
              {business?.business_id?.city +
                ", " +
                business?.business_id?.postal_code +
                ", " +
                business?.business_id?.country}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessCard;
