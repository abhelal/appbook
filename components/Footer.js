import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
export default function Footer() {
  const router = useRouter();
  const { categories } = useSelector((state) => state.categories);
  function onClick(category_name) {
    router.push(`/search?category=${category_name}`);
  }
  return (
    <div className="relative flex flex-col items-center bg-footer-layout bg-primary-300 bg-opacity-50 bg-blend-overlay w-full">
      <div className="w-full max-w-screen-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 text-white p-4 lg:p-6">
          <div>
            <div className="text-lg font-semibold tracking-widest py-4">Categories</div>
            <div className="flex flex-col gap-1.5 text-sm tracking-widest items-start">
              {categories?.map((category, idx) => (
                <button key={idx} onClick={() => onClick(category.category_name)}>
                  {category?.category_name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold tracking-widest py-4">Quick Links</div>
            <div className="flex flex-col gap-1.5 text-sm tracking-widest items-start">
              <button onClick={() => router.push("/business-account")}>Add your business</button>
              <a href="https://wa.me/4407395545071">Help Center</a>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold tracking-widest py-4">Informations</div>
            <div className="flex flex-col gap-1.5 text-sm tracking-widest items-start">
              <div>About us</div>
              <button onClick={() => router.push("/privacy-notice")}>Privacy Notice</button>
              <div>Blog</div>
              <button onClick={() => router.push("/terms-and-condition")}>
                Terms & Conditions
              </button>
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold tracking-widest py-4">Download App</div>
            <div className="flex flex-col gap-1.5">
              <div className="relative h-10 w-32">
                <Image height={40} width={110} loading="eager" src="/images/istore.png" alt="ist" />
              </div>

              <div className="relative h-16 w-36 -ml-2">
                <Image
                  height={40}
                  width={128}
                  loading="eager"
                  src="/images/playstore.png"
                  alt="ist"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center bg-black bg-opacity-40 py-2 lg:py-4 px-4 lg:px-8 text-white text-sm tracking-wider">
        <div className="block lg:flex justify-between items-center w-full max-w-screen-2xl">
          <div className="flex w-full justify-center lg:justify-start gap-4">
            <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
              <Image lazy="eager" height={20} width={20} src="/images/tw.png" alt="tw" />
            </div>
            <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
              <Image lazy="eager" height={20} width={20} src="/images/fb.png" alt="fb" />
            </div>
            <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
              <Image lazy="eager" height={20} width={20} src="/images/in.png" alt="in" />
            </div>
          </div>
          <div className="py-2 lg:py-0">Copyright © 2023 Appbook.com . All Rights Reserved</div>
        </div>
      </div>
    </div>
  );
}
