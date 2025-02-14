import React, { useState } from 'react';

const reportsData = [
  { id: 1, quiz: "Math Quiz", attempts: 10, averageScore: 85 },
  { id: 2, quiz: "Science Quiz", attempts: 15, averageScore: 78 },
  { id: 3, quiz: "History Quiz", attempts: 8, averageScore: 82 },
  { id: 4, quiz: "Geography Quiz", attempts: 12, averageScore: 75 },
];

function Reports() {
  const [filter, setFilter] = useState("All");
  const [hoveredRow, setHoveredRow] = useState(null);

  const filteredReports =
    filter === "All"
      ? reportsData
      : reportsData.filter((report) => report.quiz === filter);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Reports Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Track and analyze quiz performance metrics across all subjects
          </p>
          
          <div className="flex items-center space-x-4 mb-8">
            <label className="font-semibold text-lg text-gray-700">Filter by Quiz:</label>
            <select
              className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white 
                         shadow-sm transition-all duration-200 
                         hover:border-blue-400 focus:border-blue-500 focus:ring-2 
                         focus:ring-blue-200 focus:outline-none cursor-pointer"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="All">All Quizzes</option>
              {reportsData.map((report) => (
                <option key={report.id} value={report.quiz}>{report.quiz}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600">
                  <th className="px-6 py-4 text-left text-white font-semibold tracking-wider">
                    Quiz Name
                  </th>
                  <th className="px-6 py-4 text-center text-white font-semibold tracking-wider">
                    Total Attempts
                  </th>
                  <th className="px-6 py-4 text-center text-white font-semibold tracking-wider">
                    Average Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className={`transition-colors duration-150 
                               ${hoveredRow === report.id ? 'bg-blue-50' : 'bg-white'}`}
                    onMouseEnter={() => setHoveredRow(report.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{report.quiz}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-600 font-medium">
                        {report.attempts}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`text-sm font-bold ${getScoreColor(report.averageScore)}`}>
                        {report.averageScore}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No reports found for the selected filter.
            </div>
          )}
        </div>
        
        <div className="mt-6 text-right text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

export default Reports;