import Link from "next/link";
import { PrimaryButton, PrimaryOutlinedButton } from "@components/Buttons";
import { logout, reset } from "@features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function MobileSideBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.push("/");
  };
  return (
    <div className="h-screen flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
      <div className="flex-grow flex flex-col">
        {!user && (
          <div className="space-y-3">
            <div className="px-4">
              <Link href="/register">
                <PrimaryButton className="w-full">Register</PrimaryButton>
              </Link>
            </div>
            <div className="px-4">
              <Link href="/login">
                <PrimaryOutlinedButton className="w-full">Log in</PrimaryOutlinedButton>
              </Link>
            </div>
            <div className="px-4 text-md text-primary-500">
              <Link href="/business-account">Business</Link>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-1 flex-col gap-3 px-4">
            <div className="flex items-center bg-primary-500 rounded-md p-2">
              <img
                className="rounded-full border-2 w-8 h-8 border-white border-opacity-60 shadow-sm overflow-hidden text-center"
                src={
                  user.avatar
                    ? process.env.NEXT_PUBLIC_IMAGE_BASE + user.avatar
                    : `https://ui-avatars.com/api/?name=${user.name}&color=22c55e&background=FFF`
                }
                alt="avatar"
              />

              <p className="text-sm pl-1 text-white">{user.name}</p>
            </div>
            <Link href="/mybooking">My Booking</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/notification">Notifications</Link>
            <Link href="/security">Security</Link>
            <a href="https://wa.me/4407395545071">Help</a>
          </div>
        )}
        {user && (
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4 bg-slate-300">
            <div className="flex-shrink-0 w-full group block">
              <div>
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                >
                  {user?.email}
                </Link>
              </div>
              <div>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-primary-700
                group-hover:text-gray-900"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
