import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RadioButton } from "@components/Inputs";
import CancellConfirmation from "@components/CancellConfirmation";

export default function CancellBookingModal({
  cancellBooking,
  showCancellModal,
  setShowCancellModal,
}) {
  const [showCancellConfirmation, setShowCancellConfirmation] = useState(false);

  function closeModal() {
    setShowCancellModal(false);
  }

  function submitCancell() {
    cancellBooking("others");
    setShowCancellModal(false);
    setShowCancellConfirmation(true);
  }

  return (
    <>
      <CancellConfirmation
        showCancellConfirmation={showCancellConfirmation}
        setShowCancellConfirmation={setShowCancellConfirmation}
      />
      <Transition appear show={showCancellModal} as={Fragment}>
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
                <div className="p-4">
                  <div className="font-semibold">Cancell Booking ?</div>
                  <div className="text-xs py-3 text-gray-500">
                    <p className="pb-4">Tell us why you want to cancell</p>
                    <div className="flex items-center py-1.5">
                      <RadioButton />
                      <p className="px-4 md:px-6 ">
                        I do not need the booking right now
                      </p>
                    </div>
                    <div className="flex items-center py-1.5">
                      <RadioButton />
                      <p className="px-4 md:px-6">
                        I want to chang my booking details
                      </p>
                    </div>
                    <div className="flex items-center py-1.5">
                      <RadioButton />
                      <p className="px-4 md:px-6">
                        I want to know how this apps works
                      </p>
                    </div>
                    <div className="flex items-center py-1.5">
                      <RadioButton />
                      <p className="px-4 md:px-6">Other</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full border-t border-primary-500">
                  <button
                    onClick={closeModal}
                    className="flex w-full items-center justify-center text-primary-500 py-2 md:py-1"
                  >
                    Cancell
                  </button>
                  <button
                    onClick={() => submitCancell()}
                    className="flex w-full items-center justify-center bg-primary-500 text-white py-2 md:py-1"
                  >
                    Submit
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
