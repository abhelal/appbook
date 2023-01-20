import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import CustomImage from "./CustomImage";
import Calendar from "@components/Calendar";
import BookingConfirmation from "@components/BookingConfirmation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAppointmentDate } from "@features/appointment/appointmentSlice";
import { addToCart, reset } from "@features/cart/cartSlice";
import axios from "@libs/axios";
import moment from "moment";

export default function AddAppointment({
  service,
  openAppointment,
  setOpenAppointment,
}) {
  const { initialDate, appointmentDate } = useSelector(
    (state) => state.appointment
  );
  const dispatch = useDispatch();
  const date = moment().format("ll");
  const day = moment().format("dddd").toString().toLowerCase();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [availableSlot, setAvailableSlot] = useState();
  const [comment, setComment] = useState("");
  const [servicePerson, setServicePerson] = useState("Anyone");
  const [time, setTime] = useState();
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [response, setResponse] = useState();
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  function closeAppointment() {
    setOpenAppointment(false);
    setOpenCalendar(false);
    setComment();
    setServicePerson("Anyone");
    setTime();
    setPaymentMode();
    setAvailableSlot();
  }

  function setSelectedDate(day) {
    dispatch(setAppointmentDate({ day }));
  }

  async function bookService() {
    let serv = {
      business_id: service.business_id,
      service: [
        {
          status: "Pending",
          _id: "",
          date: appointmentDate.format("DD MMM YYYY"),
          service_charges: service.services_charges,
          service_id: service._id,
          service_name: service.service_name,
          service_person_name: servicePerson,
          time: time,
        },
      ],
      comment: comment,
    };

    const res = await axios.post("/appointment/addAppointment", serv);

    if (res.data.status === 1) {
      setResponse({ ...res.data.appointment });
      dispatch(reset());
      setShowBookingConfirmation(true);
    }
    closeAppointment();
  }

  async function add() {
    let serv = {
      business_id: service.business_id,
      service: [
        {
          date: appointmentDate.format("DD MMM YYYY"),
          service_charges: service.services_charges,
          service_id: service._id,
          service_name: service.service_name,
          service_person_name: servicePerson,
          time: time,
        },
      ],
    };

    dispatch(addToCart(serv));
    closeAppointment();
    return;
  }

  useEffect(() => {
    async function getAvailableSlot() {
      const response = await axios.post("/business/available_slots", {
        date: date,
        service_id: service._id,
        day: "monday",
      });
      const slots = await response?.data?.data;
      if (slots) {
        setAvailableSlot(slots);
        setTime(slots[0]);
      }
    }
    if (service) {
      getAvailableSlot();
    }
  }, [service, appointmentDate]);

  return (
    <>
      <BookingConfirmation
        response={response}
        showBookingConfirmation={showBookingConfirmation}
        setShowBookingConfirmation={setShowBookingConfirmation}
      />
      <Transition appear show={openAppointment} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto bg-gray-400 bg-opacity-70 px-4"
          onClose={() => closeAppointment()}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-primary-500 px-4 pt-6"
                >
                  Book Appointments
                </Dialog.Title>
                <div className="mt-2 px-4 pb-10 text-xs text-gray-500">
                  <div className="">
                    <p className="font-semibold">{service?.service_name}</p>
                    <p>
                      {service?.service_description
                        ? service?.service_description
                        : "No Description"}
                    </p>
                    <p>Service duration : {service?.service_duration} Min</p>
                  </div>
                  <div className="pt-3 py-2">
                    <p>Select Person</p>

                    <div className="flex flex-wrap items-center py-3 gap-3">
                      <button
                        onClick={() => setServicePerson("Anyone")}
                        className="flex flex-col items-center"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 overflow-hidden">
                          <UserIcon className="w-5 h-5" />
                        </div>
                        <p
                          className={`${
                            servicePerson === "Anyone" && "text-primary-500"
                          }`}
                        >
                          Anyone
                        </p>
                      </button>
                      {service?.business_employees.map((employee, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setServicePerson(employee?.employee_name)
                          }
                          className="flex flex-col items-center"
                        >
                          <div className="flex relative items-center justify-center w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                            <CustomImage
                              alt=""
                              src={employee?.employee_image}
                              layout="fill"
                            />
                          </div>
                          <p
                            className={`${
                              servicePerson === employee?.employee_name &&
                              "text-primary-500"
                            }`}
                          >
                            {employee?.employee_name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="py-2">
                    <p>Select Day & Date</p>
                    <div className="flex w-full p-1 border-b pt-1.5 justify-center">
                      <Calendar
                        initialDate={initialDate}
                        openCalendar={openCalendar}
                        setSelectedDate={setSelectedDate}
                        setOpenCalendar={setOpenCalendar}
                      />
                      <button onClick={() => setOpenCalendar(true)}>
                        <CalendarIcon className="w-5 h-5" />
                      </button>
                      <div
                        onClick={() => setOpenCalendar(true)}
                        className="w-full focus:outline-none px-6 placeholder-gray-500 placeholder-opacity-25"
                      >
                        {(appointmentDate &&
                          appointmentDate.format("dddd, MMMM Do YYYY")) ||
                          "Select your appointment date"}
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <p>Select time slot</p>
                    <div className="flex flex-wrap gap-3 py-2">
                      {availableSlot &&
                        availableSlot.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => setTime(slot)}
                            className={`rounded-full w-12 px-2 py-0.5 shadow-md ${
                              time === slot && "bg-primary-200"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="absolute flex bottom-0 w-full border-t border-primary-500">
                  <button
                    onClick={() => add()}
                    className="flex w-full items-center justify-center text-primary-500 py-2 md:py-1"
                  >
                    Add Appointment
                  </button>
                  <button
                    onClick={() => bookService()}
                    className="flex w-full items-center justify-center bg-primary-500 text-white py-2 md:py-1"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
