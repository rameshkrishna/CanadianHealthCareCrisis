import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
export const metadata: Metadata = {
  title:
    "About Us | Canadian Health Crisis",
  description: "This is About page description",
};

const AboutPage = () => {
  return (
    <main>
      <ScrollUp/>
      <About />
      <Team />
    </main>
  );
};

export default AboutPage;
