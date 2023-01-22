import BookingModal from "@/components/BookingModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Services({ services, employees }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [openAppointment, setOpenAppointment] = useState(false);
  const [selectedService, setSelectedService] = useState();

  async function openAppointmentModal(service) {
    if (user) {
      setSelectedService(service);
      setOpenAppointment(true);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="relative grid grid-cols-12">
      <BookingModal
        service={selectedService}
        employees={employees}
        openAppointment={openAppointment}
        setOpenAppointment={setOpenAppointment}
      />
      <div className="w-full col-span-12 px-4 pb-8 md:px-12">
        <div className="text-primary-500 text-2xl font-semibold py-4">
          Services
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services?.map((service, index) => (
            <div
              key={index}
              className="flex max-w-sm flex-col items-start rounded-md bg-white text-gray-500 p-4 shadow-md"
            >
              <p className="whitespace-nowrap font-semibold">
                {service.service_name}
              </p>
              <p className="text-xs h-full">{service?.service_description} </p>
              <div className="flex py-3 text-xs">
                <p>Service Hours :</p>
                <p className="px-1 font-semibold">
                  {service.service_duration} Min
                </p>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-xl font-bold text-primary-500">
                  {service.services_charges} £
                </p>
                <button
                  onClick={() => openAppointmentModal(service)}
                  className="flex justify-between items-center py-0.5 rounded-md bg-primary-500 gap-3 shadow-sm px-4 text-sm text-white"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
