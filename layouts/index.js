import Head from "next/head";
import React, { useState } from "react";
import Header from "./header";
import { useDispatch } from "react-redux";
import { getCategories } from "@features/categories/categorySlice";
import { useEffect } from "react";

function Index({ children }) {
  const dispatch = useDispatch();
  const [serverLoading, setServerLoading] = useState(true);

  useEffect(() => {
    dispatch(getCategories({}));
    setServerLoading(false);
  }, []);

  if (serverLoading) return;

  return (
    <div className="relative bg-gray-50 flex flex-col min-h-screen overflow-x-hidden text-gray-600">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APPNAME}</title>
      </Head>
      <Header />
      <div className="flex flex-col h-0 flex-grow">{children}</div>
    </div>
  );
}
export default Index;
