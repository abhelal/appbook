import Dropdown from "@components/DropDown";
import { DropdownLink } from "@components/DropdownLink";
import { DropdownButton } from "@components/DropdownButton";
import { logout } from "@features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import CustomImage from "@/components/CustomImage";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropDownMenu() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="hidden sm:flex sm:items-center">
      <Dropdown
        align="right"
        width="36"
        trigger={
          <button className="flex items-center text-sm text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <CustomImage src={user.avatar} layout="fill" />
            </div>
            <p className="text-sm pl-1 text-white">{user?.full_name?.split(" ")[0]}</p>
            <ChevronDownIcon className="w-5 h-5 text-white" />
          </button>
        }
      >
        <DropdownLink href={`/mybooking`}>My Booking</DropdownLink>
        <DropdownLink href="/profile">Profile</DropdownLink>
        <DropdownLink href={"/chat"}>Chat</DropdownLink>
        <DropdownLink href="https://wa.me/4407395545071">Help Center</DropdownLink>
        <DropdownButton onClick={() => dispatch(logout(user))}>Logout</DropdownButton>
      </Dropdown>
    </div>
  );
}
