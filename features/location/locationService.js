import axios from "@libs/axios";

const getLocation = async ({}) => {
  let address;
  let coordinates;

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
        localStorage.setItem("address", res.data.plus_code.compound_code);
        address = res.data.plus_code.compound_code;
        coordinates = res.data.plus_code.compound_code;
      });
  });
  const location = { address: address, coordinates: coordinates };
  return location;
};

const locationService = {
  getLocation,
};

export default locationService;
