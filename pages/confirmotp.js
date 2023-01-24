import AuthCard from "@components/AuthCard";
import { PrimaryOutlinedButton } from "@components/Buttons";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@features/auth/authSlice";
import { useRouter } from "next/router";

export default function Verify() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
    }

    if (isSuccess || user) {
      router.push("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {};
    dispatch(login(userData));
  };
  return (
    <AuthCard>
      <h1 className="text-xl font-bold mt-4">Enter Code</h1>
      <h6 className="text-xs py-2">
        We have sent a 4-digit code to +44 7911 123456
      </h6>
      <form onSubmit={onSubmit} className="flex flex-col mt-6 pb-24 gap-3">
        <div className="flex gap-4 mt-4">
          <div className="relative flex border-b-2 border-gray-300 mb-10 pr-2 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <input
              type="text"
              autoFocus
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="relative flex border-b-2 border-gray-300 mb-10 pr-2 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <input
              type="text"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="relative flex border-b-2 border-gray-300 mb-10 pr-2 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <input
              type="text"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder=""
            />
          </div>
          <div className="relative flex border-b-2 border-gray-300 mb-10 pr-2 focus-within:border-primary-200 focus-within:ring-0 focus-within:ring-primary-500">
            <input
              type="text"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder=""
            />
          </div>
        </div>
        <button className="text-primary-500 text-sm text-right pb-4">
          Did not get code?
        </button>
        <PrimaryOutlinedButton>Submit</PrimaryOutlinedButton>
      </form>
    </AuthCard>
  );
}
