import Head from "next/head";
import React, { useState } from "react";
import Header from "./header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "@features/categories/categorySlice";

function Index({ children }) {
  const dispatch = useDispatch();
  const [serverLoading, setServerLoading] = useState(true);

  useEffect(() => {
    dispatch(getCategories({}));
    setServerLoading(false);
  }, []);

  if (serverLoading) return;

  return (
    <div className="relative bg-gray-50 flex flex-col h-full min-h-screen overflow-x-hidden text-gray-600">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APPNAME}</title>
      </Head>
      <div className="flex w-full h-full min-h-screen flex-col items-center bg-light-background dark:bg-dark-background">
        <div className="flex z-20 h-auto w-full items-center justify-center font-semibold bg-light dark:bg-dark shadow-sm">
          <Header />
        </div>
        <div className="flex flex-grow flex-col items-center justify-center w-full">{children}</div>
      </div>
    </div>
  );
}
export default Index;
