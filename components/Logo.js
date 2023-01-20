import Image from "next/image";

export default function Logo({ width, height }) {
  return (
    <div className="flex items-center align-middle font-bold text-2xl text-white gap-2">
      <Image
        loading="eager"
        src="/images/applogo.svg"
        width={width ? width : 35}
        height={height ? height : 35}
      />
    </div>
  );
}
