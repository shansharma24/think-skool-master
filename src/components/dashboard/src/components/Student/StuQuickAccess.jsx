// StuQuickAccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StuQuickAccess = ({ tiles }) => {
    const navigate=useNavigate();
    return(
  <div className="mt-6 mb-8">
    <h3 className="text-2xl font-bold text-gray-700 mb-4">Quick Access</h3>
    {/* Responsive Grid: 2 columns on mobile, 4 on medium, 6 on large */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tiles.map(tile => (
        <button onClick={()=>navigate(tile.path)}
          key={tile.label}
          // Interactivity and transition for smooth hover effect
          className="p-4 bg-primary text-white rounded-xl shadow-md hover:bg-secondary hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col items-center justify-center space-y-1 cursor-pointer"
        >
          <span className="text-3xl">{tile.icon}</span>
          <span className="text-sm font-semibold text-center">{tile.label}</span>
        </button>
      ))}
    </div>
  </div>
);}

export default StuQuickAccess
