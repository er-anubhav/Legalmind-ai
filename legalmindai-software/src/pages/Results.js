import React from 'react';
import html2pdf from 'html2pdf.js'; // Import the library
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChevronLeft, Download, Briefcase, Scale, Book, ThumbsUp } from 'lucide-react';
import { useNavigate, useLocation  } from 'react-router-dom';

const CaseAnalysisPage = () => {
  const similarityData = [
    { name: 'Algo. Structure', plaintiff: 85, defendant: 15 },
    { name: 'Code Implementation', plaintiff: 70, defendant: 30 },
    { name: 'Output Format', plaintiff: 90, defendant: 10 },
    { name: 'Performance Metrics', plaintiff: 75, defendant: 25 },
  ];
  const outcomeProbability = [
    { name: 'In favor of Plaintiff', value: 65 },
    { name: 'In favor of Defendant', value: 35 },
  ];
  const printDocument = () => {
    const element = document.getElementById('printable');
    const opt = {
      margin:       1,
      filename:     'report.pdf',
      image:        { type: 'jpeg', quality: 0.99 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };
  const COLORS = ['#4C51BF', '#48BB78'];
  const navigate = useNavigate();
  const location = useLocation();
  const summary = location.state?.summary || "No summary available."; // Default message if summary is not passed
  const caseDetails = location.state?.caseDetails || {};

  const Navigatehome = () => {
    // Navigate to the /results route
    navigate('/home');
  };

  

  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-slate-100 to-blue-50 font-sans">
            {/* Navbar */}
            <nav className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold">LegalMind.ai</span>
              <span className="ml-2 text-sm bg-blue-700 px-2 py-1 rounded">Commercial Court Assistant</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">{caseDetails.caseNumber || 'N/A'}</span>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="container mx-auto mt-8 px-6">
        {/* Back Button and Export */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={Navigatehome} className="flex items-center text-slate-600 hover:text-slate-800 bg-white px-4 py-2 rounded-md shadow transition duration-300">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Dashboard
          </button>
          <button onClick={printDocument} className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>

    <div id="printable">
        {/* Case Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">{caseDetails.parties || 'N/A'}</h1>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 text-slate-600">
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-500">Case Number</p>
              <p className="font-semibold">{caseDetails.caseNumber || 'N/A'}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-500">Date of Final Hearing</p>
              <p className="font-semibold">{caseDetails.dateOfFinalHearing || 'N/A'}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-500">Matter</p>
              <p className="font-semibold">{caseDetails.matter || 'N/A'}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <p className="text-sm text-slate-500">Judge</p>
              <p className="font-semibold">{caseDetails.judge || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Analysis Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Case Summary */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">Case Summary</h2>
              </div>
              <p className="text-slate-600">
                {summary}
              </p>
            </div>
          </div>

          {/* Key Legal Issues */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">Key Legal Issues</h2>
              </div>
              <p className="text-slate-600">{caseDetails.issues || 'No key legal issues available.'}</p>
            </div>
          </div>

          {/* Relevant Precedents */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Book className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">Relevant Precedents</h2>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Sharma Tech vs. InnovateSoft (2021):</strong> Established criteria for AI algorithm patent infringement.</li>
                <li><strong>MegaCorp vs. TechGiant (2022):</strong> Addressed the issue of independent development in patent disputes.</li>
                <li><strong>AI Innovations vs. SmartSys (2020):</strong> Set precedent for damage calculation in AI patent cases.</li>
              </ul>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <BarChart className="w-6 h-6 text-red-600 mr-2" />
                <h2 className="text-xl font-semibold text-slate-800">AI Insights</h2>
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Similarity Analysis:</strong> 78% similarity between disputed algorithms</li>
                <li><strong>Patent Strength:</strong> TechInnovate's patent has a 85% strength score</li>
                <li><strong>Precedent Relevance:</strong> Sharma Tech vs. InnovateSoft has 92% relevance</li>
                <li><strong>Potential Outcome:</strong> 65% likelihood in favor of the plaintiff</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4 flex items-center">
            <ThumbsUp className="w-6 h-6 text-blue-600 mr-2" />
            Recommendations
          </h2>
          <ul className="space-y-4 text-slate-600 text-black">
            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold mr-2">1.</span>
              <p>Consider appointing an independent technical expert to assess the similarity of the algorithms.</p>
            </li>
            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold mr-2">2.</span>
              <p>Evaluate GlobalSoft's evidence of independent development thoroughly.</p>
            </li>
            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold mr-2">3.</span>
              <p>If infringement is established, use the AI Innovations vs. SmartSys case as a guideline for damage calculation.</p>
            </li>
            <li className="flex items-start bg-gray-50 p-4 rounded-lg">
              <span className="font-semibold mr-2">4.</span>
              <p>Consider mediation as a potential resolution method, given the technical complexity of the case.</p>
            </li>
          </ul>
        </div>
        <div className="space-y-8 font-serif">
        {/* Claims and Counter-claims */}
      <section className="bg-white rounded-lg shadow-md p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Claims and Counter-claims</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Plaintiff (TechInnovate Ltd.) Claims:</h3>
            <p className="text-slate-600">{caseDetails.plaintiffArguments || 'No plaintiff arguments available.'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Defendant (GlobalSoft Inc.) Counter-claims:</h3>
            <p className="text-slate-600">{caseDetails.defendantArguments || 'No defendant arguments available.'}</p>
          </div>
        </div>
      </section>
            {/* Similarity Analysis */}
            <section className="bg-white font-serif rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Similarity Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={similarityData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="plaintiff" name="Similar" stackId="a" fill="#4C51BF" />
            <Bar dataKey="defendant" name="Different" stackId="a" fill="#48BB78" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-sm text-gray-600 mt-2">
          This chart shows the degree of similarity between the plaintiff's and defendant's algorithms across different aspects.
        </p>
      </section>
        {/* Key Evidence */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Evidence</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Patent Documentation:</h3>
            <p className="text-gray-600">Detailed analysis of TechInnovate's patent (IN123456) shows broad claims covering AI-based predictive analytics in e-commerce.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Expert Testimony:</h3>
            <p className="text-gray-600">Independent expert Dr. Anil Kumar confirms 78% similarity in core algorithm structure, but notes differences in implementation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Development Timeline:</h3>
            <p className="text-gray-600">GlobalSoft provides internal documents showing algorithm development began 6 months before TechInnovate's patent filing.</p>
          </div>
        </div>
      </section>
      {/* Precedent Analysis */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Relevant Legal Precedents</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700">Sharma Tech vs. InnovateSoft (2021)</h3>
            <p className="text-gray-600">Established that 70% similarity in AI algorithms is the threshold for potential infringement. Current case shows 78% similarity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-700">MegaCorp vs. TechGiant (2022)</h3>
            <p className="text-gray-600">Ruled that evidence of independent development can override similarity if timeline is clearly established. Relevant to GlobalSoft's claims.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-700">AI Innovations vs. SmartSys (2020)</h3>
            <p className="text-gray-600">Set precedent for damage calculation based on revenue generated from the infringing AI technology. May be applicable if infringement is established.</p>
          </div>
        </div>
      </section>
      {/* Outcome Probability */}
      <section className="bg-white font-serif rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Projected Outcome Probability</h2>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={outcomeProbability}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {outcomeProbability.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          This projection is based on the analysis of evidence, legal precedents, and similarity scores. It should be considered as a guideline and not a definitive prediction.
        </p>
      </section>
            {/* Potential Implications */}
            <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Potential Implications</h2>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>If ruling in favor of the Plaintiff:</strong> May set a precedent for stricter interpretation of AI algorithm patents, potentially stifling innovation in the AI industry.</p>
          <p className="text-gray-700"><strong>If ruling in favor of the Defendant:</strong> Could lead to more lenient interpretation of patent infringement in AI technologies, possibly requiring more specific patent claims in the future.</p>
          <p className="text-gray-700"><strong>Economic Impact:</strong> A ruling against GlobalSoft could significantly impact their market position in e-commerce analytics, potentially affecting competition in the sector.</p>
        </div>
      </section>
        </div>
        </div>
      </main>
    </div>
  );
};

export default CaseAnalysisPage;

