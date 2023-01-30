import AuthCard from "@components/AuthCard";
import { OutlinedSubmitButton } from "@components/Buttons";
import { PrimaryOutlinedButton } from "@components/Buttons";
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "@/libs/axios";
import Image from "next/image";

export default function ForgotPassword() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [screen, setScreen] = useState("UPDATE");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);
  return (
    <Formik
      initialValues={{
        email: "",
        code: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
          .max(25, "Must be less than 25 characters")
          .min(8, "Must be 8 characters or more")
          .required("Password is required"),
        passwordConfirmation: Yup.string()
          .required("Please confirm password")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          setIsLoading(true);
          await axios.post("/api/v1/user/forgetPassword", values).then((res) => {
            if (res.data.error) {
              toast.error(res.data.message);
              setIsLoading(false);
            } else {
              setAction("CODESENT");
            }
          });
          setIsLoading(false);
          setSubmitting(false);
        }, 400);
      }}
    >
      <AuthCard>
        {screen === "SENDMAIL" && (
          <div>
            <h1 className="text-xl font-bold mt-4">Forgot Password</h1>
            <h6 className="text-xs py-2">
              We will send an email to your registered email address. Enter your registered email
              below
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
          </div>
        )}
        {screen === "MAILSENT" && (
          <div>
            <div className="min-h-sm relative flex w-full flex-col items-center">
              <div className="flex justify-center py-4">
                <Image
                  src="/images/secure-mail.png"
                  alt="mailicon"
                  width={48}
                  height={48}
                  objectFit="contain"
                  loading="eager"
                />
              </div>
              <div className="text-xl font-semibold text-gray-500 text-center">
                Check your email
              </div>
              <p className="text-center">
                We have sent a password recovery instruction to your email
              </p>
              <div>
                <button className="bg-primary-500 px-4 py-1 rounded-md shadow-sm text-white font-semibold my-8">
                  UPDATE PASSWORD
                </button>
              </div>
              <div className="text-center w-full text-xs text-gray-500">
                <h6>Did not receive email ? check spam folder</h6>
                <button onClick={() => setAction()} className="text-primary-500">
                  Try another email
                </button>
              </div>
            </div>
          </div>
        )}
        {screen === "UPDATE" && (
          <div>
            <h1 className="text-xl font-bold mt-4">Create New Password</h1>
            <form onSubmit={() => {}} className="flex flex-col mt-6 pb-24 gap-3">
              <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
                <div className="pr-2 flex items-center">
                  <LockClosedIcon className="h-4 w-4" />
                </div>
                <Field
                  type={"password"}
                  name="password"
                  className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
                <div className="pr-2 flex items-center">
                  <LockClosedIcon className="h-4 w-4" />
                </div>
                <Field
                  type={"password"}
                  name="passwordConfirmation"
                  className="block w-full border-0 p-0 placeholder-gray-400  focus:outline-none  focus:ring-0 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="mt-10"></div>
              <PrimaryOutlinedButton>Reset</PrimaryOutlinedButton>
            </form>
          </div>
        )}
      </AuthCard>
    </Formik>
  );
}
