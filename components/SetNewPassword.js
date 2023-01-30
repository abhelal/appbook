import React, { useState } from "react";
import AuthCard from "@components/AuthCard";
import { Formik, Field, Form } from "formik";
import { PrimaryOutlinedButton } from "./Buttons";
import * as Yup from "yup";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import InputError from "@components/InputError";
import axios from "@/libs/axios";
import { toast } from "react-toastify";

function SetNewPassword({ setScreen }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        reset_password_token: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
        reset_password_token: Yup.string().required("Code is required"),
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
          await axios
            .post("/api/v1/user/changePassword", values)
            .then((res) => {
              if (!res.data.error) {
                setIsLoading(false);
                setScreen("PASSWORDUPDATED");
              } else {
                toast.error(res.data.remarks);
                setIsLoading(false);
              }
            })
            .catch((e) => {
              if (e.response.status === 400) {
                toast.error(e.response.data.remarks);
                setIsLoading(false);
              }
            });
          setIsLoading(false);
          setSubmitting(false);
        }, 400);
      }}
    >
      <AuthCard>
        <h1 className="text-xl font-bold mt-4">Create New Password</h1>
        <Form className="flex flex-col mt-6 pb-24">
          <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <Field
              type={"text"}
              name="reset_password_token"
              className="block w-full border-0 p-0 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Code"
            />
          </div>
          <InputError name="reset_password_token" />
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
          <InputError name="password" />
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
          <InputError name="passwordConfirmation" />
          <div className="mt-4"></div>
          <PrimaryOutlinedButton isLoading={isLoading} type="submit">
            Reset
          </PrimaryOutlinedButton>
        </Form>
      </AuthCard>
    </Formik>
  );
}

export default SetNewPassword;
