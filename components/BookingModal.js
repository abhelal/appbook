import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import CustomImage from "./CustomImage";
import Calendar from "@components/Calendar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, reset } from "@features/cart/cartSlice";
import axios from "@libs/axios";
import moment from "moment";
import BookingConfirmModal from "@components/BookingConfirmModal";

export default function BookingModal({ service, employees, openAppointment, setOpenAppointment }) {
  const dispatch = useDispatch();
  const date = moment();

  const [openCalendar, setOpenCalendar] = useState(false);
  const [remarks, setRemarks] = useState();
  const [availableSlot, setAvailableSlot] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(date);
  const [selectedSlot, setSelectedSlot] = useState();
  const [time, setTime] = useState();
  const [comment, setComment] = useState("");
  const [bookedServices, setBookedServices] = useState();
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  useEffect(() => {
    async function getAvailableSlot() {
      await axios
        .post("/api/v2/business/available_slots", {
          date: date,
          service_id: service._id,
          day: appointmentDate.format("dddd").toLocaleLowerCase(),
        })
        .then((res) => {
          if (res.data.status === 1) {
            const slots = res?.data?.data;
            setAvailableSlot(slots);
            setSelectedSlot(slots[0]);
            setRemarks();
          } else {
            setAvailableSlot([]);
            setSelectedSlot();
            setRemarks(res.data.remarks);
          }
        });
    }
    if (service) getAvailableSlot();
  }, [service, appointmentDate]);

  const employeeDetails = (id) => {
    console.log(id);
    return employees.filter((emp) => emp._id == id)[0];
  };

  async function bookService() {
    let data = {
      business_id: service.business_id,
      service: [
        {
          service_id: service._id,
          service_name: service.service_name,
          service_person_id: selectedSlot.employee_id,
          service_person_name: employeeDetails(selectedSlot.employee_id)?.employee_name,
          service_charges: service.services_charges,
          date: appointmentDate.format("DD MMM YYYY"),
          time: time,
        },
      ],
      comment: comment,
      payment_mode: "Cash",
    };

    await axios.post(`/api/v2/appointment/addAppointment`, data).then((res) => {
      closeAppointment();
      setBookedServices(res.data.appointment.service);
      setShowBookingConfirmation(true);
    });
  }

  function closeAppointment() {
    setOpenAppointment(false);
    setOpenCalendar(false);
    setComment();
    setAppointmentDate(date);
    setTime();
  }

  async function addService() {
    let data = {
      business_id: service.business_id,
      service: [
        {
          service_id: service._id,
          service_name: service.service_name,
          service_person_id: selectedSlot.employee_id,
          service_person_name: employeeDetails(selectedSlot.employee_id)?.employee_name,
          service_charges: service.services_charges,
          date: appointmentDate.format("DD MMM YYYY"),
          time: time,
        },
      ],
    };
    dispatch(addToCart(data));
    closeAppointment();
    return;
  }

  return (
    <>
      <BookingConfirmModal
        services={bookedServices}
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

            <span className="inline-block h-screen align-middle" aria-hidden="true">
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
                    <div className="flex flex-wrap min-h-[40px] items-center py-3 gap-3">
                      {availableSlot?.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setTime();
                          }}
                          className="flex flex-col items-center"
                        >
                          <div
                            className={`flex relative items-center justify-center  rounded-full overflow-hidden ${
                              selectedSlot.employee_id === slot.employee_id
                                ? " bg-primary-300 w-12 h-12"
                                : " bg-gray-100 w-8 h-8"
                            }`}
                          >
                            <CustomImage
                              alt=""
                              src={employeeDetails(slot.employee_id)?.employee_image}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p
                            className={
                              selectedSlot.employee_id === slot.employee_id
                                ? " text-primary-300"
                                : " text-gray-600"
                            }
                          >
                            {employeeDetails(slot.employee_id)?.employee_name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="py-2">
                    <p>Select Day & Date</p>
                    <div className="flex w-full p-1 border-b pt-1.5 justify-center">
                      <Calendar
                        initialDate={appointmentDate}
                        openCalendar={openCalendar}
                        setOpenCalendar={setOpenCalendar}
                        setSelectedDate={setAppointmentDate}
                      />

                      <button onClick={() => setOpenCalendar(true)}>
                        <CalendarIcon className="w-5 h-5" />
                      </button>

                      <div
                        onClick={() => setOpenCalendar(true)}
                        className="w-full focus:outline-none px-6 placeholder-gray-500 placeholder-opacity-25"
                      >
                        {(appointmentDate && appointmentDate.format("dddd, MMMM Do YYYY")) ||
                          "Select your appointment date"}
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <p>Select time slot</p>

                    {remarks && <p className="font-semibold text-red-500">{remarks}</p>}
                    <div className="flex flex-wrap gap-1 py-2">
                      {selectedSlot &&
                        selectedSlot?.time?.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => setTime(slot)}
                            className={`rounded-full w-12 px-1 py-0.5 shadow-md ${
                              time === slot && "bg-primary-200"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="absolute flex bottom-0 w-full border-t border-primary-500 font-semibold">
                  <button
                    disabled={!time}
                    onClick={() => addService()}
                    className="flex w-full items-center justify-center text-primary-500 py-2 md:py-1"
                  >
                    Add Service
                  </button>
                  <button
                    disabled={!time}
                    onClick={() => bookService()}
                    className="flex w-full items-center justify-center bg-primary-500 text-white py-2 md:py-1"
                  >
                    Book Now
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
