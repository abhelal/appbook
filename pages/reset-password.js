import AuthCard from "@components/AuthCard";
import { PrimaryOutlinedButton } from "@components/Buttons";
import { LockClosedIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";
import InputError from "@components/InputError";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword, reset } from "@features/auth/authSlice";

export default function ResetPassword() {
  const router = useRouter();
  const onSubmit = (e) => {
    e.preventDefault();
    router.push("/auth/password-changed");
  };
  return (
    <AuthCard>
      <h1 className="text-xl font-bold mt-4">Create New Password</h1>
      <form onSubmit={onSubmit} className="flex flex-col mt-6 pb-24 gap-3">
        <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
          <div className="pr-2 flex items-center">
            <LockClosedIcon className="h-4 w-4" />
          </div>
          <input
            type="password"
            name="password"
            id="password"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="New Password"
          />
        </div>
        <div className="relative flex border-b border-gray-300 py-1 pr-3 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
          <div className="pr-2 flex items-center">
            <LockClosedIcon className="h-4 w-4" />
          </div>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Confirm Password"
          />
        </div>
        <div className="mt-10"></div>
        <PrimaryOutlinedButton>Reset</PrimaryOutlinedButton>
      </form>
    </AuthCard>
  );
}
