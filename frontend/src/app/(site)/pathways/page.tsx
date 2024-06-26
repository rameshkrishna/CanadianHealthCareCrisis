import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import Resources from "@/components/Resources";
export const metadata: Metadata = {
  title: "Healthcare Crisis Watch | Canadian Health Care Crisis",
  description: "Resources to Learn More about Canadian Health Care Crisis",
};

const PathwaysPage = () => {
  return (
    <main>
      <ScrollUp />
      <Breadcrumb pageName="Healthcare Crisis Watch" />
      <h2>TBD</h2>
    </main>
  );
};

export default PathwaysPage;
