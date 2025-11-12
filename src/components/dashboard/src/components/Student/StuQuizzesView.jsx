// StuQuizzesView.jsx
import React, { useState, useEffect } from 'react';

const StuQuizzesView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch quizzes
    const fetchQuizzes = async () => {
      try {
        // Mock data for quizzes
        const mockQuizzes = [
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            description: 'Test your knowledge of basic JavaScript concepts',
            status: 'Available',
            dueDate: '2024-12-10',
            timeLimit: 30, // minutes
            totalQuestions: 10,
            attempts: 0,
            maxAttempts: 3,
            questions: [
              {
                id: 1,
                question: 'What is the correct way to declare a variable in JavaScript?',
                options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
                correctAnswer: 0,
                explanation: 'In JavaScript, variables can be declared using var, let, or const keywords.'
              },
              {
                id: 2,
                question: 'Which of the following is NOT a JavaScript data type?',
                options: ['string', 'boolean', 'integer', 'undefined'],
                correctAnswer: 2,
                explanation: 'JavaScript has number type, not separate integer type.'
              },
              {
                id: 3,
                question: 'What does the === operator do in JavaScript?',
                options: ['Assignment', 'Comparison with type coercion', 'Strict equality comparison', 'Logical AND'],
                correctAnswer: 2,
                explanation: '=== performs strict equality comparison without type coercion.'
              }
            ]
          },
          {
            id: 2,
            title: 'React Components Quiz',
            description: 'Assess your understanding of React component lifecycle',
            status: 'Completed',
            dueDate: '2024-11-25',
            score: 85,
            totalQuestions: 15,
            attempts: 1,
            maxAttempts: 2
          },
          {
            id: 3,
            title: 'Database Design Principles',
            description: 'Test your knowledge of database normalization and design',
            status: 'Available',
            dueDate: '2024-12-20',
            timeLimit: 45,
            totalQuestions: 20,
            attempts: 0,
            maxAttempts: 2
          }
        ];

        setQuizzes(mockQuizzes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const startQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizAnswers({});
    setShowResults(false);
    setQuizScore(0);
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerIndex
    });
  };

  const submitQuiz = () => {
    if (!selectedQuiz) return;

    let correctAnswers = 0;
    selectedQuiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setQuizScore(score);
    setShowResults(true);

    // Update quiz status in the list
    setQuizzes(quizzes.map(quiz =>
      quiz.id === selectedQuiz.id
        ? { ...quiz, status: 'Completed', score, attempts: quiz.attempts + 1 }
        : quiz
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-500';
      case 'Available': return 'bg-blue-100 text-blue-800 border-blue-500';
      case 'Expired': return 'bg-red-100 text-red-800 border-red-500';
      default: return 'bg-gray-100 text-gray-800 border-gray-400';
    }
  };

  const QuizCard = ({ quiz }) => (
    <div className="bg-white rounded-xl shadow-lg border-l-4 border-purple-500 hover:shadow-2xl transition duration-300 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{quiz.title}</h3>
          <p className="text-gray-600 text-sm">{quiz.description}</p>
        </div>
        <span className={`mt-2 md:mt-0 px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(quiz.status)}`}>
          {quiz.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Questions:</span>
          <p className="text-gray-900">{quiz.totalQuestions}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Time Limit:</span>
          <p className="text-gray-900">{quiz.timeLimit} min</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Due Date:</span>
          <p className="text-gray-900">{new Date(quiz.dueDate).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700">Attempts:</span>
          <p className="text-gray-900">{quiz.attempts}/{quiz.maxAttempts}</p>
        </div>
      </div>

      {quiz.status === 'Completed' && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 font-semibold">Score: {quiz.score}%</p>
        </div>
      )}

      <button
        onClick={() => startQuiz(quiz)}
        disabled={quiz.status === 'Completed' || quiz.attempts >= quiz.maxAttempts}
        className={`w-full py-2 px-4 font-semibold rounded-lg transition duration-300 ${
          quiz.status === 'Completed' || quiz.attempts >= quiz.maxAttempts
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {quiz.status === 'Completed' ? 'Completed' : quiz.attempts >= quiz.maxAttempts ? 'Max Attempts Reached' : 'Start Quiz'}
      </button>
    </div>
  );

  const QuizInterface = ({ quiz }) => {
    const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert to seconds

    useEffect(() => {
      if (timeLeft > 0 && !showResults) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && !showResults) {
        submitQuiz();
      }
    }, [timeLeft, showResults]);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (showResults) {
      return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h2>
            <div className={`text-6xl font-extrabold mb-4 ${quizScore >= 70 ? 'text-green-600' : quizScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
              {quizScore}%
            </div>
            <p className="text-gray-600">
              You answered {Object.keys(quizAnswers).length} out of {quiz.questions.length} questions
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Question {index + 1}: {question.question}</h3>
                <div className="space-y-1">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded ${
                        optIndex === question.correctAnswer
                          ? 'bg-green-100 border border-green-500'
                          : optIndex === quizAnswers[question.id] && optIndex !== question.correctAnswer
                          ? 'bg-red-100 border border-red-500'
                          : 'bg-gray-50'
                      }`}
                    >
                      {option}
                      {optIndex === question.correctAnswer && (
                        <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                      )}
                      {optIndex === quizAnswers[question.id] && optIndex !== question.correctAnswer && (
                        <span className="ml-2 text-red-600 font-bold">✗ Your Answer</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2 italic">{question.explanation}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Back to Quizzes
            </button>
            <button
              onClick={() => startQuiz(quiz)}
              className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Time Remaining</p>
            <p className={`text-xl font-bold ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-gray-900'}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Question {index + 1}: {question.question}</h3>
              <div className="space-y-2">
                {question.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={optIndex}
                      checked={quizAnswers[question.id] === optIndex}
                      onChange={() => handleAnswerChange(question.id, optIndex)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={submitQuiz}
            disabled={Object.keys(quizAnswers).length !== quiz.questions.length}
            className={`px-8 py-3 font-semibold rounded-lg transition ${
              Object.keys(quizAnswers).length === quiz.questions.length
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <QuizInterface quiz={selectedQuiz} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Quizzes Portal</h1>
        <p className="text-gray-500">Test your knowledge and track your progress</p>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quizzes.map(quiz => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {quizzes.filter(q => q.status === 'Completed').length}
          </div>
          <p className="text-gray-600">Quizzes Completed</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {quizzes.filter(q => q.status === 'Available').length}
          </div>
          <p className="text-gray-600">Available Quizzes</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {quizzes.reduce((acc, quiz) => acc + (quiz.score || 0), 0) / Math.max(1, quizzes.filter(q => q.score).length) || 0}%
          </div>
          <p className="text-gray-600">Average Score</p>
        </div>
      </div>
    </div>
  );
};

export default StuQuizzesView;
