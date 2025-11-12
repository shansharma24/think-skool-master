// StuCloudIDEView.jsx
import React, { useState, useRef } from 'react';

const StuCloudIDEView = () => {
  const [code, setCode] = useState(`// Welcome to ThinkSkool Cloud IDE!
// Start coding here...

function helloWorld() {
  console.log("Hello, ThinkSkool!");
  return "Welcome to coding!";
}

// Call the function
helloWorld();`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef(null);

  const runCode = () => {
    setIsRunning(true);
    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
      };

      // Execute the code
      const result = eval(code);

      // Restore console.log
      console.log = originalLog;

      // Set output
      const outputText = logs.length > 0 ? logs.join('\n') : (result !== undefined ? result : 'Code executed successfully');
      setOutput(outputText);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
    setIsRunning(false);
  };

  const clearOutput = () => {
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">ThinkSkool Cloud IDE</h1>
            <p className="text-blue-100">Write, run, and debug your code in the cloud</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Code Editor */}
            <div className="flex-1 p-4">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Code Editor</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition duration-200 disabled:opacity-50"
                  >
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                  <button
                    onClick={clearOutput}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition duration-200"
                  >
                    Clear Output
                  </button>
                </div>
              </div>

              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your code here..."
              />
            </div>

            {/* Output Panel */}
            <div className="flex-1 p-4 border-t lg:border-t-0 lg:border-l border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Output</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md h-96 overflow-auto font-mono text-sm">
                {output || 'Output will appear here...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuCloudIDEView;
