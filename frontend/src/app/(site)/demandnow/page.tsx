import Breadcrumb from "@/components/Common/Breadcrumb";
import Team from "@/components/Team";
import { Metadata } from "next";
import ScrollUp from "@/components/Common/ScrollUp";
import PublicEmailTool from "@/components/EmailTool";
export const metadata: Metadata = {
  title: "Demand Now | Canadian Health Crisis",
  description: "This is Demand Now Page",
};

const DemandNowPage = () => {
  return (
    <main>
      <ScrollUp />
      <Breadcrumb pageName="Demand Now" />
      <PublicEmailTool />
    </main>
  );
};

export default DemandNowPage;
