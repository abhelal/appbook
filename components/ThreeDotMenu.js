import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import CancellBookingModal from "@components/CancellBookingModal";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { setBusiness } from "@features/business/businessSlice";
import axios from "@libs/axios";

export default function ThreeDotMenu({
  appoinmentid = null,
  business = null,
  getBookings,
}) {
  const [showCancellModal, setShowCancellModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  async function showBusiness() {
    const url =
      "business?" + "id=" + business?._id + "&name=" + business?.business_name;
    dispatch(setBusiness(business));
    router.push(url);
  }

  function showMessage() {
    router.push(
      `/chat/message/?o=${business.usr_id}&s=${user._id}&b=${business._id}&on=${business.business_name}`
    );
  }

  async function cancellBooking(comment) {
    await axios
      .post(`/api/v1/appointment/deleteappointment?id=${appoinmentid}`, {
        id: appoinmentid,
        status: "Cancelled",
        comment: comment,
      })
      .then((res) => getBookings());
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <CancellBookingModal
        cancellBooking={cancellBooking}
        showCancellModal={showCancellModal}
        setShowCancellModal={setShowCancellModal}
      />
      <div>
        <Menu.Button className="flex items-center focus:outline-none">
          <EllipsisVerticalIcon className="w-6 h-6 text-primary-500" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-4 w-36 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => showBusiness()}
              className="block px-4 py-1 text-xs hover:text-primary-500"
            >
              View Business
            </button>

            <button
              onClick={() => showMessage()}
              className="block px-4 py-1 text-xs hover:text-primary-500"
            >
              Send Message
            </button>

            <button
              onClick={() => setShowCancellModal(true)}
              className="block text-red-500 px-4 py-1 text-xs hover:text-red-600"
            >
              Cancel Booking
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
