import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CustomImage from "@components/CustomImage";
import Calendar from "@components/FilterCalendar";
import { useEffect, useState } from "react";
import axios from "@libs/axios";
import { useSelector } from "react-redux";
import ThreeDotMenu from "@components/ThreeDotMenu";
import Spinner from "@components/Spinner";
import { useRouter } from "next/router";
import moment from "moment";

export default function MyBooking() {
  const router = useRouter();
  const date = moment();
  const [appointmentDate, setAppointmentDate] = useState(date);
  const { user } = useSelector((state) => state.auth);
  const [loadingData, setLoadingData] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showFiltered, setShowFiltered] = useState(false);

  async function getBookings() {
    setLoadingData(true);
    await axios
      .post("/api/v1/appointment/appointments_byuser", {})
      .then((res) => {
        setBookings(res.data.data);
      });
    setLoadingData(false);
  }

  async function reloadBookings() {
    await axios
      .post("/api/v1/appointment/appointments_byuser", {})
      .then((res) => {
        setBookings(res.data.data);
      });
  }

  useEffect(() => {
    if (user) getBookings();
    if (!user) router.push("/login");
  }, [user]);

  const groupedBooking = () => {
    const booking = [...(bookings ?? [])];
    let upcoming = [];
    let past = [];

    const filtered = booking.filter(
      (bk) =>
        new Date(bk.result.date).toDateString() ===
        new Date(appointmentDate).toDateString()
    );

    if (showFiltered) {
      filtered.forEach((bk) => {
        const bookingDay = new Date(bk.result.date);
        const today = new Date(new Date().toDateString());
        if (bookingDay - today >= 0) upcoming.push(bk);
        if (bookingDay - today < 0) past.push(bk);
      });
    } else {
      booking.forEach((bk) => {
        const bookingDay = new Date(bk.result.date);
        const today = new Date(new Date().toDateString());
        if (bookingDay - today >= 0) upcoming.push(bk);
        if (bookingDay - today < 0) past.push(bk);
      });
    }

    const sorted = upcoming.sort((a, b) =>
      new Date(a.result.date) > new Date(b.result.date) ? 1 : -1
    );
    const groupd = { upcoming: sorted, past: past };
    return groupd;
  };

  const statusColor = (ap_status) => {
    switch (ap_status) {
      case "Rejected":
        return "bg-red-500";
      case "Cancelled":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-500";
      case "Completed":
        return "bg-purple-500";
      default:
        return "bg-green-500";
    }
  };

  if (loadingData) return <Spinner />;

  return (
    <div className="flex flex-col grow items-center px-4 py-8">
      <div className="flex flex-col w-full max-w-3xl flex-grow items-center bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between w-full max-w-xl items-center p-3 lg:px-10">
          <Calendar
            initialDate={appointmentDate}
            openCalendar={openCalendar}
            setOpenCalendar={setOpenCalendar}
            setSelectedDate={setAppointmentDate}
            setShowFiltered={setShowFiltered}
          />
          <p></p>
          <div className="tex-lg font-semibold">My Bookings</div>
          <div className="relative">
            <button onClick={() => setOpenCalendar(true)}>
              <CalendarIcon className="w-7 h-7 text-primary-500" />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <p className="border-b w-full mb-3 max-w-xl"></p>
        </div>
        <div className="flex flex-grow h-0 flex-col items-center gap-4 w-full scrollboxbody overflow-y-auto p-4">
          <div className="w-full max-w-xl">
            {showFiltered && (
              <div className="text-lg flex w-full justify-between">
                <div>
                  Booking on{" "}
                  <span className="text-primary-500">
                    {new Date(appointmentDate).toDateString()}
                  </span>
                </div>
                <button
                  onClick={() => setShowFiltered(false)}
                  className="text-primary-500 px-1 py-0.5"
                >
                  <XMarkIcon className="w-6 h-6 text-red-500" />
                </button>
              </div>
            )}
            {groupedBooking()?.upcoming?.length > 0 && (
              <p className="font-medium">Upcoming Booking</p>
            )}
            {groupedBooking()?.upcoming?.map((booking, index) => (
              <div
                key={index}
                className="flex justify-between items-start my-3 lg:my-6"
              >
                <div className="flex">
                  <div className="relative w-28 h-28 bg-gray-100 shrink-0 overflow-hidden border rounded-lg">
                    <CustomImage
                      src={booking.business_name.business_avatar}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3 text-sm">
                    <p className="font-semibold">
                      {booking.business_name.business_name}
                    </p>
                    <p className="text-xs">
                      {booking.result.date}, {booking.result.time}
                    </p>
                    <p>Service</p>
                    <p className="text-xs">{booking.result.service_name}</p>
                    <div className="flex">
                      <p
                        className={`px-2 ${statusColor(
                          booking.result.status
                        )} rounded-full text-white`}
                      >
                        {booking.result.status}
                      </p>
                    </div>
                  </div>
                </div>
                <ThreeDotMenu
                  appoinmentid={booking.result._id}
                  business={booking.business_name}
                  getBookings={reloadBookings}
                />
              </div>
            ))}

            {groupedBooking()?.past?.length > 0 && (
              <p className="font-medium">Previous bookings</p>
            )}

            {groupedBooking()?.past?.map((booking, index) => (
              <div
                key={index}
                className="flex justify-between items-start my-3 lg:my-6"
              >
                <div className="flex">
                  <div className="relative w-28 h-28 bg-gray-100 shrink-0 overflow-hidden border rounded-lg">
                    <CustomImage
                      src={booking.business_name.business_avatar}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3 text-sm">
                    <p className="font-semibold">
                      {booking.business_name.business_name}
                    </p>
                    <p>
                      {booking.result.date}, {booking.result.time}
                    </p>
                    <p className="text-xs">Service</p>
                    <p>{booking.result.service_name}</p>
                    <div className="flex">
                      <p
                        className={`px-2 ${statusColor(
                          booking.result.status
                        )} rounded-full text-white`}
                      >
                        {booking.result.status}
                      </p>
                    </div>
                  </div>
                </div>
                <ThreeDotMenu
                  appoinmentid={booking.result._id}
                  business={booking.business_name}
                  getBookings={reloadBookings}
                />
              </div>
            ))}
          </div>
          {groupedBooking()?.upcoming?.length < 1 &&
            groupedBooking()?.past?.length < 1 && (
              <div className="flex flex-col flex-grow items-center justify-center">
                <p className="text-primary-500 text-2xl font-semibold py-2">
                  Oops!
                </p>
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
