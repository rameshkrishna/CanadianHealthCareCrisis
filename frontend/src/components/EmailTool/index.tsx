"use client";
import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { event } from "nextjs-google-analytics";
import Papa from "papaparse";
import { vibrate } from "@/utils/vibrate";
import type { Contact } from "@/types/contact";
import { fetchContacts } from "@/utils/mpContacts";
import {
  MdOutlineContentCopy,
  MdPersonSearch,
  MdEmail,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import { fetchCsrfToken } from "@/utils/CsrfToken";
// Define the validation schema
const formSchema = z.object({
  issues: z.string().min(1, "Issues are required"),
  tone: z.enum(["formal", "friendly", "neutral"]),
  followup: z.enum(["Yes", "No"]),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  isDoctor: z.boolean(),
  profession: z.string().optional(),
  experience: z.string().optional(),
  language: z.enum(["en", "fr"]),
  endpoint: z.enum(["Google", "OpenAI"]),
  fromName: z.string().min(3, "Name must be at least 3 characters"),
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
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [toEmail, setToEmail] = useState<string>("");
  const [fromName, setFromName] = useState<string>("");
  const [mpName, setMPName] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showSuccessCopied, setSuccessShowCopied] = useState<boolean>(false);
  const [cookiesEnabled, setCookiesEnabled] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dataRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if cookies are enabled
    const checkCookiesEnabled = () => {
      document.cookie = "testcookie";
      setCookiesEnabled(document.cookie.indexOf("testcookie") !== -1);
    };

    checkCookiesEnabled();
  }, []);

  useEffect(() => {
    if (cookiesEnabled && !csrfToken) {
      fetchCsrfToken(setCsrfToken);
    }
  }, [cookiesEnabled, csrfToken]);

  useEffect(() => {
    if (csrfToken) {
      fetchContacts(csrfToken, setContacts);
    }
  }, [csrfToken]);
  const handleCopyToClipboard = () => {
    if (dataRef.current) {
      const range = document.createRange();
      range.selectNode(dataRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      navigator.clipboard
        .writeText(dataRef.current.textContent ?? "")
        .then(() => {
          setShowSuccessAlert(true); // Show success alert
          setTimeout(() => setShowSuccessAlert(false), 3000); // Hide alert after 3 seconds
          event("streaming_copy", {
            category: "Email",
            label: "CopyEmailContent",
          });
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
      window.getSelection()?.removeAllRanges();
    }
  };

  const handleEmailCopyToClipboard = () => {
    navigator.clipboard.writeText(toEmail).then(() => {
      setSuccessShowCopied(true); // Show success alert
      setTimeout(() => setSuccessShowCopied(false), 3000); // Hide alert after 3 seconds
      event("CopyEmailID", {
        category: "Email",
        label: "CopyEmailID",
      });
    });
  };

  const handleStreaming = async () => {
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
      fromName,
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
      vibrate([200, 100, 200]); // Vibrate pattern: 200ms on, 100ms off, 200ms on
      // Scroll to the form errors
      const DemandActionNow = document.getElementById("DemandActionNow");
      if (DemandActionNow) {
        DemandActionNow.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setErrors({}); // Clear previous errors

    const queryParams = new URLSearchParams({
      issues,
      tone,
      followup,
      fromName,
      province,
      city,
      language,
      isDoctor: isDoctor.toString(),
      profession,
      experience,
      mpName,
    }).toString();

    const url =
      endpoint === "Google"
        ? `https://api.canadianhealthcarecrisis.com/LangChainGooglePrompt?${queryParams}`
        : `https://api.canadianhealthcarecrisis.com/langChainPrompt?${queryParams}`;
    setIsStreaming(true);

    event("streaming_start", {
      category: "Email",
      label: "Streaming",
    });
    let allSources = "<br><br><br>Sources: <br>"; // Initialize a variable to store all sources
    const uniqueSources = new Set();
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
          return;
        }
        if (eventData.response) {
          setData(
            (prevData: string) =>
              prevData + eventData.response.replaceAll("\n", "<br>"),
          );
          vibrate([50]); // Vibrate pattern to indicate streaming start
          // Scroll the content into view
          const StreamingContent = document.getElementById("streaming-end");
          if (StreamingContent) {
            StreamingContent.scrollIntoView({ behavior: "smooth" });
          }
        }
        const formattedSource = eventData.source;
        if (formattedSource && !uniqueSources.has(formattedSource)) {
          uniqueSources.add(formattedSource);
          allSources +=
            "<li className='text-xs leading-tight py-1 px-2 rounded'>" +
            eventData.title +
            " | " +
            formattedSource +
            "</li>";
        }
      },
      onclose() {
        setIsStreaming(false);
        event("streaming_closed", {
          category: "Email",
          label: "Close",
        });
      },
      onerror(err) {
        console.error("EventSource failed:", err);
        setIsStreaming(false);
        event("streaming_error", {
          category: "Email",
          label: "Error",
        });
      },
    });
  };

  const handleSendEmail = () => {
    if (isStreaming || !csrfToken) {
      return; // Wait until streaming is done | reject
    }
    let body = data
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/?li\s*\/?>/gi, "\n");
    const regex = /Subject:\s*(.*)/;
    const match = body.match(regex);
    let subject = "";
    if (match) {
      subject = match[1].trim();
      body = body.replace(regex, "");
    }
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const filteredContacts = contacts.filter((contact) => {
    const query = searchQuery.toLowerCase();
    return (
      contact.Name.toLowerCase().includes(query) ||
      contact.ProvinceTerritory.toLowerCase().includes(query) ||
      contact.Constituency.toLowerCase().includes(query)
    );
  });

  return (
    <div
      id="DemandActionNow"
      className="mx-auto mt-8 max-w-4xl rounded-lg from-transparent to-gray-100 p-6 shadow-lg dark:from-black dark:to-black"
    >
      <h1 className="mb-6 text-center font-bold">
        Use this tool to Demand your MP / MPP/ MLA to take Action on Health Care
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
        Select Email Composition Tool:
      </label>
      <select
        id="endpoint"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Google">Google Tool</option>
        <option value="OpenAI">OpenAI Tool</option>
      </select>
      {errors.endpoint && (
        <p className="text-sm text-red-600">{errors.endpoint}</p>
      )}
      <label
        htmlFor="issues"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Key Issues With Canadian Health Care System:
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
        placeholder="E.g., Waiting Times, Shortage of Family Doctors, No MRI Machines"
        value={issues}
        onChange={(e) => setIssues(e.target.value)}
        className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      />
      {errors.issues && <p className="text-sm text-red-600">{errors.issues}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-balance text-lg font-semibold"
          >
            Preferred Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
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
            Tone of the Email:
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="neutral">Neutral</option>
          </select>
          {errors.tone && <p className="text-sm text-red-600">{errors.tone}</p>}
        </div>
      </div>
      <label
        htmlFor="fromName"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Your Name:
      </label>
      <input
        type="text"
        id="fromName"
        value={fromName}
        onChange={(e) => setFromName(e.target.value)}
        className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      />
      {errors.fromName && (
        <p className="text-sm text-red-600">{errors.fromName}</p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="province"
            className="mb-2 block text-balance text-lg font-semibold"
          >
            Province:
          </label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          >
            <option value="">Select a province</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="MB">Manitoba</option>
            <option value="NB">New Brunswick</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="NS">Nova Scotia</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
            <option value="QC">Quebec</option>
            <option value="SK">Saskatchewan</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
            <option value="YT">Yukon</option>
          </select>
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
            className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
        </div>
      </div>
      <label
        htmlFor="isDoctor"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Do you work in the Health Sector?
      </label>
      <select
        id="isDoctor"
        value={isDoctor.toString()}
        onChange={(e) => setIsDoctor(e.target.value === "true")}
        className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      {isDoctor && (
        <>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
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
                className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
                disabled={!cookiesEnabled}
              />
              {errors.profession && (
                <p className="text-sm text-red-600">{errors.profession}</p>
              )}
            </div>
            <div>
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
                className="mt-4 w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
                disabled={!cookiesEnabled}
              />
              {errors.experience && (
                <p className="text-sm text-red-600">{errors.experience}</p>
              )}
            </div>
          </div>
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
        className="w-full rounded-md bg-gray-50 px-4 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {errors.followup && (
        <p className="text-sm text-red-600">{errors.followup}</p>
      )}
      <label
        htmlFor="searchQuery"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Search MP by Name or Province/Territory:
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
          placeholder="Type MP's name or province/territory"
          disabled={!cookiesEnabled}
          autoComplete="off"
        />
        <MdPersonSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
      </div>
      {searchQuery && filteredContacts.length > 0 && (
        <ul className="mt-4 max-h-60 overflow-y-auto rounded-md bg-gray-50 p-2 text-xs shadow-sm dark:bg-gray-800 sm:max-h-40 sm:text-sm">
          {filteredContacts.map((contact, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick={() => {
                setSearchQuery(
                  contact.Name + " (" + contact.ProvinceTerritory + ")",
                );
                setToEmail(contact.Contact);
                setMPName(contact.Name);
              }}
            >
              {contact.Name} ({contact.Constituency} |{" "}
              {contact.ProvinceTerritory}) - {contact.Govt}
            </li>
          ))}
        </ul>
      )}
      <label
        htmlFor="toEmail"
        className="mb-2 mt-4 block text-balance text-lg font-semibold"
      >
        Copy Your MP/MPP/MLA's Email:
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="toEmail"
          value={toEmail}
          readOnly
          autoComplete="off"
          className="w-full cursor-not-allowed rounded-md bg-gray-50 px-4 py-2 pl-10 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
          placeholder="MP/MPP/MLA's Email will appear here"
        />
        <MdEmail className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
        <button
          onClick={handleEmailCopyToClipboard}
          className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300"
        >
          {showSuccessCopied ? (
            <MdOutlineLibraryAddCheck />
          ) : (
            <MdOutlineContentCopy />
          )}
        </button>
      </div>
      {errors.toEmail && (
        <p className="text-sm text-red-600">{errors.toEmail}</p>
      )}
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <button
          onClick={handleStreaming}
          disabled={isStreaming || !cookiesEnabled}
          className={`inline-flex flex-1 items-center justify-center rounded-md px-6 py-3 text-lg font-semibold transition duration-300 ${
            isStreaming || !cookiesEnabled
              ? "cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500 text-white" // Change color during streaming
              : "transform bg-gradient-to-r from-gray-700 to-gray-800 text-white"
          }`}
        >
          {isStreaming ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="animate-pulse">Composing...</span>
            </>
          ) : (
            "Compose Email With AI"
          )}
        </button>

        <button
          onClick={() => setData("")}
          className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white"
          disabled={isStreaming || !cookiesEnabled}
        >
          Clear Data
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white"
          disabled={isStreaming || !cookiesEnabled}
        >
          Copy AI Email to Clipboard
        </button>
        <button
          onClick={handleSendEmail}
          className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white transition-all duration-200 ease-in-out hover:from-gray-600 hover:to-gray-700"
          disabled={isStreaming || !cookiesEnabled}
        >
          Send Email
        </button>
      </div>
      {showSuccessAlert && (
        <div className="mt-4 rounded-md bg-green-200 p-2 text-green-700">
          Data copied to clipboard successfully!
        </div>
      )}
      <div
        className="break-word mt-6 max-w-full overflow-auto break-words "
        id="StreamingContent"
        ref={dataRef}
        // style={{ overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <div id="streaming-end">
        {/* {!isStreaming && (
          <button
            onClick={handleCopyToClipboard}
            className="inline-block flex-1 rounded bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-3 font-bold text-white"
            disabled={isStreaming || !cookiesEnabled}
          >
            <MdOutlineContentCopy />
          </button>
        )} */}
      </div>
    </div>
  );
};

export default PublicEmailTool;
