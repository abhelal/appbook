import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "@components/Buttons";
import { useRouter } from "next/router";

export default function BookingConfirmation({
  response = null,
  showBookingConfirmation,
  setShowBookingConfirmation,
}) {
  const router = useRouter();
  function closeModal() {
    setShowBookingConfirmation(false);
  }

  function seeBooking() {
    setShowBookingConfirmation(false);
    router.push("/user/mybooking");
  }

  const getTotalPrice = () => {
    return response?.service.reduce(
      (accumulator, service) => accumulator + +service.service_charges,
      0
    );
  };

  return (
    <>
      <Transition appear show={showBookingConfirmation} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto bg-gray-400 bg-opacity-70 px-4"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
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
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
                <div className="flex flex-col w-full py-6 items-center text-md text-primary-500 font-medium leading-6">
                  <CheckCircleIcon className="w-14 h-14 text-current" />
                  <div>Booking Confirmed</div>
                </div>
                <div className="px-6 text-sm text-gray-500">
                  <p>
                    <span>Service : </span>{" "}
                    <span>{response?.service.length}</span>
                  </p>
                  <p className="">
                    <span>Total Charge : </span>{" "}
                    <span>$ {getTotalPrice() + 3}</span>
                  </p>
                  <p className="">
                    {response?.service?.map((service, index) => (
                      <div key={index}>
                        <span>Date : </span> <span>{service.date}</span>
                      </div>
                    ))}
                  </p>
                </div>

                <div className="mt-4">
                  <PrimaryButton onClick={seeBooking} className="w-full">
                    See Booking
                  </PrimaryButton>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
