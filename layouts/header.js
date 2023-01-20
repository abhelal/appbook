import React, { useEffect } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import DropDownMenu from "@/components/DropDownMenu";
import { useDispatch } from "react-redux";
import { getFavouriteBusiness } from "@/features/business/businessSlice";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(getFavouriteBusiness(user._id));
  }, [user]);

  return (
    <div className="bg-primary-500 text-white flex sticky top-0 w-full justify-center z-20">
      <div className="flex w-full max-w-7xl h-14 items-center justify-between px-4 lg:px-8">
        <div className="lg:hidden">M</div>
        <Link href={"/"} className="flex items-center gap-3">
          <Logo />
          <div>
            <p className="text-2xl font-bold leading-none">
              {process.env.NEXT_PUBLIC_APPNAME}
            </p>
            <p className="text-xs">{process.env.NEXT_PUBLIC_APPTAGLINE}</p>
          </div>
        </Link>

        {!user ? (
          <div className="hidden lg:flex gap-4 items-center justify-end font-semibold text-sm">
            <Link href="/business-account">Create Business Account</Link>
            <Link href="/login">Login</Link>
            <Link href="/reginter">Register</Link>
            <Link href="/login">
              <UserIcon className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <DropDownMenu />
        )}
      </div>
    </div>
  );
}

export default Header;
