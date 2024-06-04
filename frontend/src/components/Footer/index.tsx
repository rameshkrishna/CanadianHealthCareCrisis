import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12"></div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12"></div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12"></div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12"></div>
          <div className="w-full px-4 md:w-2/3 lg:w-6/12 xl:w-3/12"></div>
        </div>
      </div>

      <div className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div className="-mx-3 flex items-center justify-center md:justify-start">
                  <a
                    href="/#"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Privacy policy
                  </a>
                  <a
                    href="/#"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Legal notice
                  </a>
                  <a
                    href="/#"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Terms of service
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-base text-gray-7">
                  Built With Love and Frustration in Canada
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
