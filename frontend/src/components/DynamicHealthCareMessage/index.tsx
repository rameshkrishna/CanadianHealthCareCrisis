"use client";
import React from "react";
import { ReactTyped } from "react-typed";

const issues = [
  "is Broken",
  "in Crisis",
  "Failing Patients",
  "Needs Reform",
  "is Overwhelmed",
  "is Underfunded",
  "Staffing Shortages",
  "Wait Times Soaring",
  "Lacks Resources",
  "Services Deteriorating",
  "Accessibility Issues",
  "Facing Collapse",
  "Infrastructure Aging",
  "Patients Suffer",
  "Emergency Room Chaos",
  "Mental Health Neglected",
  "Rural Areas Forgotten",
  "Chronic Underinvestment",
  "Professionals Burned Out",
  "Budget Cuts Impacting Care",
  "Quality Declining",
  "Plagued by Inefficiency",
  "Struggling to Cope",
  "Overburdened",
  "Patients Left Waiting",
  "In Crisis Mode",
  "Facing Critical Shortages",
  "Needs Immediate Action",
  "in Desperate Need of Funds",
  "Patients Delayed",
  "Crisis Deepens",
  "in Decline",
  "Facing Major Challenges",
  "Patients in Limbo",
  "Under Siege",
  "Under Immense Pressure",
  "Patients Disadvantaged",
  "Crisis Worsening",
  "at Breaking Point",
  "Reform Urgently Needed",
  "in Dire Straits",
];

const DynamicHealthCareMessage = () => {
  return (
    <>
      {/* <div className="bg-purple-600 inline-block rounded-full px-4 py-1 text-sm font-semibold mb-4">
          New
          <span className="ml-2 text-gray-300">
              Want to contribute? You can do that <a href="#" className="text-purple-300 underline">here</a>
          </span>
      </div> */}
      <h1 className="mb-6 text-3xl leading-snug text-white sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
        Canadian Health Care System
        <br />
        <span className="bg-gradient-to-r from-orange-500 via-pink-600 to-purple-500 bg-clip-text uppercase text-transparent">
          <ReactTyped
            strings={issues}
            typeSpeed={50}
            backSpeed={50}
            loop
            cursorChar="|"
            showCursor={true}
          />
        </span>
      </h1>
    </>
  );
};

export default DynamicHealthCareMessage;
