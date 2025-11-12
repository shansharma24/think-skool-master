// StuDoubtSupport.jsx
import React, { useState } from 'react';

// Mock data structure for existing doubts
const initialDoubts = [
  { id: 1, title: "Error in Python loop structure", status: 'Resolved', urgency: 'Urgent', date: 'Oct 18', mascotMessage: 'Great job resolving this tough one!' },
  { id: 2, title: "Query about JavaScript Promises", status: 'In Progress', urgency: 'Normal', date: 'Oct 20', mascotMessage: 'Hang tight! Your mentor is on the case.' },
  { id: 3, title: "HTML Form validation issue", status: 'Open', urgency: 'Normal', date: 'Oct 22', mascotMessage: 'We see your doubt and will assign a mentor soon.' },
];

const StuDoubtSupport = () => {
  const [currentDoubt, setCurrentDoubt] = useState('');
  const [urgency, setUrgency] = useState('Normal');
  const [attachment, setAttachment] = useState(null);
  const [submittedDoubts, setSubmittedDoubts] = useState(initialDoubts);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentDoubt) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newDoubt = {
        id: Date.now(),
        title: currentDoubt.substring(0, 50) + (currentDoubt.length > 50 ? '...' : ''),
        status: 'Open',
        urgency: urgency,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mascotMessage: 'Welcome! Your doubt has been submitted successfully.',
        details: currentDoubt,
        attachmentName: attachment ? attachment.name : null,
      };

      setSubmittedDoubts([newDoubt, ...submittedDoubts]);
      setCurrentDoubt('');
      setAttachment(null);
      setUrgency('Normal');
      setIsSubmitting(false);
      console.log('New Doubt Submitted:', newDoubt);
    }, 1500);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-500';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700 border-yellow-500 animate-pulse';
      case 'Open': return 'bg-blue-100 text-blue-700 border-blue-500';
      default: return 'bg-gray-100 text-gray-700 border-gray-400';
    }
  };

  const getUrgencyClasses = (urgency) => {
    return urgency === 'Urgent' 
      ? 'bg-red-500 text-white font-bold px-2 py-0.5 rounded-full text-xs' 
      : 'bg-gray-300 text-gray-800 font-medium px-2 py-0.5 rounded-full text-xs';
  };

  const latestDoubt = submittedDoubts[0] || null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">
        Doubt Support / Mentorship Interaction
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* === COLUMN 1: ASK DOUBT FEATURE === */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-2xl">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Ask a New Doubt ❓</h2>
          <p className="text-gray-500 mb-4">Upload text or images. Our mentors will reply asynchronously.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Doubt Input */}
            <textarea
              placeholder="Describe your problem clearly (e.g., 'I am getting a segmentation fault when running my C++ code for linked lists')."
              rows="6"
              value={currentDoubt}
              onChange={(e) => setCurrentDoubt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition resize-none"
              required
              disabled={isSubmitting}
            />

            {/* Urgency and File Upload */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              
              {/* Urgency Tag */}
              <div className="flex items-center space-x-3">
                <label className="text-gray-700 font-medium">Tag Urgency:</label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                  disabled={isSubmitting}
                >
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* File Upload (Text or Image) */}
              <label className="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.293 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-700">
                  {attachment ? attachment.name : 'Upload Image/Doc/PDF'}
                </span>
                <input
                  type="file"
                  onChange={(e) => setAttachment(e.target.files[0])}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 font-semibold text-lg rounded-xl shadow-lg transition duration-300 ${
                isSubmitting
                  ? 'bg-indigo-300 text-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.01]'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Sending Doubt...
                </span>
              ) : (
                'Submit Doubt'
              )}
            </button>
          </form>
        </div>

        {/* === COLUMN 2: MASCOT & LATEST STATUS TRACKER === */}
        <div className="p-6 bg-white rounded-xl shadow-2xl flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doubt Helper 🤖</h2>
          
          

          <div className="p-4 bg-purple-100 rounded-xl border-2 border-purple-300 w-full mb-6">
            <h3 className="font-bold text-purple-800">Mascot Message:</h3>
            <p className="text-sm text-purple-700 mt-1 italic">
              {latestDoubt?.mascotMessage || "Hello! Submit your first doubt, and I'll keep you motivated."}
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Latest Doubt Status</h3>
            {latestDoubt ? (
              <div className={`p-3 rounded-lg border-l-4 font-semibold ${getStatusClasses(latestDoubt.status)}`}>
                {latestDoubt.title} 
                <span className="block text-sm font-normal mt-1">Status: {latestDoubt.status}</span>
                <span className="text-xs text-gray-600">{latestDoubt.date}</span>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No doubts submitted yet.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* === ROW 2: SUBMITTED DOUBT HISTORY === */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Submitted Doubt History</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submittedDoubts.map((doubt) => (
                <tr key={doubt.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doubt.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getUrgencyClasses(doubt.urgency)}>{doubt.urgency}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusClasses(doubt.status)}`}>
                      {doubt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doubt.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 transition hover:underline">
                      View Thread
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default StuDoubtSupport;