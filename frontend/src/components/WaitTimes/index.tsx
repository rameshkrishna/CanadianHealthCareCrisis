import React from 'react';

const WaitTimes = () => {
  return (<>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Median wait time */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Median Wait Time</h2>
        <p className="text-4xl font-bold">27.7 weeks</p>
        <p className="text-sm">From referral to treatment</p>
      </div>

      {/* Shortest wait time province */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Shortest Wait Time</h2>
        <p className="text-4xl font-bold">21.6 weeks</p>
        <p className="text-sm">(Ontario)</p>
      </div>

      {/* Longest wait time province */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Longest Wait Time</h2>
        <p className="text-4xl font-bold">56.7 weeks</p>
        <p className="text-sm">(Nova Scotia)</p>
      </div>

      {/* Wait time for CT scan */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Wait Time for CT Scan</h2>
        <p className="text-4xl font-bold">6.6 weeks</p>
      </div>

      {/* Wait time for MRI scan */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Wait Time for MRI Scan</h2>
        <p className="text-4xl font-bold">12.9 weeks</p>
      </div>

      {/* Wait time for ultrasound */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Wait Time for Ultrasound</h2>
        <p className="text-4xl font-bold">5.3 weeks</p>
      </div>

      {/* Emergency Visits */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Emergency Visits</h2>
        <p className="text-4xl font-bold">15.1 million visits</p>
        <p className="text-sm">In 2022-2023</p>
      </div>

      {/* Lack of Family Physician */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Lack of Family Physician</h2>
        <p className="text-4xl font-bold">Approx. 6 Million People</p>
        <p className="text-sm">In Canada</p>
      </div>

      {/* Physicians per 1,000 population */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-lg shadow-lg text-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-lg font-semibold mb-2">Physicians per 1,000 Population</h2>
        <p className="text-4xl font-bold">2.7 physicians</p>
        <p className="text-sm">Compared to OECD average of 3.5 (2017 or nearest year)</p>
      </div>
    </div>
    {/* Disclaimer */}
    <div className="py-4 px-8 text-center">
    <p className="text-sm text-white">
      Sources:
      <a href="https://www.cma.ca" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 mx-2">CMA</a>|<a href="https://www.cihi.ca" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500 mx-2">CIHI</a>|<a href="https://ourcare.ca" className="text-blue-300 hover:text-blue-500 mx-2">OurCare.ca</a>|<a href="https://www.fraserinstitute.org/" className="text-blue-300 hover:text-blue-500 mx-2">Fraser Institute</a>
    </p>
  </div>
        </>
  );
};

export default WaitTimes;