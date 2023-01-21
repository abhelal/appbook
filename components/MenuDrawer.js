import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MobileSideBar from "@components/MobileSideBar";

export default function MenuDrawer({ openDrawer, setOpenDrawer }) {
  return (
    <Transition.Root show={openDrawer} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={openDrawer}
        onClose={setOpenDrawer}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full">
            <MobileSideBar />
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
