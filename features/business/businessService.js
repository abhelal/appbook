import axios from "@libs/axios";

// get FavouriteBusiness

const getFavouriteBusiness = async (userId) => {
  const res = await axios.get(`/business/getfav/?id=${userId}`);
  return res.data;
};

const businessService = {
  getFavouriteBusiness,
};

export default businessService;
