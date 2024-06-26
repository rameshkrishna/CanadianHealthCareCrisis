"use client";
import React, { useState, useRef } from "react";

const ResearchTool: React.FC = () => {
  const [data, setData] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [issues, setIssues] = useState<string>("");
  const [language, setLanguage] = useState<string>("en-CA"); // Default language is English
  const [model, setmodel] = useState<string>("Google"); // Default model is Google

  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

  const dataRef = useRef<HTMLDivElement>(null);

  const handleCopyToClipboard = () => {
    if (dataRef.current) {
      const range = document.createRange();
      range.selectNode(dataRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
      setShowSuccessAlert(true); // Show success alert
      setTimeout(() => setShowSuccessAlert(false), 3000); // Hide alert after 2 seconds
    }
  };

  const handleButtonClick = () => {
    if (isStreaming) {
      return; // Don't allow starting multiple streams simultaneously
    }

    // Clear existing data when starting a new stream
    setData("");

    const queryParams = new URLSearchParams({
      issues,
      language,
      model,
    }).toString();

    const url = `https://api.canadianhealthcarecrisis.com/Analysis?${queryParams}`;

    const source = new EventSource(url);
    setIsStreaming(true);
    let allSources = "<br>All Sources: </br>"; // Initialize a variable to store all sources
    source.onmessage = (event) => {
      console.log(event.data);
      const eventData = JSON.parse(event.data);
      if (eventData.status === "DONE") {
        // SSE spec says the connection is restarted if we don't explicitly close it
        source.close();
        setIsStreaming(false);
        // Append all sources to prevData after response is completed
        setData((prevData: string) => prevData + allSources);
        return;
      }
      let formattedData = "";

      const formattedSource = eventData.source;
      if (eventData.response) {
        formattedData = eventData.response
          .replaceAll("\n", "<br>")
          .replaceAll("**", "");
      }
      if (formattedSource) {
        allSources += formattedSource + "<br>"; // Accumulate sources
      }

      setData((prevData: string) => prevData + formattedData);
    };
  };

  return (
    <section className="relative z-20 overflow-hidden bg-white pb-8 pt-20 dark:bg-dark lg:pb-[50px] lg:pt-[120px]">
      <div className="container">
        <div className="relative overflow-hidden">
          <div className="mx-auto mt-8 max-w-4xl rounded-lg from-transparent to-gray-100 p-6 shadow-lg dark:from-black dark:to-black">
            <h1 className="mb-6 text-center text-2xl font-bold">
              Use this tool to Demand MP/MPP to take Action on Health Care
            </h1>

            <p className="mb-4 text-sm text-gray-500">
              Disclaimer: The content of the email is generated by AI. Please
              review before sending to MPs and modify as needed.
            </p>
            <br />
            <label
              htmlFor="model"
              className="mb-2 mt-4 block text-balance text-lg font-semibold"
            >
              Select model:
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setmodel(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="Google">Google model</option>
              <option value="OpenAI">OpenAI model</option>
            </select>
            <br />
            <br />
            <label
              htmlFor="issues"
              className="mb-2 block text-balance text-lg font-semibold"
            >
              Enter your Key Issues With Canadain Health Care System:
            </label>
            <div className="flex flex-wrap gap-2">
              {issues.split(",").map((issue, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-md bg-blue-500 px-2 py-1 text-sm text-white"
                >
                  {issue.trim()}
                </div>
              ))}
            </div>
            <input
              type="text"
              id="issues"
              placeholder="Example: Waiting Times, Shortage of Family Doctors, No MRI Machines"
              value={issues}
              onChange={(e) => setIssues(e.target.value)}
              className="mt-4 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            />

            <br />
            <label
              htmlFor="language"
              className="mb-2 block text-balance text-lg font-semibold"
            >
              Language:
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
            <br />
            <br />
            <button
              onClick={handleButtonClick}
              disabled={isStreaming}
              className={`inline-flex items-center rounded-md px-6 py-3 text-lg font-semibold transition duration-300 ${
                isStreaming
                  ? "dark:text-white-200 cursor-not-allowed bg-green-500 text-white" // Change color during streaming
                  : "transform bg-blue-500 text-white shadow-md ease-in-out hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
              }`}
            >
              {isStreaming ? (
                <>
                  <svg
                    className="mr-2 h-7 w-7 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="4"
                      className="opacity-45"
                    />
                    <path
                      fill="#ffffff"
                      d="M14.31 8l-4 4a1.999 1.999 0 0 0 0 2.83l4 4M9.69 16l4-4a1.999 1.999 0 0 0 0-2.83l-4-4"
                    />
                  </svg>
                  <span className="animate-pulse">Composing...</span>
                </>
              ) : (
                "Research"
              )}
            </button>

            <br />
            <button
              onClick={() => setData("")}
              className="mt-4 inline-block rounded bg-red-500 px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out hover:bg-red-700"
            >
              Clear Data
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="mt-4 inline-block rounded bg-green-500 px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out hover:bg-green-700"
            >
              Copy AI Generated Research to Clipboard
            </button>
            <div
              className="mt-6"
              ref={dataRef}
              dangerouslySetInnerHTML={{ __html: data }}
            ></div>
            {showSuccessAlert && (
              <div className="mt-4 rounded-md bg-green-200 p-2 text-green-700">
                Data copied to clipboard successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchTool;
