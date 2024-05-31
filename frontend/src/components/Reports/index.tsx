import Link from "next/link";
import { FC } from "react";

const Reports: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
          <Link
            href="https://www.cma.ca/research-and-policies/reports"
            className="block text-center"
          >
            <div className="flex flex-col items-center">
              <div className="mb-3 text-purple-600 dark:text-purple-400">
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8a1 1 0 112 0v4a1 1 0 01-2 0V8zm1 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                CMA Report
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore the detailed report on issues and challenges in the
                Canadian Health Care System.
              </p>
              <span className="mt-4 inline-block text-purple-600 dark:text-purple-400">
                Read More &gt;
              </span>
            </div>
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
          <Link href="https://CIHI.ca/report.pdf" className="block text-center">
            <div className="flex flex-col items-center">
              <div className="mb-3 text-green-600 dark:text-green-400">
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8a1 1 0 112 0v4a1 1 0 01-2 0V8zm1 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                CIHI Report
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore the detailed report on issues and challenges in the
                Canadian Health Care System.
              </p>
              <span className="mt-4 inline-block text-green-600 dark:text-green-400">
                Read More &gt;
              </span>
            </div>
          </Link>
        </div>
        <div className="rounded-lg bg-white p-6 shadow transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
          <Link
            href="https://OurCare.ca/report.pdf"
            className="block text-center"
          >
            <div className="flex flex-col items-center">
              <div className="mb-3 text-red-600 dark:text-red-400">
                <svg
                  className="h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8a1 1 0 112 0v4a1 1 0 01-2 0V8zm1 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Our Care Report
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Explore the detailed report on issues and challenges in the
                Canadian Health Care System.
              </p>
              <span className="mt-4 inline-block text-red-600 dark:text-red-400">
                Read More &gt;
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reports;
