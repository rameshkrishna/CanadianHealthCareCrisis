// components/HealthcareTable.js

import React from "react";

const data = [
  {
    quote:
      "“We don’t get pensions, we don’t get retirement funds, we don’t get insurance or sick days. We have to save up for our own retirement and for our own families,” said Canadian physician Dr. David Poon",
    source:
      "https://globalnews.ca/news/10435179/captial-gains-budget-2024-family-doctors/",
  },
  {
    quote:
      "“The vast majority of family doctors and just doctors in general in Canada are practicing through what’s called a professional corporation,” explained Don Carson, a chartered accountant.",
    source:
      "https://globalnews.ca/news/10435179/captial-gains-budget-2024-family-doctors/",
  },
  {
    quote:
      "Dr. Poon added: “This is an affront to doctors. It is grossly inappropriate to lump us in with these ultra wealthy.”",
    source:
      "https://globalnews.ca/news/10435179/captial-gains-budget-2024-family-doctors/",
  },
  {
    quote:
      "Federal government’s capital gains increase could impact access to care for Ontarians",
    source:
      "https://www.oma.org/newsroom/news/2024/april/federal-governments-capital-gains-increase-could-impact-access-to-care-for-Ontarians/",
  },
  {
    quote:
      "“It is fair to ask those who are doing really well to contribute a little bit more,” -- Freeland",
    source:
      "https://globalnews.ca/news/10443557/capital-gains-tax-budget-2024-cma/",
  },
  {
    quote:
      "Dr. Andrew Park, president of the Ontario Medical Association, said Tuesday that the changes come at a time when governments at all levels should be working towards solving a shortage of family doctors in Canada, not disincentivizing physicians from starting new practices.",
    source:
      "https://globalnews.ca/news/10443557/capital-gains-tax-budget-2024-cma/",
  },
  {
    quote:
      "“I understand there are those who’ve been very, very successful off the way the system used to be who don’t want to see the system changed,” Trudeau said at an event in Saskatoon. “But this is about intergenerational fairness. It’s also about making sure our economy succeeds into the future.” -- PM Justin",
    source:
      "https://globalnews.ca/news/10443557/capital-gains-tax-budget-2024-cma/",
  },
];

const HealthcareTable = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100">
            Addressing Healthcare Issues
          </h2>
          <p className="mt-2 text-lg leading-6 text-gray-600 dark:text-gray-400">
            Critical insights and statements regarding healthcare wait times in
            Canada.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-normal px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {item.quote}
                    </div>
                    <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.source}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HealthcareTable;
