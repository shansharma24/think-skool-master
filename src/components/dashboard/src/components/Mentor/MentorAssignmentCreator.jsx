// MentorAssignmentCreator.jsx
import React, { useState } from 'react';

const MentorAssignmentCreator = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    type: 'Assignment', // Assignment or Project
    batch: 'Grades 9-10 (Science Stream)', // Pre-selected for simplicity
    attachments: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachments: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionSuccess(false);

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      
      // Reset form after a successful post (optional)
      setFormData({
        title: '',
        description: '',
        deadline: '',
        type: 'Assignment',
        batch: formData.batch,
        attachments: null,
      });

      console.log('Assignment Posted:', formData);
    }, 2000); // 2-second animation for submission
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-3 flex items-center">
        Post New Assignment/Project 📝
        <span className="ml-3 text-indigo-600 text-3xl animate-bounce-slow">🚀</span>
      </h1>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-2xl transition duration-500 hover:shadow-indigo-300/50">
        
        {/* --- Success Message (Animated) --- */}
        {submissionSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 border-l-4 border-green-500 rounded-lg flex items-center animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 animate-wiggle" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Success! Assignment has been posted to the selected batch.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Type and Batch Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isSubmitting}
              >
                <option value="Assignment">Assignment</option>
                <option value="Project">Project</option>
              </select>
            </div>
            <div>
             
            </div>
          </div>

          {/* Row 2: Title and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Python Functions Module 4 Quiz"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
              <input
                type="datetime-local"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Row 3: Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              {formData.type} Description & Instructions
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide detailed instructions, learning goals, and rubric points here..."
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-y"
              required
              disabled={isSubmitting}
            ></textarea>
          </div>

          {/* Row 4: Attachments */}
          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
              Supporting Files (Resource Downloads)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-8m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-28-4l4 4m12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="attachments" className={`relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 ${isSubmitting ? 'cursor-not-allowed text-gray-400' : ''}`}>
                    <span>Upload a file or drag and drop</span>
                    <input id="attachments" name="attachments" type="file" multiple className="sr-only" onChange={handleFileChange} disabled={isSubmitting} />
                  </label>
                  <p className="pl-1">or link to external resources</p>
                </div>
                {formData.attachments && (
                    <p className="text-xs text-gray-500 pt-2">
                        {formData.attachments.length} file(s) selected.
                    </p>
                )}
              </div>
            </div>
          </div>

          {/* Row 5: Submit Button (Animated) */}
          <div className="pt-5">
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.deadline}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-xl text-lg font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                ${isSubmitting 
                  ? 'bg-indigo-300 text-gray-600 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.01]'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Posting {formData.type}...
                </span>
              ) : (
                `Post ${formData.type}`
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Custom CSS for custom animations (not natively in Tailwind core) */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
            animation: bounce 4s infinite;
        }
      `}</style>
    </div>
  );
};

export default MentorAssignmentCreator;