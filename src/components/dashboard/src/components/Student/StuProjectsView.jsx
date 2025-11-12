// StuProjectsView.jsx
import React, { useState, useEffect } from 'react';

const StuProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch projects
    const fetchProjects = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/student/projects');
        // const data = await response.json();

        // Mock data for now
        const mockProjects = [
          {
            id: 1,
            title: 'E-commerce Website',
            description: 'Build a full-stack e-commerce platform with React, Node.js, and SQLite',
            status: 'In Progress',
            progress: 75,
            deadline: '2024-12-15',
            mentor: 'John Smith',
            technologies: ['React', 'Node.js', 'SQLite', 'Tailwind CSS'],
            milestones: [
              { name: 'Setup Project Structure', completed: true },
              { name: 'Implement User Authentication', completed: true },
              { name: 'Create Product Catalog', completed: true },
              { name: 'Build Shopping Cart', completed: false },
              { name: 'Implement Payment System', completed: false },
              { name: 'Deploy to Production', completed: false }
            ]
          },
          {
            id: 2,
            title: 'AI Chatbot',
            description: 'Develop an intelligent chatbot using Python and machine learning',
            status: 'Completed',
            progress: 100,
            deadline: '2024-11-30',
            mentor: 'Sarah Johnson',
            technologies: ['Python', 'TensorFlow', 'Flask', 'MongoDB'],
            milestones: [
              { name: 'Research NLP Libraries', completed: true },
              { name: 'Train ML Model', completed: true },
              { name: 'Build Chat Interface', completed: true },
              { name: 'Integrate with Backend', completed: true },
              { name: 'Testing and Deployment', completed: true }
            ]
          },
          {
            id: 3,
            title: 'Mobile App Development',
            description: 'Create a cross-platform mobile app using React Native',
            status: 'Not Started',
            progress: 0,
            deadline: '2025-01-20',
            mentor: 'Mike Davis',
            technologies: ['React Native', 'Firebase', 'Expo'],
            milestones: [
              { name: 'Project Planning', completed: false },
              { name: 'Setup Development Environment', completed: false },
              { name: 'Design UI/UX', completed: false },
              { name: 'Implement Core Features', completed: false },
              { name: 'Testing and QA', completed: false },
              { name: 'App Store Deployment', completed: false }
            ]
          }
        ];

        setProjects(mockProjects);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-500';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'Not Started': return 'bg-gray-100 text-gray-800 border-gray-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div className="bg-white rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-2xl transition duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-gray-600 text-sm">Mentor: {project.mentor}</p>
            </div>
            <span className={`mt-2 md:mt-0 px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{project.description}</p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-bold text-indigo-600">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Deadline:</span> {new Date(project.deadline).toLocaleDateString()}
            </p>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left font-semibold text-indigo-600 hover:text-indigo-800 transition flex justify-between items-center p-2 bg-indigo-50 rounded-lg"
          >
            {expanded ? 'Hide Details' : 'Show Milestones'}
            <span className="text-xl transform transition-transform duration-300">
              {expanded ? '▲' : '▼'}
            </span>
          </button>

          {/* Milestones */}
          {expanded && (
            <div className="mt-4 space-y-2 animate-fade-in">
              <h4 className="font-semibold text-gray-800 mb-3">Project Milestones:</h4>
              {project.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded-lg ${
                    milestone.completed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-gray-50 border-l-4 border-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {milestone.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${milestone.completed ? 'text-green-800 line-through' : 'text-gray-700'}`}>
                    {milestone.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Projects Portal</h1>
        <p className="text-gray-500">Track your project progress and milestones</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-indigo-600 mb-2">
            {projects.filter(p => p.status === 'Completed').length}
          </div>
          <p className="text-gray-600">Projects Completed</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {projects.filter(p => p.status === 'In Progress').length}
          </div>
          <p className="text-gray-600">In Progress</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-gray-600 mb-2">
            {projects.filter(p => p.status === 'Not Started').length}
          </div>
          <p className="text-gray-600">Not Started</p>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StuProjectsView;
