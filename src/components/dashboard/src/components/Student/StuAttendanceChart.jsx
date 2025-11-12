// StuAttendanceChart.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const StuAttendanceChart = ({ present, absent }) => {
  const data = [
    { name: 'Present', value: present, color: '#4CAF50' }, // Green
    { name: 'Absent', value: absent, color: '#F44336' }, // Red
  ];
  const total = present + absent;
  const presentPct = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Attendance Tracker</h3>
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-bold text-green-500">{present}</span> Present / 
          <span className="font-bold text-red-500"> {absent}</span> Absent
        </p>
        <p className="text-3xl font-extrabold text-indigo-600 mt-1">{presentPct}%</p>
      </div>
      {/* Responsive chart container */}
      <div className="w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" cy="50%" innerRadius={30} outerRadius={45} 
              dataKey="value"
            >
              {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StuAttendanceChart;