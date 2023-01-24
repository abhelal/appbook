import AuthCard from "@components/AuthCard";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function ResetPassword() {
  const router = useRouter();
  return (
    <AuthCard>
      <div className="min-h-sm relative">
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
        <div className="text-xl font-semibold text-gray-500 text-center">
          Check your email
        </div>
        <button
          onClick={() => {
            router.push("/auth/reset-password");
          }}
          className=" text-xs"
        >
          We have sent a password recovery instruction to your email
        </button>
        <div className="absolute bottom-0 text-center w-full text-xs text-gray-500">
          <h6>Did not receive email ? check spam folder</h6>
          <Link href="/auth/forgot-password">
            <a className=" text-primary-500">Try another email</a>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
