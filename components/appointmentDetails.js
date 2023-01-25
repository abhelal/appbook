import React from "react";
import CustomImage from "@components/CustomImage";
import { search } from "@/utils/search";

function AppointmentDetails({ appointment, service }) {
  const statusColor = (appointment) => {
    const ap_status = service[0].status;
    switch (ap_status) {
      case "Rejected":
        return "bg-red-500";
      case "Cancelled":
        return "bg-red-500";
      case "Pending":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 bg-gray-100 shrink-0 overflow-hidden border rounded-full">
          <CustomImage
            src={appointment.business_name.business_avatar}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full">
          <p className="text-lg font-semibold">
            {appointment.business_name.business_name.slice(0, 30)}
          </p>
          <p className="text-xs">
            {appointment.business_name.business_tagline}
          </p>
          <div className="flex py-2">
            <p
              className={`text-sm text-white rounded-full px-2 ${statusColor(
                appointment
              )}`}
            >
              Status: {service[0].status.trim()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full border-b text-sm">
        <p className="text-lg">Service</p>
        <div className="flex justify-between">
          <p>Name :</p>
          <p>{service[0].service_name.trim()}</p>
        </div>
        <div className="flex justify-between">
          <p>Person Name :</p>
          <p>{service[0].service_person_name.trim()}</p>
        </div>
      </div>
      <div className="w-full mt-2 border-b text-sm">
        <p className="text-lg">Appointment Date & Time</p>
        <div className="flex justify-between">
          <p>Date :</p>
          <p>{service[0].date.trim()}</p>
        </div>
        <div className="flex justify-between">
          <p>Time :</p>
          <p>{service[0].time.trim()}</p>
        </div>
      </div>
      <div className="w-full mt-2 border-b text-sm">
        <p className="text-lg">Payment</p>
        <div className="flex justify-between">
          <p>Price :</p>
          <p> £ {service[0].service_charges}</p>
        </div>
        <div className="flex justify-between">
          <p>Payment Method :</p>
          <p>{"Cash"}</p>
        </div>
      </div>
      <div>
        <p className="text-lg mt-2">Comment</p>
        <div className="text-xs">{appointment?.comment}</div>
      </div>
      <div className="py-2 mt-3">
        <button className="border-2 border-primary-500 rounded-md text-primary-500 w-full text-center">
          SEND MESSAGE
        </button>
      </div>
    </div>
  );
}

export default AppointmentDetails;
