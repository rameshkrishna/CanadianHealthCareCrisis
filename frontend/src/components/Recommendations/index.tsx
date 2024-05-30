import React from "react";
import {
  FaUserMd,
  FaHandsHelping,
  FaFileMedical,
  FaLaptopMedical,
  FaRegClipboard,
  FaBalanceScale,
  FaTooth,
  FaUsers,
} from "react-icons/fa";

interface Recommendation {
  icon: React.ComponentType;
  title: string;
  description: string;
}

const recommendations: Recommendation[] = [
  {
    icon: FaUserMd,
    title: "Resolve the Attachment Crisis",
    description:
      "22% of adults in Canada do not have a regular family doctor or nurse practitioner. We need to ensure everyone has access to primary care.",
  },
  {
    icon: FaHandsHelping,
    title: "Expand Team-Based Primary Care",
    description:
      "Increase access to care, reduce clinician burnout, and provide holistic care while involving the community in the oversight of care.",
  },
  {
    icon: FaFileMedical,
    title: "Enable Patient Access to Health Records",
    description:
      "Guarantee privacy, data security, and portability of health records for patients.",
  },
  {
    icon: FaLaptopMedical,
    title: "Expand Virtual Care",
    description:
      "Integrate virtual care with in-person care to improve accessibility and equity, especially in rural and remote communities.",
  },
  {
    icon: FaRegClipboard,
    title: "Improve Accountability",
    description:
      "Strengthen community governance, educate the public on patient rights, and empower patient advocacy organizations.",
  },
  {
    icon: FaBalanceScale,
    title: "Ensure Equity in Primary Care",
    description:
      "Address racism and discrimination, provide language-concordant care, integrate Indigenous models of care, and remove accessibility barriers.",
  },
  {
    icon: FaTooth,
    title: "Expand Primary Care Coverage",
    description:
      "Include dental care, eye care, prescription medications, physiotherapy, and mental health care in primary care coverage.",
  },
  {
    icon: FaUsers,
    title: "Grow the Primary Care Workforce",
    description:
      "Accelerate the licensing of foreign-trained health care professionals, train, recruit, and retain more primary care workers, and create a representative workforce.",
  },
];

const Horizontal: React.FC = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <section
        id="recommendations"
        className="bg-white py-16 dark:bg-gray-900 dark:text-white"
      >
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            CMA's Recommendations
          </h2>
          <div className="flex space-x-8 overflow-x-scroll pb-8">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div
                  key={index}
                  className="flex min-w-[300px] flex-col items-center rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800"
                >
                  <Icon />
                  <h3 className="mb-2 text-2xl font-semibold">{rec.title}</h3>
                  <p className="text-center">{rec.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Horizontal;
