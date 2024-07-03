import React from "react";
interface Report {
  title: string;
  siteName: string;
  url: string;
}

const reports: Report[] = [
  {
    title:
      "ADDRESSING CANADA’S HEALTH WORKFORCE CRISIS\nReport of the Standing Committee on Health",
    siteName: "ourcommons",
    url: "https://www.ourcommons.ca/Content/Committee/441/HESA/Reports/RP12260300/hesarp10/hesarp10-e.pdf",
  },
  {
    title:
      "Waiting Your Turn\nWait Times for Health Care in Canada, 2023 Report\nMackenzie Moir and Bacchus Barua with Hani Wannamaker",
    siteName: "fraserinstitute",
    url: "https://www.fraserinstitute.org/sites/default/files/waiting-your-turn-2023.pdf",
  },
  {
    title: "Health at a Glance 2023\nOECD Indicators",
    siteName: "OECD",
    url: "https://www.oecd.org/en/publications/health-at-a-glance-2023_7a7afb35-en/full-report.html",
  },
  {
    title: "Submission to the House of Commons Standing Committee on Finance",
    siteName: "CMA",
    url: "https://policybase.cma.ca/viewer?file=%2Fmedia%2FBriefPDF%2FBR2023-05.pdf#page=1",
  },
  {
    title:
      "Health Human Resource Policy Recommendations: SummaryBriefing to the House of Commons Standing Committee on HealthApril 14, 2022",
    siteName: "CMA, CNA, CFPC",
    url: "https://policybase.cma.ca/viewer?file=%2Fmedia%2FBriefPDF%2FBR2022-11.pdf&_gl=1*1yr1tfl*_ga*NTg3MTc1NTUyLjE3MTE1NjczOTE.*_ga_91NZ7HZZ51*MTcxNTc2OTM5MS40LjEuMTcxNTc2OTQxMS40MC4wLjA.#page=1",
  },
  {
    title: "OurCare Reports",
    siteName: "OurCare",
    url: "https://www.ourcare.ca/reports",
  },
];
interface ReportCardProps {
  report: Report;
}

const ReportCard: React.FC<ReportCardProps> = ({ report }) => (
  <div className="rounded-lg bg-gray-800 p-6 text-white shadow-lg transition duration-300 hover:bg-gray-700">
    <h2 className="mb-2 text-xl font-bold">{report.title}</h2>
    <p className="mb-4 text-gray-400">{report.siteName}</p>
    <a
      href={report.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:underline"
    >
      View Report
    </a>
  </div>
);

const ReportList: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center space-y-6 bg-gray-900 px-5 py-10">
    {reports.map((report, index) => (
      <ReportCard key={index} report={report} />
    ))}
  </div>
);

export default ReportList;
