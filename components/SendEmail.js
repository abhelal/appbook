import AuthCard from "@components/AuthCard";
import { OutlinedSubmitButton } from "@components/Buttons";
import { ArrowLeftIcon, AtSymbolIcon } from "@heroicons/react/24/outline";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "@/libs/axios";
import { useState } from "react";
import { useRouter } from "next/router";

function SendEmail({ setScreen }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setIsLoading(true);
          await axios.post("/api/v1/user/forgetPassword", values).then((res) => {
            if (res.data.error) {
              toast.error(res.data.message);
              setIsLoading(false);
            } else {
              setScreen("MAILSENT");
            }
          });
          setIsLoading(false);
          setSubmitting(false);
        }, 400);
      }}
    >
      <AuthCard>
        <button onClick={() => router.push("/login")}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-500" />
        </button>
        <h1 className="text-xl font-bold mt-4">Forgot Password</h1>
        <h6 className="text-xs py-2">
          We will send an email to your registered email address. Enter your registered email below
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
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Email"
            />
          </div>
          <InputError name="email" />
          <OutlinedSubmitButton isLoading={isLoading} type="submit" className="w-full mt-6">
            Reset Password
          </OutlinedSubmitButton>
        </Form>
      </AuthCard>
    </Formik>
  );
}

export default SendEmail;
