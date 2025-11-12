// StuGamificationWidget.jsx
import React from 'react';

const StuGamificationWidget = ({ points, rank, badgesCount }) => (
  <div className="p-4 bg-indigo-50 rounded-xl shadow-lg border-2 border-indigo-300 transform hover:scale-[1.02] transition duration-300 col-span-1">
    <h3 className="text-xl font-bold text-indigo-800 mb-3 flex items-center">
       Rewards Center
      {/* Animated Mascot */}
   
    </h3>
    <div className="space-y-2">
      <p className="flex justify-between items-center text-gray-700">
        <span className="font-medium">🌟 Total Points:</span>
        <span className="text-2xl font-extrabold text-yellow-600">{points}</span>
      </p>
      <p className="flex justify-between items-center text-gray-700">
        <span className="font-medium">🏅 Badges Unlocked:</span>
        <span className="text-sm bg-yellow-300 px-3 py-1 rounded-full font-bold">{badgesCount}</span>
      </p>
      <p className="flex justify-between items-center text-gray-700">
        <span className="font-medium">🏆 Leaderboard Rank (Batch):</span>
        {/* Animated Rank for Top 3 */}
        <span className={`text-2xl font-extrabold ${rank <= 3 ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}>
          #{rank}
        </span>
      </p>
    </div>
  </div>
);

export default StuGamificationWidget;