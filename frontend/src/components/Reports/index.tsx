import React from "react";

const reports = [
  {
    title:
      "Addressing Canada's Health Workforce Crisis Report of the Standing Committee on Health",
    siteName: "OurCommons",
    link: "https://www.ourcommons.ca/Content/Committee/441/HESA/Reports/RP12260300/hesarp10/hesarp10-e.pdf",
  },
  {
    title: "Submission to the House of Commons Standing Committee on Finance",
    siteName: "CMA",
    link: "https://policybase.cma.ca/viewer?file=%2Fmedia%2FBriefPDF%2FBR2023-05.pdf#page=1",
  },
  {
    title: "Canadian Institute for Health Information Reports",
    siteName: "CIHI",
    link: "https://www.cihi.ca/en/access-data-and-reports",
  },
  {
    title: "OurCare Reports",
    siteName: "OurCare",
    link: "https://www.ourcare.ca/reports",
  },
  {
    title:
      "Waiting Your Turn Wait Times for Health Care in Canada, 2023 Report Mackenzie Moir and Bacchus Barua with Hani Wannamaker",
    siteName: "Fraser Institute",
    link: "https://www.fraserinstitute.org/sites/default/files/waiting-your-turn-2023.pdf",
  },
  {
    title: "Health at a Glance 2023 OECD Indicators",
    siteName: "OECD",
    link: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en/full-report.html",
  },
  {
    title:
      "Primary care for all: lessons for Canada from peer countries with high primary care attachment",
    siteName: "CMAJ",
    link: "https://www.cmaj.ca/content/cmaj/195/47/E1628.full.pdf",
  },

  {
    title:
      "Health Human Resource Policy Recommendations: Summary Briefing to the House of Commons Standing Committee on Health April 14, 2022",
    siteName: "CMA, CNA, CFPC",
    link: "https://policybase.cma.ca/viewer?file=%2Fmedia%2FBriefPDF%2FBR2022-11.pdf&_gl=1*1yr1tfl*_ga*NTg3MTc1NTUyLjE3MTE1NjczOTE.*_ga_91NZ7HZZ51*MTcxNTc2OTM5MS40LjEuMTcxNTc2OTQxMS40MC4wLjA.#page=1",
  },
];

const Reports = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Health Reports and Studies</h1>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Report/Study Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Institution / Org Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {reports.map((report, index) => (
              <tr key={index}>
                <td className="px-6 py-4">
                  <a
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-blue-600 transition-all duration-300 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
                  >
                    {report.title}
                  </a>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {report.siteName}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
