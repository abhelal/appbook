import Link from "next/link";
import { Menu } from "@headlessui/react";

export const DropdownLink = ({ children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <Link
        {...props}
        className={`w-full text-left block px-4 py-1 text-sm font-normal leading-5 text-gray-600 ${
          active ? "bg-gray-100" : " hover:bg-primary-50"
        } focus:outline-none transition duration-150 ease-in-out`}
      >
        {children}
      </Link>
    )}
  </Menu.Item>
);
