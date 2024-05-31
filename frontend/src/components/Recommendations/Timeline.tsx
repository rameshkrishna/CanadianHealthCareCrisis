import React from "react";
import { FaCircle } from "react-icons/fa";

interface Recommendation {
  title: string;
  description: string;
}

const recommendations: Recommendation[] = [
  {
    title: "Resolve the Attachment Crisis",
    description:
      "22% of adults in Canada do not have a regular family doctor or nurse practitioner. We need to ensure everyone has access to primary care.",
  },
  {
    title: "Expand Team-Based Primary Care",
    description:
      "Increase access to care, reduce clinician burnout, and provide holistic care while involving the community in the oversight of care.",
  },
  {
    title: "Enable Patient Access to Health Records",
    description:
      "Guarantee privacy, data security, and portability of health records for patients.",
  },
  {
    title: "Expand Virtual Care",
    description:
      "Integrate virtual care with in-person care to improve accessibility and equity, especially in rural and remote communities.",
  },
  {
    title: "Improve Accountability",
    description:
      "Strengthen community governance, educate the public on patient rights, and empower patient advocacy organizations.",
  },
  {
    title: "Ensure Equity in Primary Care",
    description:
      "Address racism and discrimination, provide language-concordant care, integrate Indigenous models of care, and remove accessibility barriers.",
  },
  {
    title: "Expand Primary Care Coverage",
    description:
      "Include dental care, eye care, prescription medications, physiotherapy, and mental health care in primary care coverage.",
  },
  {
    title: "Grow the Primary Care Workforce",
    description:
      "Accelerate the licensing of foreign-trained health care professionals, train, recruit, and retain more primary care workers, and create a representative workforce.",
  },
];

interface TimelineItemProps {
  title: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, description }) => {
  return (
    <div className="relative mb-8">
      <div className="flex items-center">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <FaCircle className="text-sm" />
        </div>
        <div className="ml-4 w-full rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
          <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="absolute left-5 top-0 h-full border-l-4 border-blue-600"></div>
    </div>
  );
};

const Timeline: React.FC = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      {/* Hero Section */}
      {/* <Image
                      src={`/images/logo/logo-white.svg`}
                      alt="logo"
                      width={240}
                      height={30}
                      className="header-logo hidden w-full dark:block"
                    /> */}
      <section
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero/component-bg.jpg')" }}
      >
        <div className="flex h-full items-center bg-black bg-opacity-50">
          <div className="container mx-auto text-center text-white">
            <h2 className="mb-4 text-4xl font-bold">
              Transforming Canada's Health Care System
            </h2>
            <p className="mb-6 text-xl">
              Discover the Canadian Medical Association's recommendations to
              improve primary care for all Canadians.
            </p>
            <a
              href="#recommendations"
              className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section
        id="recommendations"
        className="bg-white py-16 dark:bg-gray-900 dark:text-white"
      >
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            CMA's Recommendations
          </h2>
          <div className="space-y-8">
            {recommendations.map((rec, index) => (
              <TimelineItem
                key={index}
                title={rec.title}
                description={rec.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Timeline;
