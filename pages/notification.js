import axios from "@/libs/axios";
import React from "react";
import moment from "moment";
import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { getNotifications } from "@/features/notifications/notificationSlice";

function Notification() {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector(
    (state) => state.notifications
  );

  const getDetailNotification = async (id) => {
    await axios.get(`/api/v1/notification/view?id=${id}`).then((res) => {
      dispatch(getNotifications({}));
    });
  };

  if (isLoading) return <Spinner />;
  else
    return (
      <div className="flex w-full h-0 flex-col flex-grow items-center p-4 lg:p-8">
        <Modal isOpen={false} closeModal={() => {}}>
          shdfkldhf
        </Modal>
        <div className="flex flex-col items-center h-0 w-full flex-grow max-w-3xl bg-white rounded-md shadow-md">
          <p className="w-full text-center text-sm font-semibold py-2 mb-3">
            Notifications
          </p>
          <div className="w-full border-b max-w-xl mx-8"></div>
          <div className="w-full grow overflow-y-auto scrollboxbody p-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                onClick={() => getDetailNotification(notification._id)}
                className={` ${
                  notification.open ? "bg-gray-50" : "bg-primary-200"
                } bg-gray-50 truncate p-4 my-1 rounded-md cursor-pointer hover:scale-[1.02] transition duration-300`}
              >
                <p className="whitespace-pre-wrap">{notification?.body}</p>
                <p className="text-xs text-gray-400">
                  {moment(notification?.creationDate).format("MMM Do YY")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Notification;
