import { MapPinIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { setLocation } from "@/features/location/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePlacesWidget } from "react-google-autocomplete";

export default function LocationSearch() {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.location);

  async function getLocation() {
    navigator.geolocation.getCurrentPosition(async function (position) {
      await axios
        .post(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`
        )
        .then((res) => {
          localStorage.setItem(
            "coordinates",
            JSON.stringify(res.data.results[0].geometry.location, null, 2)
          );
          localStorage.setItem(
            "address",
            res.data.results[0].formatted_address?.slice(10)
          );
          let location = {
            coordinates: res.data.results[0].geometry.location,
            address: res.data.results[0].formatted_address?.slice(10),
          };
          dispatch(setLocation(location));
        });
    });
  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    options: {
      types: ["address"],
      fields: ["formatted_address", "geometry"],
    },
    onPlaceSelected: (place) => {
      console.log(place);
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();

      localStorage.setItem(
        "coordinates",
        JSON.stringify({ lat: lat, lng: lng })
      );
      localStorage.setItem("address", place.formatted_address);

      let location = {
        coordinates: { lat: lat, lng: lng },
        address: place.formatted_address,
      };
      console.log(place.formatted_address);
      dispatch(setLocation(location));
    },
  });

  return (
    <div className="flex w-full h-12 items-center lg:max-w-xs rounded-md overflow-hidden border border-primary-500 focus-within:border-primary-400 focus-within:outline-none bg-white px-2">
      <button
        onClick={() => getLocation()}
        className="flex items-center justify-center w-10 h-10"
      >
        <MapPinIcon className="w-5 h-5 text-primary-500" />
      </button>
      <div className="group relative w-full pr-2">
        <input
          ref={ref}
          className="w-full focus:outline-none truncate"
          placeholder={address}
        />
      </div>
    </div>
  );
}
