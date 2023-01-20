import { useState } from "react";
import Image from "next/image";

export default function CustomImage({ ...props }) {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE;
  const [src, setSrc] = useState(baseUrl + props.src);
  return (
    <Image
      {...props}
      src={src}
      alt="NO IMAGE"
      onError={() => setSrc("/images/noimage.svg")}
      placeholder="blur"
      blurDataURL="/images/loading.gif"
    />
  );
}
