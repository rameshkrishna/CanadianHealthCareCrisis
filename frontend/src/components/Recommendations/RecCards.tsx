// components/LandingPage.js

import React from "react";

const RecCards = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white">
      <section
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490623970972-ae8bb3da443e')",
        }}
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

      <section
        id="recommendations"
        className="bg-white py-16 dark:bg-gray-900 dark:text-white"
      >
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">
            CMA's Recommendations
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Resolve the Attachment Crisis
              </h3>
              <p>
                22% of adults in Canada do not have a regular family doctor or
                nurse practitioner. We need to ensure everyone has access to
                primary care.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Expand Team-Based Primary Care
              </h3>
              <p>
                Increase access to care, reduce clinician burnout, and provide
                holistic care while involving the community in the oversight of
                care.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Enable Patient Access to Health Records
              </h3>
              <p>
                Guarantee privacy, data security, and portability of health
                records for patients.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Expand Virtual Care
              </h3>
              <p>
                Integrate virtual care with in-person care to improve
                accessibility and equity, especially in rural and remote
                communities.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Improve Accountability
              </h3>
              <p>
                Strengthen community governance, educate the public on patient
                rights, and empower patient advocacy organizations.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Ensure Equity in Primary Care
              </h3>
              <p>
                Address racism and discrimination, provide language-concordant
                care, integrate Indigenous models of care, and remove
                accessibility barriers.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Expand Primary Care Coverage
              </h3>
              <p>
                Include dental care, eye care, prescription medications,
                physiotherapy, and mental health care in primary care coverage.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-semibold">
                Grow the Primary Care Workforce
              </h3>
              <p>
                Accelerate the licensing of foreign-trained health care
                professionals, train, recruit, and retain more primary care
                workers, and create a representative workforce.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecCards;
