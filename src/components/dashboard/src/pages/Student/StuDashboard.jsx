// StuDashboard.jsx
import React, { useState } from 'react';
import StuGamificationWidget from '../../components/Student/StuGamificationWidget';
import StuAttendanceChart from '../../components/Student/StuAttendanceChart';
import StuQuickAccess from '../../components/Student/StuQuickAccess';

// Inline component for Batch Overview
const StuBatchOverview = ({  completion }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
    <h2 className="text-xl font-bold text-gray-800 mb-3">Accuracy</h2>
    <p className="text-sm text-gray-500 mb-2"></p>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-500 h-3 rounded-full transition-all duration-1000"
        style={{ width: `${completion}%` }}
      ></div>
    </div>
    <p className="text-right mt-1 text-lg font-semibold text-green-600">{completion}%</p>
  </div>
);

const StuDashboard = () => {
    const [showProfile,setShowProfile]=useState(false);
  const studentData = {

    Accuracy: 70,
    attendance: { present: 45, absent: 5 },
    gamification: { points: 1250, rank: 3, badgesCount: 3, mascotReaction: '🥳' },
    quickTiles: [
      { label: 'Assignments', icon: '📝',path:'/student-assignment' }, { label: 'Projects', icon: '🏗️',path:'/student-projects' },
      { label: 'Quizzes', icon: '🧠',path:'/student-quizzes' }, { label: 'Notes & Resources', icon: '📚' ,path:'/student-Notes' },
      { label: 'Cloud IDE', icon: '💻' ,path:'/student-cloudide'}, { label: 'Doubt Support', icon: '❓' ,path:'/student-doubt'},
    ],
  };

  return (
    <div className="h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <header className="mb-8 border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Student Portal Dashboard</h1>
          <p className="text-gray-500 mt-1">Hello, Student Name! Keep up the great work.</p>
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
                        Mentor's Detail
                      </button>
                      <button

                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
      </header>

      {/* DASHBOARD GRID: Stacks on mobile, 3 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StuBatchOverview  completion={studentData.Accuracy} />
        <StuAttendanceChart present={studentData.attendance.present} absent={studentData.attendance.absent} />
        <StuGamificationWidget {...studentData.gamification} />

        {/* Announcements section spans full width on mobile, 2 columns on desktop */}
        <div className="p-4 bg-orange-100 rounded-xl shadow-md border-l-4 border-orange-500 md:col-span-2">
          <h3 className="text-lg font-semibold text-orange-800 flex items-center">
            📢 Mentor Announcements <span className="ml-2 text-2xl text-orange-600 animate-pulse">🌟</span>
          </h3>
          <p className="text-gray-700 mt-1">New project milestone achieved! Deadline for Assignment 3 approaching.</p>
        </div>

        {/* Next Deadline (1 column) */}
        <div className="p-4 bg-red-100 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-lg font-semibold text-red-800">📝 Next Deadline</h3>
            <p className="text-xl font-bold text-red-600 mt-1">Project 2 Submission</p>
            <p className="text-sm text-gray-600">Due in: <span className="font-extrabold">3 days, 14 hours</span></p>
        </div>

        {/* Mentor Chat (1 column, placed intelligently by grid) */}
        <div className="p-4 bg-blue-100 rounded-xl shadow-md border-l-4 border-blue-500 md:col-span-1">
            <h3 className="text-lg font-semibold text-blue-800">✉️ Mentor Chat</h3>
            <p className="text-sm text-gray-600 mt-1">New Message: <span className="font-bold">You received feedback on Assignment 1.</span></p>
            <button className="mt-2 text-blue-600 font-semibold text-sm hover:underline">View Feedback</button>
        </div>
      </div>

      <StuQuickAccess tiles={studentData.quickTiles} />
    </div>
  );
};

export default StuDashboard;
