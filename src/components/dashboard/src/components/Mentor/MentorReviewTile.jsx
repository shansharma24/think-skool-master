// MentorReviewTile.jsx
import React from 'react';

const MentorReviewTile = ({ pendingCount }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg flex flex-col justify-between border-l-4 border-indigo-500">
    <h3 className="text-xl font-bold text-gray-800 mb-4">📝 Assignments/Projects Review</h3>
    {/* Visual attention-grabber for pending tasks */}
    <p className={`text-4xl font-extrabold ${pendingCount > 0 ? 'text-indigo-600 animate-wiggle' : 'text-gray-400'}`}>
      {pendingCount}
    </p> 
    <p className="text-gray-500 mt-1">submissions awaiting your feedback.</p>
    <button className="mt-4 w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md">
      Start Review (Feedback Comments)
    </button>
  </div>
);

export default MentorReviewTile;