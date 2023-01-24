import AuthCard from "@components/AuthCard";
import { OutlinedSubmitButton } from "@components/Buttons";
import { AtSymbolIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword, reset } from "@features/auth/authSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (message) toast.error(message);
    if (isSuccess) router.push("/auth/check-email");
    dispatch(reset());
    if (user) router.push("/");
  }, [user, isError, isSuccess, message]);
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          dispatch(forgetPassword(values));
          setSubmitting(false);
        }, 400);
      }}
    >
      <AuthCard>
        <h1 className="text-xl font-bold mt-4">Forgot Password</h1>
        <h6 className="text-xs py-2">
          We will send an email to your registered email address. Enter your
          registered email below
        </h6>
        <Form className="flex flex-col mt-6 pb-24">
          <div className="flex mt-4"></div>
          <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <div className="pr-2 flex items-center">
              <AtSymbolIcon className="h-3 w-3" />
            </div>
            <Field
              type="text"
              name="email"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <InputError name="email" />
          <button className="text-primary-500 text-sm text-right pb-4">
            Do not have access ?
          </button>
          <OutlinedSubmitButton
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Reset Password
          </OutlinedSubmitButton>
        </Form>
      </AuthCard>
    </Formik>
  );
}
