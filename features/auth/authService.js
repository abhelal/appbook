import axios from "@libs/axios";

const check_user = async (values) => {
  const response = await axios.post("/api/v1/user/check_user", values);
  if (response.data.ststus === 1) {
    localStorage.setItem("checked_user", JSON.stringify(values));
  }
  return response.data;
};

const cancell_reg = () => {
  localStorage.removeItem("checked_user");
};

// Register user
const register = async (values) => {
  const response = await axios.post("/api/v1/user/register", values);
  if (response.data.status === 1) {
    localStorage.setItem("access_token", response.data.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

// Login user
const login = async (values) => {
  const response = await axios.post("/api/v1/user/login", values);
  if (response.data.status === 1) {
    localStorage.setItem("access_token", response.data.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

// Logout user

const logout = async (values) => {
  const response = await axios.post("/api/v1/user/logout", values);
  return response.data;
};

// Forgot Password
const forgetPassword = async (values) => {
  const response = await axios.post("/user/forgetPassword", values);
  return response.data;
};

// change User Password
const changeUserPassword = async (values) => {
  const response = await axios.post("/user/changeUserPassword", values);
  return response.data;
};

// update user Profile
const updateProfile = async (values) => {
  const response = await axios.post(`/api/v1/user/updateProfile/?id=${values.get("id")}`, values);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  forgetPassword,
  changeUserPassword,
  updateProfile,
  check_user,
  cancell_reg,
};

export default authService;
