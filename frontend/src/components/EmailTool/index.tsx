'use client'
import React, { useState, useRef, useEffect } from 'react';
import { z } from 'zod';
import { fetchEventSource } from '@microsoft/fetch-event-source';

// Define the validation schema
const formSchema = z.object({
  issues: z.string().nonempty('Issues are required'),
  tone: z.enum(['formal', 'friendly', 'neutral']),
  followup: z.enum(['Yes', 'No']),
  province: z.string().nonempty('Province is required'),
  city: z.string().nonempty('City is required'),
  isDoctor: z.boolean(),
  profession: z.string().optional(),
  experience: z.string().optional(),
  language: z.enum(['en', 'fr']),
  endpoint: z.enum(['Google', 'OpenAI']),
});

const PublicEmailTool: React.FC = () => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [data, setData] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [issues, setIssues] = useState<string>('');
  const [tone, setTone] = useState<string>('neutral');
  const [followup, setFollowup] = useState<string>('Yes');
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [profession, setProfession] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [language, setLanguage] = useState<string>('en'); // Default language is English
  const [endpoint, setEndpoint] = useState<string>('Google'); // Default endpoint is Google

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
        const response = await fetch('https://api.sharknode.workers.dev/generate-token', {
          credentials: 'include'
        });
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
      document.execCommand('copy');
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
    setData('');

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
      endpoint === 'Google'
        ? `https://api.sharknode.workers.dev/LangChainGooglePrompt?${queryParams}`
        : `https://api.sharknode.workers.dev/langChainPrompt?${queryParams}`;

    let allSources = '<br>All Sources: </br>'; // Initialize a variable to store all sources
    await fetchEventSource(url, {
      headers: {
        'X-CSRF-Token': csrfToken,
      },
      credentials: 'include', // Ensure cookies are sent with the request
      onmessage(event) {
        console.log(event.data);
        setIsStreaming(true);
        const eventData = JSON.parse(event.data);
        if (eventData.status === 'DONE') {
          setData((prevData: string) => prevData + allSources);
          setIsStreaming(false);
          return;
        }
        if (eventData.response) {
          setData((prevData: string) => prevData + eventData.response.replaceAll('\n', '<br>'));
        }
        const formattedSource = eventData.source;
        if (formattedSource) {
          allSources += formattedSource + '<br>'; // Accumulate sources
        }

      },
      onclose() {
        setIsStreaming(false);
      },
      onerror(err) {
        console.error("EventSource failed:", err);
        setIsStreaming(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg from-transparent to-gray-100 dark:from-black dark:to-black">
      <h1 className="text-2xl font-bold text-center mb-6">
        Use this tool to Demand MP/MPP to take Action on Health Care
      </h1>

      <p className="text-sm text-gray-500 mb-4">
        Disclaimer: The content of the email is generated by AI. Please review before sending to MPs and modify as needed.
      </p>

      {!cookiesEnabled && (
        <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
          Cookies are disabled in your browser. Please enable cookies to use this tool.
        </div>
      )}

      <label htmlFor="endpoint" className="block text-lg font-semibold mt-4 mb-2 text-balance">
        Select Endpoint:
      </label>
      <select
        id="endpoint"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Google">Google Endpoint</option>
        <option value="OpenAI">OpenAI Endpoint</option>
      </select>

      {errors.endpoint && <p className="text-red-600 text-sm">{errors.endpoint}</p>}

      <label htmlFor="issues" className="block text-lg font-semibold mt-4 mb-2 text-balance">
        Enter your Key Issues With Canadian Health Care System:
      </label>
      <div className="flex flex-wrap gap-2">
        {issues.split(',').map((issue, index) => (
          <div key={index} className="inline-flex items-center px-2 py-1 bg-blue-500 text-white rounded-md text-sm">
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
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      />
      {errors.issues && <p className="text-red-600 text-sm">{errors.issues}</p>}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="language" className="block text-lg font-semibold mb-2 text-balance">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          {errors.language && <p className="text-red-600 text-sm">{errors.language}</p>}
        </div>
        <div>
          <label htmlFor="tone" className="block text-lg font-semibold mb-2 text-balance">
            Tone:
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="neutral">Neutral</option>
          </select>
          {errors.tone && <p className="text-red-600 text-sm">{errors.tone}</p>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="province" className="block text-lg font-semibold mb-2 text-balance">
            Province:
          </label>
          <input
            type="text"
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.province && <p className="text-red-600 text-sm">{errors.province}</p>}
        </div>
        <div>
          <label htmlFor="city" className="block text-lg font-semibold mb-2 text-balance">
            City:
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
        </div>
      </div>

      <label htmlFor="isDoctor" className="block text-lg font-semibold mt-4 mb-2 text-balance">
        Are you a doctor?
      </label>
      <select
        id="isDoctor"
        value={isDoctor.toString()}
        onChange={(e) => setIsDoctor(e.target.value === 'true')}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      {isDoctor && (
        <>
          <label htmlFor="profession" className="block text-lg font-semibold mt-4 mb-2 text-balance">
            Profession:
          </label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.profession && <p className="text-red-600 text-sm">{errors.profession}</p>}
          <label htmlFor="experience" className="block text-lg font-semibold mt-4 mb-2 text-balance">
            Experience:
          </label>
          <input
            type="text"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-4 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            disabled={!cookiesEnabled}
          />
          {errors.experience && <p className="text-red-600 text-sm">{errors.experience}</p>}
        </>
      )}

      <label htmlFor="followup" className="block text-lg font-semibold mt-4 mb-2 text-balance">
        Demand Follow-up:
      </label>
      <select
        id="followup"
        value={followup}
        onChange={(e) => setFollowup(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        disabled={!cookiesEnabled}
      >
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      {errors.followup && <p className="text-red-600 text-sm">{errors.followup}</p>}

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button
          onClick={handleButtonClick}
          disabled={isStreaming || !cookiesEnabled}
          className={`flex-1 inline-flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-md transition duration-300 ${
            isStreaming || !cookiesEnabled
              ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed text-white' // Change color during streaming
              : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 ease-in-out'
          }`}
        >
          {isStreaming ? (
            <>
              <svg
                className="animate-spin h-7 w-7 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-45" />
                <path
                  fill="#ffffff"
                  d="M14.31 8l-4 4a1.999 1.999 0 0 0 0 2.83l4 4M9.69 16l4-4a1.999 1.999 0 0 0 0-2.83l-4-4"
                />
              </svg>
              <span className="animate-pulse">Composing...</span>
            </>
          ) : (
            'Compose Email With AI'
          )}
        </button>

        <button
          onClick={() => setData('')}
          className="flex-1 inline-block bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded transition-all duration-200 hover:scale-105 ease-in-out"
          disabled={!cookiesEnabled}
        >
          Clear Data
        </button>
        <button
          onClick={handleCopyToClipboard}
          className="flex-1 inline-block bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded transition-all duration-200 ease-in-out"
          disabled={!cookiesEnabled}
        >
          Copy AI Email to Clipboard
        </button>
      </div>
      {showSuccessAlert && (
        <div className="bg-green-200 text-green-700 p-2 rounded-md mt-4">
          Data copied to clipboard successfully!
        </div>
      )}
      <div className="mt-6" ref={dataRef} dangerouslySetInnerHTML={{ __html: data }}></div>
    </div>
  );
};

export default PublicEmailTool;
