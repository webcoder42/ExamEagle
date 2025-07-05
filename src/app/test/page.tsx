'use client';

import { useState } from 'react';

export default function TestPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setTestResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setTestResult(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">API Test</h2>
        
        <button 
          onClick={testAPI}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test API Connection'}
        </button>
        
        {testResult && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {testResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 