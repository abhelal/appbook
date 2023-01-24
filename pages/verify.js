import { OutlinedSubmitButton } from "@components/Buttons";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register, cancell_reg, reset } from "@features/auth/authSlice";
import { dialCode } from "@utils/dialCode";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";

export default function VerifyForm() {
  const router = useRouter();
  const countries = dialCode();
  const [selected, setSelected] = useState(countries[0]);
  const {
    user,
    checked_user,
    isAvailable,
    isSuccess,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
    if (isSuccess || user) {
      router.push("/");
    }
    if (!checked_user) {
      router.push("/register");
    }
    dispatch(reset());
  }, [user, isError, isAvailable, message, router, dispatch]);

  function cancell() {
    dispatch(reset());
    dispatch(cancell_reg());
    router.push("/");
  }
  const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  return (
    <Formik
      initialValues={{
        full_name: checked_user ? checked_user.full_name : "",
        email: checked_user ? checked_user.email : "",
        gender: checked_user ? checked_user.gender : "",
        password: checked_user ? checked_user.password : "",
        contactNumber: "",
        role: "User",
      }}
      validationSchema={Yup.object({
        full_name: Yup.string()
          .max(25, "Must be less than 25 characters")
          .min(6, "Must be 6 characters or more")
          .required("Full Name is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        gender: Yup.string().required("Please select gender"),
        password: Yup.string()
          .max(25, "Must be less than 25 characters")
          .min(8, "Must be 8 characters or more")
          .required("Password is required"),
        contactNumber: Yup.string()
          .matches(phoneRegExp, "Phone number is not valid")
          .max(25, "Must be less than 25 digit")
          .required("Phone number is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        values.contactNumber = selected.dialCode + values.contactNumber;
        dispatch(register(values));
        setSubmitting(false);
      }}
    >
      <div className="flex flex-col h-0 flex-grow w-full justify-center items-center">
        <div className="w-full max-w-sm bg-white rounded-md border p-4 lg:p-8">
          <h1 className="text-xl font-bold mt-4">Get Code</h1>
          <h6 className="text-xs">Enter your mobile number to get the OTP </h6>
          <Form className="flex flex-col mt-6 pb-24 gap-3">
            <div className="relative flex border-b border-gray-300 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="flex w-28 h-auto items-center p-1">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1 w-full">
                    <Listbox.Button className="relative flex items-center w-full text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <Image
                        src={selected.flag}
                        alt="flag"
                        width={40}
                        height={25}
                        objectFit="contain"
                        loading="eager"
                      />
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-30 mt-1 h-52 w-80 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countries.map((country, idx) => (
                          <Listbox.Option
                            key={idx}
                            className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              selected?.dialCode === country.dialCode
                                ? "bg-primary-100 text-primary-900"
                                : "text-gray-900"
                            }`}
                            value={country}
                          >
                            <>
                              <div className="flex items-center gap-3">
                                <Image
                                  src={country.flag}
                                  alt="flag"
                                  width={30}
                                  height={15}
                                  objectFit="contain"
                                  loading="eager"
                                />
                                <span
                                  className={`block truncate text-left ${
                                    selected?.name === country.name
                                      ? "font-medium"
                                      : "font-normal"
                                  }`}
                                >
                                  {country.name}
                                </span>
                              </div>

                              {selected?.name === country.name ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                <div className="text-sm w-28 font-semibold whitespace-nowrap px-2">
                  {selected.dialCode}
                  {" - "}
                </div>
              </div>
              <Field
                type="tel"
                name="contactNumber"
                className="block w-full border-0 p-0 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder=""
              />
            </div>
            <InputError name="contactNumber" />
            <OutlinedSubmitButton isLoading={isLoading} type="submit">
              Continue
            </OutlinedSubmitButton>
          </Form>
          <button
            onClick={cancell}
            className="text-xs font-thin text-center w-full"
          >
            Cancell registration
          </button>
        </div>
      </div>
    </Formik>
  );
}
