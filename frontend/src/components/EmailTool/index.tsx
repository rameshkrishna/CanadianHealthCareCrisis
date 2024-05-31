"use client";
import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { sendGTMEvent } from "@next/third-parties/google";
// Define the validation schema
const formSchema = z.object({
  issues: z.string().nonempty("Issues are required"),
  tone: z.enum(["formal", "friendly", "neutral"]),
  followup: z.enum(["Yes", "No"]),
  province: z.string().nonempty("Province is required"),
  city: z.string().nonempty("City is required"),
  isDoctor: z.boolean(),
  profession: z.string().optional(),
  experience: z.string().optional(),
  language: z.enum(["en", "fr"]),
  endpoint: z.enum(["Google", "OpenAI"]),
});

const PublicEmailTool: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [data, setData] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [issues, setIssues] = useState<string>("");
  const [tone, setTone] = useState<string>("neutral");
  const [followup, setFollowup] = useState<string>("Yes");
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [language, setLanguage] = useState<string>("en"); // Default language is English
  const [endpoint, setEndpoint] = useState<string>("Google"); // Default endpoint is Google

  const [errors, setErrors] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [cookiesEnabled, setCookiesEnabled] = useState<boolean>(true);

  const dataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if cookies are enabled
    const checkCookiesEnabled = () => {
      document.cookie = "testcookie";
      setCookiesEnabled(document.cookie.indexOf("testcookie") !== -1);
    };

    checkCookiesEnabled();

    // Fetch CSRF token on component mount
    const fetchCsrfToken = async () => {
      if (cookiesEnabled) {
        const response = await fetch(
          "https://api.sharknode.workers.dev/generate-token",
          {
            credentials: "include",
          },
        );
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      }
    };

    fetchCsrfToken();
  }, [cookiesEnabled]);

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

  const handleButtonClick = async () => {
    if (isStreaming || !csrfToken) {
      return; // Don't allow starting multiple streams simultaneously or without CSRF token
    }

    // Clear existing data when starting a new stream
    setData("");

    // Validate the form data
    const result = formSchema.safeParse({
      issues,
      tone,
      followup,
      province,
      city,
      isDoctor,
      profession,
      experience,
      language,
      endpoint,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    const queryParams = new URLSearchParams({
      issues,
      tone,
      followup,
      province,
      city,
      language,
      isDoctor: isDoctor.toString(),
      profession,
      experience,
    }).toString();

    const url =
      endpoint === "Google"
        ? `https://api.sharknode.workers.dev/LangChainGooglePrompt?${queryParams}`
        : `https://api.sharknode.workers.dev/langChainPrompt?${queryParams}`;
    setIsStreaming(true);
    sendGTMEvent({ event: "Streaming Start", value: "Streaming Start" });
    let allSources = "<br>All Sources: </br>"; // Initialize a variable to store all sources
    await fetchEventSource(url, {
      headers: {
        "X-CSRF-Token": csrfToken,
      },
      credentials: "include", // Ensure cookies are sent with the request
      onmessage(event) {
        console.log(event.data);
        const eventData = JSON.parse(event.data);
        if (eventData.status === "DONE") {
          setData((prevData: string) => prevData + allSources);
          setIsStreaming(false);
          sendGTMEvent({ event: "Streaming Done", value: "Streaming Done" });
          return;
        }
        if (eventData.response) {
          setData(
            (prevData: string) =>
              prevData + eventData.response.replaceAll("\n", "<br>"),
          );
        }
        const formattedSource = eventData.source;
        if (formattedSource) {
          allSources += formattedSource + "<br>"; // Accumulate sources
        }
      },
      onclose() {
        setIsStreaming(false);
      },
      onerror(err) {
        sendGTMEvent({ event: "Streaming Error", value: "Streaming Error" });
        console.error("EventSource failed:", err);
        setIsStreaming(false);
      },
    });
  };

  return (
    <div className="mx-auto mt-8 max-w-4xl rounded-lg from-transparent to-gray-100 p-6 shadow-lg dark:from-black dark:to-black">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Use this tool to Demand MP/MPP to take Action on Health Care
      </h1>

      <p className="mb-4 text-sm text-gray-500">
        Disclaimer: The content of the email is generated by AI. Please review
        before sending to MPs and modify as needed.
      </p>

      {!cookiesEnabled && (
        <div className="mb-4 rounded-md bg-red-200 p-2 text-red-700">
          Cookies are disabled in your browser. Please enable cookies to use
          this tool.
        </div>
      )}

      <label
        htmlFor="endpoint"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Select Endpoint:
      </label>
      <select
        id="endpoint"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Google">Google Endpoint</option>
        <option value="OpenAI">OpenAI Endpoint</option>
      </select>

      {errors.endpoint && (
        <p className="text-sm text-red-600">{errors.endpoint}</p>
      )}

      <label
        htmlFor="issues"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Enter your Key Issues With Canadian Health Care System:
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
        disabled={!cookiesEnabled}
      />
      {errors.issues && <p className="text-sm text-red-600">{errors.issues}</p>}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
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
            disabled={!cookiesEnabled}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          {errors.language && (
            <p className="text-sm text-red-600">{errors.language}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="tone"
            className="mb-2 block text-balance text-lg font-semibold"
          >
            Tone:
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="neutral">Neutral</option>
          </select>
          {errors.tone && <p className="text-sm text-red-600">{errors.tone}</p>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="province"
            className="mb-2 block text-balance text-lg font-semibold"
          >
            Province:
          </label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.province && (
            <p className="text-sm text-red-600">{errors.province}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-balance text-lg font-semibold"
          >
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
        </div>
      </div>

      <label
        htmlFor="isDoctor"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Are you a doctor?
      </label>
      <select
        id="isDoctor"
        value={isDoctor.toString()}
        onChange={(e) => setIsDoctor(e.target.value === "true")}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      {isDoctor && (
        <>
          <label
            htmlFor="profession"
            className="mb-2 mt-4 block text-balance text-lg font-semibold"
          >
            Profession:
          </label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.profession && (
            <p className="text-sm text-red-600">{errors.profession}</p>
          )}
          <label
            htmlFor="experience"
            className="mb-2 mt-4 block text-balance text-lg font-semibold"
          >
            Experience:
          </label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.experience && (
            <p className="text-sm text-red-600">{errors.experience}</p>
          )}
        </>
      )}

      <label
        htmlFor="followup"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Demand Follow-up:
      </label>
      <select
        id="followup"
        value={followup}
        onChange={(e) => setFollowup(e.target.value)}
        className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {errors.followup && (
        <p className="text-sm text-red-600">{errors.followup}</p>
      )}

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <button
          onClick={handleButtonClick}
          disabled={isStreaming || !cookiesEnabled}
          className={`inline-flex flex-1 items-center justify-center rounded-md px-6 py-3 text-lg font-semibold transition duration-300 ${
            isStreaming || !cookiesEnabled
              ? "cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500 text-white" // Change color during streaming
              : "transform bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md ease-in-out hover:scale-105 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg"
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
            "Compose Email With AI"
          )}
        </button>

        <button
          onClick={() => setData("")}
          className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out hover:scale-105 hover:from-gray-600 hover:to-gray-700"
          disabled={!cookiesEnabled}
        >
          Clear Data
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out hover:from-gray-600 hover:to-gray-700"
          disabled={!cookiesEnabled}
        >
          Copy AI Email to Clipboard
        </button>
      </div>
      {showSuccessAlert && (
        <div className="mt-4 rounded-md bg-green-200 p-2 text-green-700">
          Data copied to clipboard successfully!
        </div>
      )}
      <div
        className="mt-6"
        ref={dataRef}
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </div>
  );
};

export default PublicEmailTool;
