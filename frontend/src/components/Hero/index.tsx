"use client";
import Image from "next/image";
import Link from "next/link";
import WaitTimes from "@/components/WaitTimes";
import DynamicHealthCareMessage from "@/components/DynamicHealthCareMessage";
import { FaBolt } from "react-icons/fa";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { YouTubeEmbed } from "@next/third-parties/google";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="bg-background relative overflow-hidden pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <DynamicHealthCareMessage />

                <p className="text-foreground mx-auto mb-9 max-w-[600px] text-base font-medium sm:text-lg sm:leading-[1.44]">
                  We've compiled the stats from trusted sources to show you how
                  broken Our Canadian Healthcare System really is.
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <a
                      href="https://github.com/rameshkrishna/CanadianHealthCareCrisis/discussions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-foreground hover:text-primary-foreground flex items-center gap-4 rounded-md bg-secondary px-6 py-[14px] text-base font-medium transition duration-300 ease-in-out hover:bg-primary"
                    >
                      <MdOutlineMarkUnreadChatAlt
                        size={24}
                        color="currentColor"
                      />
                      Join Discussions Now
                    </a>
                  </li>
                  <li>
                    <a
                      href="#DemandActionNow"
                      className="text-secondary-foreground hover:text-primary-foreground flex items-center gap-4 rounded-md bg-secondary px-6 py-[14px] text-base font-medium transition duration-300 ease-in-out hover:bg-primary"
                    >
                      <FaBolt size={24} color="currentColor" />
                      Demand Action Now
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mx-auto">
                <WaitTimes />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
