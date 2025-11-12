// StuAssignmentView.jsx
import React, { useState, useEffect } from 'react';

// --- Utility Functions ---

// Custom hook for the countdown timer
const useCountdown = (deadline) => {
  const [timeLeft, setTimeLeft] = useState(deadline - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(deadline - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft < 0) return 'Deadline Passed';

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

// Function to get styles based on status
const getStatusClasses = (status) => {
  switch (status) {
    case 'Reviewed':
      return 'bg-green-100 text-green-700 border-green-500';
    case 'Submitted':
      return 'bg-blue-100 text-blue-700 border-blue-500 animate-pulse';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-500';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-400';
  }
};


// --- Assignment Item Component ---

const AssignmentItem = ({ assignment }) => {
  const { title, deadline, status, feedback, isProject } = assignment;
  const deadlineTime = new Date(deadline).getTime();
  const countdown = useCountdown(deadlineTime);
  const statusClasses = getStatusClasses(status);
  const [showFeedback, setShowFeedback] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
    // Logic for immediate upload/storage would go here
  };
  
  const handleSubmission = () => {
      if (file) {
          // Simulate submission logic
          alert(`Submitting ${file.name} for ${title}...`);
          // In a real app, you'd update status to 'Submitted' after API success
      } else {
          alert('Please select a file to upload first.');
      }
  }

  return (
    <div className={`p-6 bg-white rounded-xl shadow-lg border-l-4 ${status === 'Reviewed' ? 'border-green-600' : 'border-indigo-600'} hover:shadow-2xl transition duration-300`}>
      
      {/* HEADER & STATUS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b pb-3">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          {isProject ? '🏗️ Project:' : '📝 Assignment:'} {title}
        </h3>
        <span className={`mt-2 md:mt-0 px-3 py-1 text-sm font-semibold rounded-full border-2 ${statusClasses}`}>
          Status: {status}
        </span>
      </div>

      {/* DEADLINE & PROGRESS */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">Deadline: {new Date(deadline).toLocaleString()}</p>
        <div className={`text-lg font-extrabold ${countdown.includes('Passed') ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
          Time Left: {countdown}
        </div>

        {isProject && (
          <div className="mt-3">
            <h4 className="text-md font-semibold text-gray-700">Project Milestone Progress (75%)</h4>
            <div className="w-full bg-indigo-200 rounded-full h-2.5">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* SUBMISSION AREA */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <label className="flex items-center space-x-2 text-indigo-600 font-medium cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.293 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            <span className="text-sm">
                {file ? `File selected: ${file.name}` : 'Upload Submission (PDF, DOC, IMG)'}
            </span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
        
        <button 
            onClick={handleSubmission}
            disabled={status !== 'Pending' || countdown.includes('Passed')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-300 shadow-md ${
                status === 'Pending' && !countdown.includes('Passed')
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
        >
            Upload & Submit
        </button>
      </div>

      {/* MENTOR FEEDBACK SECTION (Visible only if Reviewed) */}
      {status === 'Reviewed' && (
        <div className="mt-5">
          <button 
            onClick={() => setShowFeedback(!showFeedback)}
            className="w-full text-left font-bold text-lg text-green-700 hover:text-green-900 transition flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-300"
          >
            🎉 Mentor Feedback & Score Received
            <span className="text-xl transform transition-transform duration-300">{showFeedback ? '▲' : '▼'}</span>
          </button>

          {showFeedback && (
            <div className="mt-3 p-4 bg-white border border-green-200 rounded-lg shadow-inner animate-fade-in">
              <p className="text-lg font-bold mb-2">Score: <span className="text-green-600">92/100</span></p>
              
              <div className="border-l-4 border-red-500 pl-3 mb-3 bg-red-50 p-2">
                <h4 className="font-semibold text-red-700 flex items-center">
                    ❌ Failed Points/Suggestions (Visual Highlight)
                </h4>
                <p className="text-sm text-gray-700 mt-1">{feedback.suggestions}</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-3 bg-blue-50 p-2">
                <h4 className="font-semibold text-blue-700">✨ Review Comments</h4>
                <p className="text-sm text-gray-700 mt-1">{feedback.comments}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Project Unlock Status */}
      {isProject && status === 'Pending' && (
        <p className="mt-4 text-sm text-red-500 font-medium">
          Note: This project unlocks automatically after 90% syllabus completion.
        </p>
      )}
    </div>
  );
};


// --- Main StuAssignmentView Component ---

const StuAssignmentView = () => {
  // Mock Data: Includes Assignments, a Submitted item, a Reviewed item, and a Project
  const assignmentsData = [
    {
      id: 1,
      title: 'Python Data Structures Challenge',
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 5, // 5 days from now
      status: 'Pending',
      isProject: false,
      feedback: null,
    },
    {
      id: 2,
      title: 'Database Schema Design',
      deadline: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago (Deadline Passed)
      status: 'Submitted',
      isProject: false,
      feedback: null,
    },
    {
      id: 3,
      title: 'React Component Refactoring',
      deadline: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
      status: 'Reviewed',
      isProject: false,
      feedback: {
        comments: 'Excellent logic flow and separation of concerns. The state management is clean.',
        suggestions: 'The CSS could be made more consistent using utility classes across all components.',
      },
    },
    {
        id: 4,
        title: 'Final Capstone Project: E-commerce Site',
        deadline: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days from now
        status: 'Pending',
        isProject: true,
        feedback: null,
      },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3">
        Assignments & Projects Portal
      </h1>

      {/* Layout Grid: Stacks on mobile, 2 columns on medium screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignmentsData.map(assignment => (
          <AssignmentItem key={assignment.id} assignment={assignment} />
        ))}
      </div>

      {/* Custom CSS for animation (Tailwind often requires manual keyframes for custom animations) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default StuAssignmentView;