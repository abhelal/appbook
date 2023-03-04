import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

function BusinessAccount() {
  return (
    <div className="w-full">
      <div className="flex w-full justify-center lg:p-8">
        <div className="w-full max-w-5xl m-6">
          <p>Welcome to App Book Business</p>
          <p className="mt-4">
            Wether your starting up a new business or already have your own
            business, we all have the same goal, increasing your sales and
            maximising your profits.
          </p>
          <p className="mt-4">
            With new advances in technology happening each day, now more than
            ever it's so important your business keeps up with the latest
            advances, so your business can thrive in the changing world. Our App
            incorporates all these technological advances to boost your business
            in today's world.
          </p>
          <p className="mt-4">
            Our software has been custom designed keeping small business owners
            in mind at every step of the development. We have tried to
            incorporate as many beneficial features as possible to give your
            business the best chance to be successful.
          </p>
          <p className="mt-4">
            App book is the first Booking application globally that has
            incorporated many different businesses into one app. From barbers to
            booking venues we have it all covered with such a wide sector of
            businesses covered you can only imagine the Market numbers we will
            attract. We are here to revolutionise the industry making it easier
            for your customers to book appointments anytime anywhere. The
            booking application is designed to act like your virtual personal
            assistant.
          </p>
          <p className="mt-4">
            We will provide you business with the tools it needs to succeed. The
            application automatically does all the admin work for you, taking
            the stress off your shoulders.
          </p>
          <p className="mt-4">
            A survey was conducted in 2018 which showed 90% of people prefer
            bookings than walkins.
          </p>
          <p className="mt-4 font-bold underline">
            HOW OUR CUSTOM DESIGNED SOFTWARE APPLICATION CAN HELP YOUR BUSINESS
            GROW?
          </p>
          <p className="mt-2 font-bold underline">
            TOP 10 Benefits of joining App Book Business
          </p>
          <div className="text-green-500 mt-2 underline">
            <p>- INCREASE YOUR CUSTOMERS </p>
            <p className="mt-2">- INCREASE YOUR PROFIT MARGINS</p>
            <p className="mt-2"> - AUTOMATED BOOKINGS </p>
            <p className="mt-2">- REDUCE ADMIN TIME BY 75% </p>
            <p className="mt-2">
              - DIRECT MESSAGING TO CUSTOMERS ON APPLICATION{" "}
            </p>
            <p className="mt-2">- CANCEL APPOINTMENTS WITH 1 CLICK</p>
            <p className="mt-2"> - DYNAMIC TIME SLOTS</p>
            <p className="mt-2"> - AUTOMATIC APPOINTMENT REMINDERS </p>
            <p className="mt-2">- ALL YOUR BOOKINGS ON 1 PLATFORM</p>
            <p className="mt-2"> - DYNAMIC WORKING HOURS </p>
            <p className="mt-2">- DATABASE OF PREVIOUS CUSTOMERS</p>
            <p className="mt-2"> - AUTOMATED REVIEW REQUESTS</p>
            <p className="mt-2">- GAME CHANGER PROFILE VIEWS</p>
          </div>

          <p className="mt-4">
            You can register your business on the application from anywhere in
            the world. Our UK based support offices can help you with setting up
            and if you have any questions they can answer them for you.
          </p>
          <p className="mt-4 text-red-600">
            ☆ PLEASE NOTE TO CREATE A BUSINESS ACCOUNT, IT CAN ONLY BE DONE ON
            THE APPLICATION ON IOS OR ANDROID
          </p>

          <p className="mt-4 font-semibold underline">DOWNLOAD APPLICATION</p>
          <div className="flex items-center mt-6">
            <div className="relative w-36">
              <Image
                height={20}
                width={110}
                loading="eager"
                src="/appstore.svg"
                alt="ist"
              />
            </div>

            <div className="relative w-36">
              <Image
                height={20}
                width={128}
                loading="eager"
                src="/playstore.svg"
                alt="ist"
              />
            </div>
          </div>

          <p className="mt-5">We look forward to seeing you on the inside.</p>
          <p className="mt-2"> App Book team </p>
          <p className="mt-4">Remember Be smart Book Smart</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BusinessAccount;
