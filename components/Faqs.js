import { Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function Faqs({ businessFaq_id }) {
  return (
    <div className="w-full px-4 pb-8 md:px-12">
      <div className="text-primary-500 text-2xl font-semibold py-4">FAQs</div>
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {businessFaq_id?.faqs_text.map((faq, idx) => (
          <Disclosure key={idx}>
            {({ open }) => (
              <div className="border border-primary-500 rounded-md bg-white">
                <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-500 bg-white-100 rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
                  <span className="py-3">{faq.ques_text}</span>
                  {open ? (
                    <XMarkIcon className="w-5 h-5 text-primary-500" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5 text-primary-500" />
                  )}
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                  {faq.ans_text}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
