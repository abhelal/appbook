import Head from "next/head";
import {
  ChatBubbleLeftEllipsisIcon,
  InformationCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

import Services from "@components/Services";
import Description from "@components/Description";
import Faqs from "@components/Faqs";
import Reviews from "@components/Reviews";
import BusinessCoverSlider from "@components/BusinessCoverSlider";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@libs/axios";
import Cart from "@components/Cart";
import CustomImage from "@components/CustomImage";
import { getDistanceFromLatLonInKm } from "@utils/getDistance";
import { search } from "@utils/search";
import { getFavouriteBusiness } from "@features/business/businessSlice";
import Spinner from "@/components/Spinner";

export default function Business() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);
  const { favBusiness } = useSelector((state) => state.business);
  const cart = useSelector((state) => state.cart);

  const [isFavourite, setIsFavourite] = useState(false);
  const [changingFav, setChangingFav] = useState(false);
  const [reviews, setReviews] = useState();
  const [lat1, setLat1] = useState();
  const [lon1, setLon1] = useState();
  const [day, setDay] = useState();
  const [cartItem, setCartItem] = useState(0);
  const [showMobileCart, setShowMobileCart] = useState(false);

  useEffect(() => {
    if (business?.length < 1) router.push("/");
    const day = new Date();
    setDay(day.getDay());
    async function getReviews() {
      await axios
        .get(`/api/v1/review/getreview?business_id=${business.business_id._id}`)
        .then((res) => setReviews(res.data.data));
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLat1(position.coords.latitude);
        setLon1(position.coords.longitude);
      });
    }
    if (business.business_id?._id) getReviews();
  }, []);

  useEffect(() => {
    if (!business) return router.push("/");
    const isFav = search(favBusiness, business?._id, ["_id"])[0] ? true : false;
    setIsFavourite(isFav);
  }, []);

  useEffect(() => {
    const itemInCart = cart.filter(
      (i) => i.business_id === business?.business_id?._id
    )[0];
    if (itemInCart?.service?.length > 0) {
      setCartItem(itemInCart.service.length);
    } else {
      setCartItem(0);
      setShowMobileCart(false);
    }
  }, [cart]);

  const getTotalPrice = () => {
    const businesIndex = cart.findIndex(
      (bzns) => bzns?.business_id === business?.business_id._id
    );
    return cart[businesIndex]?.service.reduce(
      (accumulator, service) => accumulator + +service.service_charges,
      0
    );
  };

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

  function sendMessage() {
    router.push(
      `/chat/message/?o=${business.usr_id}&s=${user._id}&b=${business.business_id._id}&on=${business.business_id.business_name}`
    );
  }

  const timings = (business) => {
    const week = [
      {
        id: 1,
        code: "MO",
        day: "Monday",
        active: business?.timings_id?.monday?.mon_active,
        from: business?.timings_id?.monday?.mon_from,
        to: business?.timings_id?.monday?.mon_to,
      },
      {
        id: 2,
        code: "TU",
        day: "Tuesday",
        active: business?.timings_id?.tuesday?.tues_active,
        from: business?.timings_id?.tuesday?.tues_from,
        to: business?.timings_id?.tuesday?.tues_to,
      },
      {
        id: 3,
        code: "WE",
        day: "Wednesday",
        active: business?.timings_id?.wednesday?.wed_active,
        from: business?.timings_id?.wednesday?.wed_from,
        to: business?.timings_id?.wednesday?.wed_to,
      },
      {
        id: 4,
        code: "TH",
        day: "Thursday",
        active: business?.timings_id?.thursday?.thurs_active,
        from: business?.timings_id?.thursday?.thurs_from,
        to: business?.timings_id?.thursday?.thurs_to,
      },
      {
        id: 5,
        code: "FR",
        day: "Friday",
        active: business?.timings_id?.friday?.fri_active,
        from: business?.timings_id?.friday?.fri_from,
        to: business?.timings_id?.friday?.fri_to,
      },
      {
        id: 6,
        code: "SA",
        day: "Saturday",
        active: business?.timings_id?.saturday?.sat_active,
        from: business?.timings_id?.saturday?.sat_from,
        to: business?.timings_id?.saturday?.sat_to,
      },
      {
        id: 0,
        code: "SU",
        day: "Sunday",
        active: business?.timings_id?.sunday?.sun_active,
        from: business?.timings_id?.sunday?.sun_from,
        to: business?.timings_id?.sunday?.sun_to,
      },
    ];

    const currentDay = week.filter((w) => w.id === day)[0];

    return (
      <div className="mt-3">
        <div className="flex gap-0.5">
          {week.map((d, i) => (
            <button
              key={i}
              onClick={() => setDay(d.id)}
              className={`rounded p-1 w-7 text-xs text-white hover:scale-105 ${
                d.active ? "bg-primary-400" : "bg-gray-300"
              }`}
            >
              {d.code}
            </button>
          ))}
        </div>
        <div className="flex gap-2 text-gray-500">
          <span>{currentDay?.day}</span>
          {currentDay?.active ? (
            <span className="text-gray-500">
              {currentDay?.from} - {currentDay?.to}
            </span>
          ) : (
            <p>closed</p>
          )}
        </div>
      </div>
    );
  };

  if (business.length < 1) {
    return <Spinner />;
  } else
    return (
      <>
        <Head>
          <title> {business?.business_id?.business_name}</title>
        </Head>
        <div className="relative grid grid-cols-12 h-0 grow w-full">
          <div
            className={`flex flex-col flex-grow w-full col-span-12 ${
              cartItem > 0 ? "lg:col-span-9" : ""
            } overflow-y-auto hidescrollbar`}
          >
            <div className="bg-white shadow">
              <div className="relative rounded-b-md overflow-hidden h-72 shadow-md block">
                {business && (
                  <BusinessCoverSlider
                    photos={business?.businessDetail_id?.business_photos}
                  />
                )}
              </div>
              <div className="flex flex-col md:flex-row-reverse justify-between py-2 px-4 md:px-8">
                <div className="flex justify-end gap-4 h-10 divide-x-2 text-gray-600">
                  <button
                    onClick={() => makeFavourite()}
                    disabled={changingFav}
                  >
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
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    )}
                  </button>

                  <button
                    className="flex justify-end items-center w-11"
                    onClick={() => sendMessage()}
                  >
                    <ChatBubbleLeftEllipsisIcon className="w-7 h-7" />
                  </button>
                  <div className="relative group">
                    <InformationCircleIcon className="w-10 h-10 p-1.5 mx-2 " />
                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition ease-in-out duration-500">
                      <div className="absolute bottom-10 right-6 w-28 h-12 flex flex-col items-center justify-center p-3 px-3 bg-white border rounded-md shadow-md text-sm leading-tight">
                        <p className=" text-primary-500">
                          {getDistanceFromLatLonInKm(
                            lat1,
                            lon1,
                            business?.business_id?.latitude,
                            business?.business_id?.longitude
                          )}
                        </p>
                        <p>Away</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full text-gray-700">
                  <div className="flex gap-2 items-center">
                    <div
                      className={`relative flex h-12 w-12 border flex-shrink-0 items-center justify-center rounded-full overflow-hidden`}
                    >
                      <CustomImage
                        src={business?.business_id?.business_avatar}
                        alt=""
                        width={200}
                        height={200}
                        loading="eager"
                      />
                    </div>
                    <div className="">
                      <p className="text-2xl font-semibold">
                        {business?.business_id?.business_name}
                      </p>
                      <p className="text-xs lg:text-lg">
                        {business?.business_id?.business_tagline.slice(0, 56)}
                      </p>
                    </div>
                  </div>

                  <div>{timings(business)}</div>
                  <div className="flex flex-nowrap items-center text-xs py-0.5">
                    <MapPinIcon className="w-4 h-4 text-red-400" />
                    {business?.business_id?.city ? (
                      <span className="px-1">
                        {business?.business_id?.city}
                        {", "}
                        {business?.business_id?.postal_code}
                        {", "}
                        {business?.business_id?.country}
                      </span>
                    ) : (
                      <p>Business has no fixed location, Fully Mobile</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <Services
              services={business?.services}
              employees={business?.business_id?.business_employees}
            />
            <Description
              business_id={business?.business_id}
              businessDetail_id={business?.businessDetail_id}
            />
            <Faqs businessFaq_id={business?.businessFaq_id} />

            <Reviews reviews={reviews} />

            {cartItem > 0 && (
              <div className="absolute lg:hidden w-full flex bottom-16 justify-center">
                <button
                  onClick={() => setShowMobileCart(true)}
                  className="bg-primary-400 h-12 px-2 rounded-full text-white flex items-center gap-3 shadow-md"
                >
                  <div className="h-8 w-8 shrink-0 rounded-full bg-primary-500 flex items-center justify-center font-semibold">
                    {cartItem}
                  </div>
                  <p>View Booking</p>
                  <p className="font-semibold">
                    {`£ `}
                    {getTotalPrice()}
                  </p>
                </button>
              </div>
            )}
          </div>

          {showMobileCart && (
            <div className="absolute lg:hidden w-full h-full bg-white pb-12">
              <Cart setShowMobileCart={setShowMobileCart} />
            </div>
          )}

          {cartItem > 0 && (
            <div className="hidden lg:block col-span-3 bg-white shadow-md border">
              <Cart setShowMobileCart={setShowMobileCart} />
            </div>
          )}
        </div>
      </>
    );
}
