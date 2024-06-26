import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import Resources from "@/components/Resources";
export const metadata: Metadata = {
  title: "Healthcare Crisis Watch | Canadian Health Care Crisis",
  description: "Resources to Learn More about Canadian Health Care Crisis",
};

const ResourcesPage = () => {
  return (
    <main>
      <ScrollUp />
      <Breadcrumb pageName="Healthcare Crisis Watch" />
      <Resources />
    </main>
  );
};

export default ResourcesPage;
