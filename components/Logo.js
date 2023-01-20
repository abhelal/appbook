import Image from "next/image";
import Link from "next/link";

export default function Logo({ width, height }) {
  return (
    <Link
      href="/"
      className="flex items-center align-middle font-bold text-2xl text-white gap-2"
    >
      <Image
        loading="eager"
        src="/images/applogo.svg"
        width={width ? width : 35}
        height={height ? height : 35}
      />
    </Link>
  );
}
