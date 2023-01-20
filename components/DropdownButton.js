import { Menu } from "@headlessui/react";

export const DropdownButton = ({ children, ...props }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={`w-full text-left block px-4 py-1 text-sm leading-5 text-gray-700 ${
          active ? "bg-primary-50" : ""
        } focus:outline-none transition duration-150 ease-in-out`}
        {...props}
      >
        {children}
      </button>
    )}
  </Menu.Item>
);
