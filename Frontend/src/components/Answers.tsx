import React from 'react';
import { useParams } from 'react-router-dom';

// Dummy data, replace with API call
const question = {
  id: "cmd01nkze0005sbrazdv7ajiw",
  title: "How does Node.js handle concurrency?",
  description: "Can someone explain the event loop in detail?",
  authorId: "cmd01geez0000sb2c2jvj1wtc",
  tags: [
    { tag: { id: "clx002ts001", name: "TypeScript" } },
    { tag: { id: "clx001js001", name: "JavaScript" } },
  ],
};

const answers = [
  {
    id: "cmd01s0zj0009sbrazcng3edk",
    content: "This is an answer with at least 10 characters.",
    authorId: "2",
    questionId: "cmd01nkze0005sbrazdv7ajiw",
    isAccepted: false,
    createdAt: "2025-07-12T09:32:47.743Z",
  },
  {
    id: "cmd01s0zj0009sbrazcng3edl",
    content: "Another detailed explanation of how Node.js uses the event loop and libuv.",
    authorId: "3",
    questionId: "cmd01nkze0005sbrazdv7ajiw",
    isAccepted: false,
    createdAt: "2025-07-12T09:35:00.000Z",
  },
];

const AnswersPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4 sm:px-10">
      {/* Question Section */}
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl border border-gray-700 p-6 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-3">{question.title}</h1>
        <p className="text-gray-300 mb-4">{question.description}</p>
        <div className="flex flex-wrap gap-2">
          {question.tags.map((t) => (
            <span
              key={t.tag.id}
              className="bg-purple-700 text-sm px-3 py-1 rounded-full"
            >
              {t.tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Answers Section */}
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold mb-4 text-white border-b border-gray-700 pb-2">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>
        {answers.map((ans) => (
          <div
            key={ans.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-5 shadow hover:shadow-purple-600/30 transition"
          >
            <p className="text-gray-200 mb-3 whitespace-pre-line">{ans.content}</p>
            <div className="text-sm text-gray-400 flex justify-between items-center">
              <span>Author ID: {ans.authorId}</span>
              <span>{new Date(ans.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswersPage;
