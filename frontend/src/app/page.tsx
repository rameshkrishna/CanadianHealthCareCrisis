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
import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";
import PublicEmailTool from "@/components/EmailTool";
import Horizontal from "@/components/Recommendations";
import Timeline from "@/components/Recommendations/Timeline";
import RecCards from "@/components/Recommendations/RecCards";
import MediaMentionsAboutHealthCare from "@/components/MediaMentionsAboutHealthCare";
import ScrollingLogos from "@/components/ScrollingLogos";

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
      <PublicEmailTool />
      <MediaMentionsAboutHealthCare />
      {/* <Horizontal/> */}
      {/* <Reports/>
      <ScrollingLogos/> */}
      {/* <ScrollUp />
      <Hero />
      <Features />
      <About />
      <CallToAction />
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
