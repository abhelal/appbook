import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

axios.interceptors.request.use(
  async function (config) {
    let access_token;
    if (typeof window !== "undefined") {
      access_token = localStorage.getItem("access_token");
    }
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
