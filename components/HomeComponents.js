import Image from "next/image";
import React from "react";

function HomeComponents() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white my-12 shadow-md rounded-xl m-4 lg:m-8 overflow-hidden">
      <div className="relative h-96">
        <Image alt="" src="/images/banngerImage.webp" width={1000} height={1000} />
      </div>
      <div className="p-6">
        <p className="font-semibold text-2xl py-2">{`Did you know on
          average people spend 3 hours a week arranging appointments?`}</p>
        <p>
          {`Now with App-book you can save them hours and do something you enjoy. Manage
          all your bookings in one application. No more long phone calls, Reduce
          your phone bills, Automatic appointment reminders - so you don't miss
          your appointment Book directly through your phone anywhere, anytime.`}
        </p>

        <p className="font-semibold text-2xl mt-4 py-2">{`Are you tired of waiting hours at the
          hairdresser?`}</p>
        <p>{`Well look no further, we have the perfect solution to
          your problems. With so many categories to choose from, Hairdressers to
          massage therapist, to booking your car in the garage for mot. We have
          you covered making the process easy and simple. Discover new health
          and beauty businesses, Book your next Mot with us We at App-book
          provide you the flexibility of choosing a time and date that fits your
          schedule`}</p>

        <p className="mt-6 font-semibold">{`We are here to revolutionize the industry making it easier and simpler
          to book appointments with your favorite professionals.`}</p>
      </div>
    </div>
  );
}

export default HomeComponents;
