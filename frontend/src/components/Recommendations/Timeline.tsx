import React from 'react';
import { FaCircle } from 'react-icons/fa';

interface Recommendation {
  title: string;
  description: string;
}

const recommendations: Recommendation[] = [
  {
    title: "Resolve the Attachment Crisis",
    description: "22% of adults in Canada do not have a regular family doctor or nurse practitioner. We need to ensure everyone has access to primary care."
  },
  {
    title: "Expand Team-Based Primary Care",
    description: "Increase access to care, reduce clinician burnout, and provide holistic care while involving the community in the oversight of care."
  },
  {
    title: "Enable Patient Access to Health Records",
    description: "Guarantee privacy, data security, and portability of health records for patients."
  },
  {
    title: "Expand Virtual Care",
    description: "Integrate virtual care with in-person care to improve accessibility and equity, especially in rural and remote communities."
  },
  {
    title: "Improve Accountability",
    description: "Strengthen community governance, educate the public on patient rights, and empower patient advocacy organizations."
  },
  {
    title: "Ensure Equity in Primary Care",
    description: "Address racism and discrimination, provide language-concordant care, integrate Indigenous models of care, and remove accessibility barriers."
  },
  {
    title: "Expand Primary Care Coverage",
    description: "Include dental care, eye care, prescription medications, physiotherapy, and mental health care in primary care coverage."
  },
  {
    title: "Grow the Primary Care Workforce",
    description: "Accelerate the licensing of foreign-trained health care professionals, train, recruit, and retain more primary care workers, and create a representative workforce."
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
        <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
          <FaCircle className="text-sm" />
        </div>
        <div className="ml-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full">
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="absolute top-0 left-5 h-full border-l-4 border-blue-600"></div>
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
      <section className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/hero/component-bg.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full flex items-center">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Transforming Canada's Health Care System</h2>
            <p className="text-xl mb-6">Discover the Canadian Medical Association's recommendations to improve primary care for all Canadians.</p>
            <a href="#recommendations" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</a>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="py-16 bg-white dark:bg-gray-900 dark:text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">CMA's Recommendations</h2>
          <div className="space-y-8">
            {recommendations.map((rec, index) => (
              <TimelineItem key={index} title={rec.title} description={rec.description} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Timeline;
