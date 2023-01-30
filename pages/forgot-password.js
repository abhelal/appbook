import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import SendEmail from "@/components/SendEmail";
import SetNewPassword from "@/components/SetNewPassword";
import SendMailConfirmation from "@/components/SendMailConfirmation";
import PasswordUpdated from "@/components/PasswordUpdated";

export default function ForgotPassword() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [screen, setScreen] = useState("SENDMAIL");

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <div className="h-full flex flex-col justify-center items-end">
      {screen === "SENDMAIL" && <SendEmail setScreen={setScreen} />}
      {screen === "MAILSENT" && <SendMailConfirmation setScreen={setScreen} />}
      {screen === "UPDATEPASSWORD" && <SetNewPassword setScreen={setScreen} />}
      {screen === "PASSWORDUPDATED" && <PasswordUpdated />}
    </div>
  );
}
