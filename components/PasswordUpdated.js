import AuthCard from "@components/AuthCard";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { PrimaryOutlinedButton } from "@components/Buttons";
import { useRouter } from "next/router";
export default function PasswordUpdated() {
  const router = useRouter();
  return (
    <AuthCard>
      <div className="flex flex-col w-full min-h-sm relative">
        <div className="flex justify-center py-4">
          <CheckCircleIcon className="w-16 h-16 text-primary-500" />
        </div>
        <div className="text-xl font-semibold text-gray-500 text-center">
          Password updated successfully
        </div>
        <PrimaryOutlinedButton onClick={() => router.push("/login")} className={"mt-10"}>
          Back to Login
        </PrimaryOutlinedButton>
      </div>
    </AuthCard>
  );
}
