import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CaseDetailedhere = () => {
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

  const COLORS = ['#4C51BF', '#48BB78'];

  return (
    <div className="space-y-8 font-serif">
      {/* Claims and Counter-claims */}
      <section className="bg-white rounded-lg shadow-md p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Claims and Counter-claims</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">Plaintiff (TechInnovate Ltd.) Claims:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Patent infringement of AI algorithm (Patent No. IN123456)</li>
              <li>Unauthorized use in e-commerce predictive analytics</li>
              <li>Estimated damages of ₹50 crore</li>
              <li>Seeking permanent injunction against GlobalSoft Inc.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Defendant (GlobalSoft Inc.) Counter-claims:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Independent development of the algorithm</li>
              <li>TechInnovate's patent is overly broad and potentially invalid</li>
              <li>Differences in implementation and application</li>
              <li>No access to TechInnovate's proprietary information</li>
            </ul>
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
  );
};

export default CaseDetailedhere;