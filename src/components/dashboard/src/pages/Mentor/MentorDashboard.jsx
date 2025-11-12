// MentorDashboard.jsx
import React, { useState } from 'react';
import MentorReviewTile from '../../components/Mentor/MentorReviewTile';
import MentorDoubtQueue from '../../components/Mentor/MentorDoubtQueue';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MentorAssignmentCreator from '../../components/Mentor/MentorAssignmentCreator';

// Inline component for Mentor Batch Performance Chart (uses ResponsiveContainer for responsiveness)
const MentorBatchPerformanceChart = ({ data }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg col-span-full">
    <h3 className="text-xl font-bold text-gray-800 mb-4">Batch Performance & Progress</h3>
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgScore" fill="#8884d8" name="Avg. Score (%)" />
          <Bar dataKey="completionRate" fill="#82ca9d" name="Syllabus Completion (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const MentorDashboard = () => {
    const [showProfile, setShowProfile]=useState(false);
  const mentorData = {

    pendingReviews: 12,
    newMessages: 3,
    pendingDoubts: [
      { id: 1, summary: 'Error in Python loop logic', urgency: 'Urgent' },
      { id: 2, summary: 'Question on JS Promises', urgency: 'Normal' },
      { id: 3, summary: 'C++ memory leak issue', urgency: 'Urgent' },
      { id: 4, summary: 'HTML form validation help', urgency: 'Normal' },
      { id: 5, summary: 'Project milestone clarification', urgency: 'Normal' },
    ],
    batchStats: [
      { name: 'Wk 1', avgScore: 75, completionRate: 15 },
      { name: 'Wk 2', avgScore: 82, completionRate: 25 },
      { name: 'Wk 3', avgScore: 78, completionRate: 35 },
      { name: 'Wk 4', avgScore: 85, completionRate: 45 },
    ],
  };

  return (
    <div className="h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <header className="mb-8 border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
       <div>
         <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Mentor Portal</h1>

        <p className="text-gray-500">Focus on feedback and student support.</p>
       </div>

        <button onClick={() => setShowProfile(!showProfile)}
         className="w-10 h-10 rounded-full text-white bg-purple-600 hover:bg-purple-900 flex items-center justify-center text-xl cursor-pointer select-none">
           Y
        </button>
        {showProfile && (
                    <div className="absolute right-10 mt-36 w-36 bg-white text-black rounded-lg shadow-lg py-2 z-30">
                      <button
                        onClick={() => {

                          setShowProfile(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 border-b-2 border-gray-100"
                      >
                       Progress
                      </button>
                      <button

                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
      </header>

      {/* CORE TASKS GRID: Stacks on mobile, 3 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MentorReviewTile pendingCount={mentorData.pendingReviews} />

        {/* Mentor Chat/Inbox Tile - Added bounce animation for new messages */}
        <div className="p-4 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4">✉️ Mentor Chat / Inbox</h3>
            <p className={`text-4xl font-extrabold ${mentorData.newMessages > 0 ? 'text-yellow-600 animate-bounce' : 'text-gray-400'}`}>
                {mentorData.newMessages}
            </p>
            <p className="text-gray-500 mt-1">new messages.</p>
            <button className="mt-4 w-full py-2 bg-yellow-500 text-gray-800 font-semibold rounded-lg hover:bg-yellow-600 transition shadow-md">
                View Inbox
            </button>
        </div>

        <MentorDoubtQueue doubts={mentorData.pendingDoubts} />
      </div>

      {/* CHART AND ANNOUNCEMENTS
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart spans full width */}
         {/* <div className="md:col-span-3">
            <MentorBatchPerformanceChart data={mentorData.batchStats} />
        </div>  */}

        {/* Announcement Poster spans full width on mobile/tablet, placed below chart */}
        <div className="p-4 bg-indigo-100 rounded-xl shadow-lg md:col-span-3">
            <h3 className="text-xl font-bold text-indigo-800 mb-3">📣 Create New Announcement</h3>
            <textarea
              placeholder="Type batch-specific updates, deadlines, or motivational messages..."
              rows="4"
              className="w-full p-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
            ></textarea>
            <button className="mt-3 py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md">
              Post Announcement
            </button>
        </div>
        <MentorAssignmentCreator/>
      </div>

  );
};

export default MentorDashboard;
