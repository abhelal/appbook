import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { OutlinedSubmitButton } from "@components/Buttons";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { check_user, reset } from "@features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function RegisterForm() {
  const [showP, setShowP] = useState(false);
  const [showCP, setShowCP] = useState(false);
  function showPass() {
    setShowP(!showP);
  }
  function showCPass() {
    setShowCP(!showCP);
  }

  const { user, checked_user, isAvailable, isLoading, isError, message } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (message) toast.error(message);
    if (user) router.push("/");
    if (isAvailable || checked_user) {
      router.push("/verify");
    }
    dispatch(reset());
  }, [user, isError, isAvailable, message]);

  return (
    <Formik
      initialValues={{
        full_name: "",
        email: "",
        gender: "",
        password: "",
        passwordConfirmation: "",
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
        passwordConfirmation: Yup.string()
          .required("Please confirm password")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          dispatch(check_user(values));
          setSubmitting(false);
        }, 400);
      }}
    >
      <div className="flex flex-col h-0 flex-grow w-full justify-center items-center">
        <div className="w-full max-w-sm bg-white rounded-md border p-4 lg:p-8">
          <h1 className="text-xl font-semibold">Sign Up</h1>
          <h6 className="text-sm mt-3">Sign up to get started</h6>
          <Form className="flex flex-col mt-4">
            <div className="relative flex border-b border-gray-300 pr-3 focus-within:border-primary-400 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <UserIcon className="h-4 w-4" />
              </div>
              <Field
                type="text"
                name="full_name"
                className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
            <InputError name="full_name" />
            <div className="relative flex border-b border-gray-300 pr-3 focus-within:border-primary-400 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <AtSymbolIcon className="h-4 w-4" />
              </div>
              <Field
                type="text"
                name="email"
                className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Email Address"
              />
            </div>
            <InputError name="email" />

            <div className="relative flex border-b border-gray-300 py-1 focus-within:border-primary-400 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <UsersIcon className="h-4 w-4" />
              </div>
              <Field
                type="text"
                name="gender"
                as="select"
                className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              >
                <option value="" selected disabled hidden>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
            </div>
            <InputError name="gender" />
            <div className="relative flex border-b border-gray-300 py-1 pr-1 focus-within:border-primary-400 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <LockClosedIcon className="h-4 w-4" />
              </div>
              <Field
                type={showP ? "text" : "password"}
                name="password"
                className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                placeholder="Password"
              />

              <div className="pr-2 flex items-center">
                <button type="button" onClick={showPass}>
                  {showP ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <InputError name="password" />
            <div className="relative flex border-b border-gray-300 py-1 pr-1 focus-within:border-primary-400 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <LockClosedIcon className="h-4 w-4" />
              </div>
              <Field
                type={showCP ? "text" : "password"}
                name="passwordConfirmation"
                className="block w-full border-0 p-0 placeholder-gray-400  focus:outline-none  focus:ring-0 sm:text-sm"
                placeholder="Confirm Password"
              />
              <div className="pr-2 flex items-center">
                <button type="button" onClick={showCPass}>
                  {showCP ? (
                    <EyeIcon className="h-4 w-4" />
                  ) : (
                    <EyeSlashIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <InputError name="passwordConfirmation" />
            <OutlinedSubmitButton
              isLoading={isLoading}
              className="mt-3"
              type="submit"
            >
              Sign Up
            </OutlinedSubmitButton>
          </Form>
          <div className="flex flex-col gap-1 w-full">
            <div className="text-center py-3">or</div>
            <button>
              <div className="flex h-10 rounded border border-[#3b5998] bg-[#3b5998]">
                <div className="flex bg-white rounded-l w-12 p-1.5 justify-center">
                  <Image
                    src="/images/facebook.png"
                    alt="fb"
                    width={27}
                    height={20}
                    loading="eager"
                  />
                </div>
                <div className="flex w-full items-center justify-center text-sm text-white px-6">
                  <span> Continue with facebook</span>
                </div>
              </div>
            </button>
            <div className="flex justify-center mt-4 w-full">
              <div>
                <span className="text-sm">Already have an account ?</span>
                <Link className="text-sm text-primary-500 px-2" href="/login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}