// import About from "@/components/About";
// import HomeBlogSection from "@/components/Blog/HomeBlogSection";
// import CallToAction from "@/components/CallToAction";
// import Clients from "@/components/Clients";
import ScrollUp from "@/components/Common/ScrollUp";
// import Contact from "@/components/Contact";
// import Faq from "@/components/Faq";
// import Features from "@/components/Features";
import Hero from "@/components/Hero";
// import Pricing from "@/components/Pricing";
// import Team from "@/components/Team";
// import Testimonials from "@/components/Testimonials";
// import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import PublicEmailTool from "@/components/EmailTool";
// import Horizontal from "@/components/Recommendations";
import Timeline from "@/components/Recommendations/Timeline";
// import RecCards from "@/components/Recommendations/RecCards";
// import ScrollingLogos from "@/components/ScrollingLogos";
// import ReportList from "@/components/Reports/reportList";
// import CallToAction from "@/components/CallToAction";
// import Features from "@/components/Features";
import Clients from "@/components/Clients";
// import Faq from "@/components/Faq";
// import Team from "@/components/Team";
import Reports from "@/components/Reports";
export const metadata: Metadata = {
  title: "Canadian Health Care Crisis",
  description: "Learn Dire State of Canadian Health Crisis",
};

export default function Home() {
  // const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <ScrollUp />

      <Hero />
      <Timeline />
      {/* <CallToAction /> */}
      <PublicEmailTool />
      {/* <Features /> */}
      {/* <Clients /> */}
      {/* <Faq />
      <Team /> */}
      <Reports />
      {/* <ReportList /> */}
      {/* <Horizontal/> */}
      {/* <Reports/>
      <ScrollingLogos/> */}
      {/* <ScrollUp />
      <Hero />
      <Features />
      <About />

      <Pricing />
      <Testimonials />
      <Faq />
      <Team />
      <HomeBlogSection posts={posts} />
      <Contact />
      <Clients /> */}
    </main>
  );
}
