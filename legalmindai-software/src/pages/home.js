import React, { useState } from 'react';
import { Scale, Book, BarChart, ChevronRight, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LegalMindAI = () => {
  const [caseNumber, setCaseNumber] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const analyzeCaseNumber = async () => {
    if (!caseNumber) {
      setError('Please enter a case number.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await axios.post('/api/summarize', { case_number: caseNumber });
      setSummary(response.data.summary);
      navigate('/results', { 
        state: { 
          summary: response.data.summary,
          caseDetails: response.data.caseDetails
       } 
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setSummary("Case not found. Please check the case number and try again.");
      } else {
        setSummary("An error occurred while fetching the summary. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const Navigatelogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-slate-100 to-blue-50 font-sans">
      <nav className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold">LegalMind.ai</span>
              <span className="ml-2 text-sm bg-blue-600 px-2 py-1 rounded">Judicial Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Welcome, Hon. Justice Sharma</span>
              <LogOut className="w-5 h-5 cursor-pointer" onClick={Navigatelogin} />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-6">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">New Case Analysis</h2>
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Enter case num. such as 2023-CC-789"
              className="flex-grow p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
            />
            <button onClick={analyzeCaseNumber} disabled={isLoading} className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center">{isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
          <p id="summaryText" className="text-slate-600">{summary}</p>
        </div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Scale className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Case Summary</h3>
              <p className="text-slate-600">Get an AI-generated summary of the case details and key points.</p>
            </div>
            <div className="px-6 py-3 bg-slate-50 flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
              <span className="font-medium">View Summary</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 text-green-600 rounded-full mb-4">
                <Book className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Relevant Precedents</h3>
              <p className="text-slate-600">Explore similar cases and relevant legal precedents.</p>
            </div>
            <div className="px-6 py-3 bg-slate-50 flex items-center text-green-600 hover:text-green-700 cursor-pointer">
              <span className="font-medium">Find Precedents</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <div className="p-6">
              <div className="flex items-center justify-center w-14 h-14 bg-purple-100 text-purple-600 rounded-full mb-4">
                <BarChart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Decision Support</h3>
              <p className="text-slate-600">Access AI-powered insights to support your decision-making process.</p>
            </div>
            <div className="px-6 py-3 bg-slate-50 flex items-center text-purple-600 hover:text-purple-700 cursor-pointer">
              <span className="font-medium">View Insights</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>

        {/* Recent Cases */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Recent Cases</h2>
          <ul className="space-y-3">
            {['2023-HC-123', '2023-HC-119', '2023-HC-115'].map((caseNum) => (
              <li key={caseNum} className="flex items-center justify-between p-3 bg-slate-50 rounded-md hover:bg-slate-100 transition duration-300 cursor-pointer">
                <span className="font-medium text-slate-700">{caseNum}</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default LegalMindAI;
