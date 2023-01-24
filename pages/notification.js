import axios from "@/libs/axios";
import React, { useState } from "react";
import moment from "moment";
import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { getNotifications } from "@/features/notifications/notificationSlice";
import { useRouter } from "next/router";
import AppointmentDetails from "@/components/appointmentDetails";
import { search } from "@/utils/search";

function Notification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [appointment, setAppointment] = useState();
  const [service, setService] = useState();

  const showDetails = async (notification) => {
    if (notification.screen === "Appointment") {
      await axios
        .get(`/api/v2/appointment/getappointment?id=${notification.booking_id}`)
        .then((res) => {
          setAppointment(res?.data?.data);
          setService(search(res?.data?.data?.result, notification.service_id, ["_id"]));
          setShowAppointmentDetails(true);
        });
    }
    if (notification.screen === "Chat") {
      router.push("/chat");
    }
    await axios.get(`/api/v1/notification/view?id=${notification._id}`).then((res) => {
      dispatch(getNotifications({}));
    });
  };

  const shorted = () => {
    let unshorted = [...notifications];
    return unshorted.sort((a, b) => (new Date(a.creationDate) < new Date(b.creationDate) ? 1 : -1));
  };

  return (
    <div className="flex w-full h-0 flex-col flex-grow items-center p-4 lg:p-8">
      <Modal
        maxWidth="max-w-lg"
        isOpen={showAppointmentDetails}
        closeModal={() => setShowAppointmentDetails(false)}
      >
        <AppointmentDetails appointment={appointment} service={service} />
      </Modal>
      <div className="flex flex-col items-center h-0 w-full flex-grow max-w-4xl bg-white rounded-md shadow-md">
        <p className="w-full text-center text-lg font-semibold py-2 mb-3">Notifications</p>
        <div className="w-full border-b max-w-xl mx-8"></div>
        <div className="w-full grow overflow-y-auto scrollboxbody p-4 lg:p-8">
          {shorted(notifications).map((notification, index) => (
            <div
              key={index}
              onClick={() => showDetails(notification)}
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
