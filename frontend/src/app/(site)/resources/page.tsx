import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import MediaMentionsAboutHealthCare from "@/components/Resources";
export const metadata: Metadata = {
  title: "Demand Now | Canadian Health Crisis",
  description: "This is Demand Now Page",
};

const ResourcesPage = () => {
  return (
    <main>
      <ScrollUp />
      <Breadcrumb pageName="Demand Now" />
      <MediaMentionsAboutHealthCare />
    </main>
  );
};

export default ResourcesPage;