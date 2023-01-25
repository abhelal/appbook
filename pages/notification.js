import axios from "@/libs/axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { getNotifications } from "@/features/notifications/notificationSlice";
import { useRouter } from "next/router";
import AppointmentDetails from "@/components/appointmentDetails";

function Notification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications, isLoading } = useSelector((state) => state.notifications);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const showDetails = async (notification) => {
    if (notification.screen === "Appointment") {
      await axios.get(`/api/v1/appointment/${notification.service_id}`).then((res) => {
        setAppointment(res?.data?.data);
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

  if (isLoading && !notifications) return <Spinner />;
  else
    return (
      <div className="flex w-full flex-col flex-grow items-center p-4 lg:p-8">
        <Modal
          maxWidth="max-w-lg"
          isOpen={showAppointmentDetails}
          closeModal={() => setShowAppointmentDetails(false)}
        >
          <AppointmentDetails appointment={appointment} />
        </Modal>

        <div className="flex flex-col items-center flex-grow w-full max-w-4xl bg-white rounded-lg shadow-md">
          <p className="w-full text-center text-lg font-semibold py-2 mb-3">Notifications</p>
          <div className="w-full border-b max-w-xl mx-8"></div>
          <div className="flex flex-col h-0 flex-grow w-full overflow-y-auto scrollboxbody p-4 lg:p-8">
            <div>
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

            {!notifications && (
              <div className="flex flex-col flex-grow items-center justify-center">
                <p className="text-primary-500 text-2xl font-semibold py-2">Oops!</p>
                <p className="font-medium">
                  No Appointment Available. Search business and make appointment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default Notification;
