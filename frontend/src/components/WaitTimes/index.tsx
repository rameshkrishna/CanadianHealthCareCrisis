import React from "react";

const WaitTimes = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Median wait time */}
        <div className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Median Wait Time</h2>
          <p className="text-4xl font-bold">27.7 weeks</p>
          <p className="text-sm">From referral to treatment</p>
        </div>

        {/* Shortest wait time province */}
        <div className="rounded-lg bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Shortest Wait Time</h2>
          <p className="text-4xl font-bold">21.6 weeks</p>
          <p className="text-sm">(Ontario)</p>
        </div>

        {/* Longest wait time province */}
        <div className="rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Longest Wait Time</h2>
          <p className="text-4xl font-bold">56.7 weeks</p>
          <p className="text-sm">(Nova Scotia)</p>
        </div>

        {/* Wait time for CT scan */}
        <div className="rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Wait Time for CT Scan</h2>
          <p className="text-4xl font-bold">6.6 weeks</p>
        </div>

        {/* Wait time for MRI scan */}
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Wait Time for MRI Scan</h2>
          <p className="text-4xl font-bold">12.9 weeks</p>
        </div>

        {/* Wait time for ultrasound */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">
            Wait Time for Ultrasound
          </h2>
          <p className="text-4xl font-bold">5.3 weeks</p>
        </div>

        {/* Emergency Visits */}
        <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">Emergency Visits</h2>
          <p className="text-4xl font-bold">15.1 million visits</p>
          <p className="text-sm">In 2022-2023</p>
        </div>

        {/* Lack of Family Physician */}
        <div className="rounded-lg bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">
            Lack of Family Physician
          </h2>
          <p className="text-4xl font-bold">Approx. 6 Million People</p>
          <p className="text-sm">In Canada</p>
        </div>

        {/* Physicians per 1,000 population */}
        <div className="rounded-lg bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white shadow-lg ">
          <h2 className="mb-2 text-lg font-semibold">
            Physicians per 1,000 Population
          </h2>
          <p className="text-4xl font-bold">2.7 physicians</p>
          <p className="text-sm">
            Compared to OECD average of 3.5 (2017 or nearest year)
          </p>
        </div>
      </div>
      {/* Disclaimer */}
      <div className="px-8 py-4 text-center">
        <p className="text-sm text-white">
          Sources:
          <a
            href="https://www.cma.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-blue-300 hover:text-blue-500"
          >
            CMA
          </a>
          |
          <a
            href="https://www.cihi.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-blue-300 hover:text-blue-500"
          >
            CIHI
          </a>
          |
          <a
            href="https://ourcare.ca"
            className="mx-2 text-blue-300 hover:text-blue-500"
          >
            OurCare.ca
          </a>
          |
          <a
            href="https://www.fraserinstitute.org/"
            className="mx-2 text-blue-300 hover:text-blue-500"
          >
            Fraser Institute
          </a>
          |
          <a
            href="https://www.ourcommons.ca/en"
            className="mx-2 text-blue-300 hover:text-blue-500"
          >
            OurCommons
          </a>
        </p>
      </div>
    </>
  );
};

export default WaitTimes;
