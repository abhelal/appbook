import Image from "next/image";

export default function Footer() {
  return (
    <div className="relative bg-footer-layout bg-primary-300 bg-opacity-50 bg-blend-overlay w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 text-white p-4 lg:p-6">
        <div>
          <div className="text-lg font-semibold tracking-widest py-4">
            Categories
          </div>
          <div className="flex flex-col gap-1.5 text-sm tracking-widest">
            <div>Saloon</div>
            <div>Restaurent</div>
            <div>Home Service</div>
            <div>Workshop</div>
            <div>Grocery</div>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold tracking-widest py-4">
            Quick Links
          </div>
          <div className="flex flex-col gap-1.5 text-sm tracking-widest">
            <div>White List </div>
            <div>Contacts </div>
            <div>Add your business</div>
            <div>Vendors</div>
            <div>Help</div>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold tracking-widest py-4">
            Informations
          </div>
          <div className="flex flex-col gap-1.5 text-sm tracking-widest">
            <div>About us</div>
            <div>Privecy Policy</div>
            <div>Home Service</div>
            <div>Blog</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold tracking-widest py-4">
            Download App
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="relative h-10 w-32">
              <Image
                height={40}
                width={110}
                loading="eager"
                src="/images/istore.png"
                alt="ist"
              />
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
      <div className="block lg:flex justify-between items-center w-full bg-black bg-opacity-40 py-2 lg:py-4 px-4 lg:px-8 text-white text-sm tracking-wider">
        <div className="flex w-full justify-center lg:justify-start gap-4">
          <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
            <Image
              lazy="eager"
              height={20}
              width={20}
              src="/images/tw.png"
              alt="tw"
            />
          </div>
          <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
            <Image
              lazy="eager"
              height={20}
              width={20}
              src="/images/fb.png"
              alt="fb"
            />
          </div>
          <div className="flex items-center justify-center h-8 w-8 bg-white rounded-full ">
            <Image
              lazy="eager"
              height={20}
              width={20}
              src="/images/in.png"
              alt="in"
            />
          </div>
        </div>
        <div className="py-2 lg:py-0">
          Copyright © 2022 Appbook.com . All Rights Reserved
        </div>
      </div>
    </div>
  );
}
