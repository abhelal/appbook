import axios from "@libs/axios";

const getNotification = async () => {
  const res = await axios.get("/api/v1/notification/all");
  return res.data;
};

const notificationService = {
  getNotification,
};

export default notificationService;
