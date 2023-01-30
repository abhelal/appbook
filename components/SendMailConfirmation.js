import React from "react";
import Image from "next/image";
import AuthCard from "./AuthCard";

function SendMailConfirmation({ setScreen }) {
  return (
    <AuthCard>
      <div className="min-h-sm relative flex w-full flex-col items-center">
        <div className="flex justify-center py-4">
          <Image
            src="/images/secure-mail.png"
            alt="mailicon"
            width={48}
            height={48}
            objectFit="contain"
            loading="eager"
          />
        </div>
        <div className="text-xl font-semibold text-gray-500 text-center">Check your email</div>
        <p className="text-center">We have sent a password recovery instruction to your email</p>
        <div>
          <button
            onClick={() => setScreen("UPDATEPASSWORD")}
            className="bg-primary-500 px-4 py-1 rounded-md shadow-sm text-white font-semibold my-8"
          >
            UPDATE PASSWORD
          </button>
        </div>
        <div className="text-center w-full text-xs text-gray-500">
          <h6>Did not receive email ? check spam folder</h6>
          <button onClick={() => setScreen("SENDMAIL")} className="text-primary-500">
            Try another email
          </button>
        </div>
      </div>
    </AuthCard>
  );
}

export default SendMailConfirmation;
