// components/MediaList.js
import React from 'react';

const mediaData = [
  { title: 'The Great Gatsby', company: 'Warner Bros' },
  { title: 'Inception', company: 'Warner Bros' },
  { title: 'Breaking Bad', company: 'AMC' },
  { title: 'Stranger Things', company: 'Netflix' },
];

const MediaMentionsAboutHealthCare = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 dark:bg-gray-900 dark:text-white">
      <div className="max-w-4xl w-full shadow-md rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Media Titles and Companies</h2>
          <ul>
            {mediaData.map((media, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
              >
                <span className="font-medium text-gray-700 dark:text-gray-400">{media.title}</span>
                <span className="text-gray-600 dark:text-gray-500">{media.company}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MediaMentionsAboutHealthCare;
