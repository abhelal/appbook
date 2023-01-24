import React, { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { Bars3Icon, BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import DropDownMenu from "@/components/DropDownMenu";
import { useDispatch } from "react-redux";
import { getFavouriteBusiness } from "@/features/business/businessSlice";
import MenuDrawer from "@/components/MenuDrawer";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { unreaded } = useSelector((state) => state.notifications);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (user) dispatch(getFavouriteBusiness(user._id));
  }, [user]);

  useEffect(() => {
    setOpenDrawer(false);
  }, [router]);

  return (
    <div className="bg-primary-500 text-white flex sticky top-0 w-full justify-center z-40">
      <div className="flex w-full max-w-screen-2xl h-14 items-center justify-between px-4 lg:px-8">
        <button className="block lg:hidden" onClick={() => setOpenDrawer(true)}>
          <Bars3Icon className="w-5 h-5 text-white" />
        </button>

        <MenuDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

        <Link href={"/"} className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="text-2xl font-bold leading-none">{process.env.NEXT_PUBLIC_APPNAME}</p>
            <p className="text-xs">{process.env.NEXT_PUBLIC_APPTAGLINE}</p>
          </div>
        </Link>
        <div className="hidden lg:block">
          {!user ? (
            <div className="flex gap-4 items-center justify-end font-semibold text-sm">
              <Link href="/business-account">Create Business Account</Link>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
              <Link href="/login">
                <UserIcon className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="flex gap-8">
              <button onClick={() => router.push("/notification")} className="relative">
                <BellIcon className="w-7 h-7" />
                <div className="absolute -top-2 -right-6 h-4 w-8 rounded-full bg-red-300 text-xs px-0.5">
                  {unreaded}
                </div>
              </button>
              <DropDownMenu />
            </div>
          )}
        </div>
        <div className="lg:hidden">{""}</div>
      </div>
    </div>
  );
}

export default Header;
