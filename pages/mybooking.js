import { CalendarIcon } from "@heroicons/react/24/outline";
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
  const today = moment();
  const [date, setDate] = useState(today);
  const [loadingData, setLoadingData] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [shortedAppointment, setShorteAppointment] = useState([]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  async function getBookings() {
    setLoadingData(true);
    if (!user) {
      router.push("/login");
    } else
      await axios.post("/api/v1/appointment/appointments_byuser", {}).then((res) => {
        setBookings(res.data.data);
        setShorteAppointment(res.data.data);
      });
    setLoadingData(false);
  }

  useEffect(() => {
    if (user) getBookings();
  }, [user]);

  function submitDate() {
    let appointments = [];
    bookings.forEach((booking) => {
      const d1 = JSON.stringify(new Date(booking.result.date)).slice(3, 11);
      const d2 = JSON.stringify(new Date(date)).slice(3, 11);
      if (d1 == d2) {
        appointments.push(booking);
      }
    });
    setShorteAppointment(appointments);
    console.log(shortedAppointment);
    setOpenCalendar(false);
  }

  if (loadingData) return <Spinner />;

  return (
    <div className="flex flex-col grow items-center">
      <div className="flex justify-between w-full max-w-3xl items-center p-3">
        <button
          onClick={() => setShorteAppointment(bookings)}
          className="text-primary-500 border px-1 py-0.5 rounded"
        >
          All
        </button>
        <Calendar
          initialDate={date}
          openCalendar={openCalendar}
          setSelectedDate={(day) => setDate(day)}
          setOpenCalendar={submitDate}
        />
        <div className="tex-lg font-semibold">My Bookings</div>
        <button onClick={() => setOpenCalendar(true)}>
          <CalendarIcon className="w-5 h-5 text-primary-500" />
        </button>
      </div>
      <p className="border-b w-full my-3 max-w-4xl"></p>
      <div className="flex flex-grow h-0 flex-col gap-4 w-full max-w-3xl scrollboxbody overflow-y-auto p-4">
        <p className="font-medium">Upcoming Booking</p>
        {shortedAppointment.map((booking, index) => {
          const bookingDate = new Date(booking.result.date);
          const today = new Date();
          if (bookingDate < today) {
            return null;
          } else
            return (
              <div key={index} className="flex justify-between items-start">
                <div className="flex">
                  <div className="relative w-24 h-24 bg-gray-100 shrink-0 overflow-hidden border rounded-lg">
                    <CustomImage
                      src={booking.business_name.business_avatar}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3 text-sm">
                    <p className="font-semibold">{booking.business_name.business_name}</p>
                    <p>
                      {booking.result.date}, {booking.result.time}
                    </p>
                    <p className="text-xs">Service</p>
                    <p>{booking.result.service_name}</p>
                    <p>{booking.result.status}</p>
                  </div>
                </div>
                <ThreeDotMenu
                  appoinmentid={booking.result._id}
                  business={booking.business_name}
                  getBookings={getBookings}
                />
              </div>
            );
        })}
        <p className="font-medium">Past Booking</p>
        {shortedAppointment?.map((booking, index) => {
          const bookingDate = new Date(booking.result.date);
          const today = new Date();
          if (bookingDate > today) {
            return null;
          } else
            return (
              <div key={index} className="flex justify-between items-start">
                <div className="flex">
                  <div className="relative w-24 h-24 bg-gray-100 shrink-0 overflow-hidden border rounded-lg">
                    <CustomImage
                      src={booking.business_name.business_avatar}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3 text-sm">
                    <p className="font-semibold">{booking.business_name.business_name}</p>
                    <p>
                      {booking.result.date}, {booking.result.time} AM
                    </p>
                    <p className="text-xs">Services</p>
                    <p>{booking.result.service_name}</p>
                    <p>{booking.result.status}</p>
                  </div>
                </div>
                <ThreeDotMenu
                  appoinmentid={booking.result._id}
                  business={booking.business_name}
                  getBookings={getBookings}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
