import { MinusIcon } from "@heroicons/react/24/outline";
import { TextArea } from "@components/Inputs";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, reset } from "@features/cart/cartSlice";
import CustomImage from "@components/CustomImage";
import axios from "@libs/axios";
import BookingConfirmModal from "@components/BookingConfirmModal";
import Spinner from "@components/Spinner";
import { useRouter } from "next/router";
export default function Cart({ setShowMobileCart }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { business } = useSelector((state) => state.business);
  const cart = useSelector((state) => state.cart);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookedServices, setBookedServices] = useState();
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  const businesIndex = cart.findIndex(
    (bzns) => bzns?.business_id === business?.business_id._id
  );

  const getTotalPrice = () => {
    return cart[businesIndex]?.service.reduce(
      (accumulator, service) => accumulator + +service.service_charges,
      0
    );
  };

  async function bookNow() {
    if (user) {
      setLoading(true);
      let data = {
        business_id: business?.business_id._id,
        service: cart[businesIndex]?.service,
        comment: comment,
        payment_mode: "Cash",
      };
      await axios
        .post(`/api/v2/appointment/addAppointment`, data)
        .then((res) => {
          setBookedServices(res.data.appointment.service);
          setShowBookingConfirmation(true);
          setTimeout(() => {
            dispatch(reset());
          }, 3000);
        });
      setLoading(false);
    } else router.push("/login");
  }

  return (
    <div className="flex flex-col h-full">
      <BookingConfirmModal
        services={bookedServices}
        showBookingConfirmation={showBookingConfirmation}
        setShowBookingConfirmation={setShowBookingConfirmation}
      />
      <div className="flex flex-col flex-grow overflow-y-auto scrollbox scrollboxmenu py-4 px-4 sm:px-6">
        <div className="text-md text-center text-primary-500 font-medium">
          Booking Summary
        </div>
        <div className="text-sm text-center text-gray-500">
          Start adding your service
        </div>
        {/* Cart Item */}
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart[businesIndex]?.service?.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full py-4"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 relative bg-gray-50 border flex-shrink-0 items-center overflow-hidden">
                      <CustomImage
                        src={business.business_id?.business_avatar}
                        layout="fill"
                      />
                    </div>

                    <div className="ml-2 flex flex-col justify-start">
                      <p className="focus:outline-none text-xs text-gray-500 font-semibold">
                        {service.service_name}
                      </p>
                      <div className="text-xs text-primary-500">
                        Date: {service.date}
                      </div>
                    </div>
                  </div>

                  <div className="ml-2 flex flex-1 flex-col items-end">
                    <p className="ml-4 text-xs ">
                      {`£ `}
                      {service?.service_charges}
                    </p>
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            business_id: business?.business_id._id,
                            serviceIndex: index,
                          })
                        )
                      }
                      className="flex justify-center items-center w-4 h-4 m-1 bg-primary-400 rounded-sm shadow text-white"
                    >
                      <MinusIcon className="w-3 h-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {cart[businesIndex]?.service.length > 0 && (
          <>
            <div className="mt-5 text-xs text-gray-400">
              <div className="border-b-2 border-gray-300 py-1"></div>
              <div className="flex py-1 justify-between font-semibold">
                <p>Total</p>
                <p className="text-gray-700">£ {getTotalPrice()} </p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-500">
              <p className="mb-2">Comments</p>
              <TextArea onChange={(e) => setComment(e.target.value)} />
            </div>
          </>
        )}
      </div>

      <div className="mt-6 space-y-3 p-6 lg:p-0">
        <div className="bg-primary-500 flex lg:hidden justify-center w-full text-white rounded-md">
          <div className="flex gap-2">
            <button
              className="font-semibold py-1"
              onClick={() => setShowMobileCart(false)}
            >
              Add More Service
            </button>
          </div>
        </div>
        <div className="bg-primary-500 flex justify-center w-full text-white rounded-md lg:rounded-t-md">
          <div className="flex gap-2">
            {loading && <Spinner color="white" height="6" width="6" />}
            <button className="font-semibold py-1" onClick={() => bookNow()}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
