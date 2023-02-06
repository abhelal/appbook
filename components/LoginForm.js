import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@features/auth/authSlice";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { OutlinedSubmitButton } from "@components/Buttons";
import InputError from "@components/InputError";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError && message) toast.error(message);
    dispatch(reset());
    if (isSuccess && user) router.push("/");
  }, [user, isError, isSuccess, message]);

  return (
    <div className="w-full max-w-sm rounded-md border bg-white p-4 lg:p-8">
      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "User",
          device_token: "Randoem_web_token",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required")
            .trim(),
          password: Yup.string().required("Password is required").trim(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            dispatch(
              login({
                email: values.email.trim(),
                password: values.password.trim(),
                role: "User",
                device_token: "Randoem_web_token",
              })
            );
            setSubmitting(false);
          }, 400);
        }}
      >
        <div>
          <p className="text-xl font-semibold">Sign in</p>
          <p className="text-xs py-2 pb-4">
            Login with your email and password
          </p>
          <Form className="flex flex-col mt-2">
            <div className="relative flex border-b border-gray-300 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <AtSymbolIcon className="h-3 w-3" />
              </div>
              <Field
                type="text"
                name="email"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
                placeholder="Email"
              />
            </div>
            <InputError name="email" />
            <div className="relative flex border-b border-gray-300 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
              <div className="pr-2 flex items-center">
                <LockClosedIcon className="h-3 w-3" />
              </div>
              <Field
                type="password"
                name="password"
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none sm:text-sm"
                placeholder="Password"
              />
            </div>
            <InputError name="password" />
            <div className="flex justify-end py-2">
              <Link
                className="text-xs text-primary-500"
                href="/forgot-password"
              >
                Forgot password ?
              </Link>
            </div>
            <OutlinedSubmitButton
              isLoading={isLoading}
              className="mt-2"
              type="submit"
            >
              Sign In
            </OutlinedSubmitButton>
          </Form>
          <div className="flex flex-col gap-2 w-full mt-4">
            <div className="flex justify-center w-full">
              <div>
                <span className="text-sm text-gray-500">{`Don\'t have an account ?`}</span>
                <Link
                  className="text-sm text-primary-500 px-2"
                  href="/register"
                >
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
}

export default LoginForm;
