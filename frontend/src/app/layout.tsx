"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "next-themes";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import ToasterContext from "./api/contex/ToasetContex";
import { useEffect, useState } from "react";
import PreLoader from "@/components/Common/PreLoader";
// import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "nextjs-google-analytics";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html suppressHydrationWarning={true} className="!scroll-smooth" lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      {(process.env.NODE_ENV === "development" ||
        process.env.VERCEL_ENV === "preview") && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script
          data-project-id="1lxftfbJBRdsvBmnkYAkFmAMqucT5mcpf53Ij9Hh"
          data-is-production-environment="false"
          src="https://snippet.meticulous.ai/v1/meticulous.js"
        />
      )}
      <head />
      {/* <GoogleAnalytics gaId="G-SFDW8W0TZ0" /> */}
      {/* <GoogleTagManager gtmId="G-SFDW8W0TZ0" /> */}
      <GoogleAnalytics gaMeasurementId="G-SFDW8W0TZ0" trackPageViews />
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="dark"
          >
            <ToasterContext />

            <Header />

            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
