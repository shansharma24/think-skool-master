// MentorDoubtQueue.jsx
import React from 'react';

const MentorDoubtQueue = ({ doubts }) => (
  <div className="p-4 bg-white rounded-xl shadow-lg border-l-4 border-red-500 transform hover:shadow-xl transition duration-300">
    <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
      ❓ Pending Doubt Support ({doubts.length})
    </h3>
    <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
      {doubts.slice(0, 4).map(d => ( 
        <li key={d.id} className="p-2 border-b border-gray-100 flex justify-between items-center hover:bg-red-50 transition rounded-md cursor-pointer">
          <span className="truncate w-3/4">{d.summary}</span>
          {/* Pulse animation for Urgent tag */}
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${d.urgency === 'Urgent' ? 'bg-red-200 text-red-800 animate-pulse' : 'bg-green-200 text-green-800'}`}>
            {d.urgency}
          </span>
        </li>
      ))}
      {doubts.length > 4 && <li className="text-center text-xs text-gray-500">... and {doubts.length - 4} more.</li>}
    </ul>
    <button className="mt-3 w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md">
      Go to Resolution Thread
    </button>
  </div>
);

export default MentorDoubtQueue;