import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ExpertDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, showToast, setActiveCaseId } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCases = cases.filter(
    (c) =>
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.aiDiagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCase = (id: string) => {
    setActiveCaseId(id);
    navigate(`/expert/case/${id}`);
  };

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 border-b border-outline-variant pb-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
            Expert Diagnostic Dashboard
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Welcome back, Dr. Ramesh (Senior Pathologist) • ICAR Certified Expert
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast('Filter options: Pending verification only')}
            className="bg-surface-container-high hover:bg-surface-variant text-on-surface flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-body-md font-medium shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span> Filter
          </button>
          <button
            onClick={() => showToast('Case queue exported to CSV')}
            className="bg-primary hover:bg-surface-tint text-on-primary flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-body-md font-medium shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span> Export
          </button>
        </div>
      </div>

      {/* Urgent Alert banner */}
      <div className="bg-error-container text-on-error-container p-4 rounded-xl shadow-sm border border-error/30 flex items-start gap-3">
        <span className="material-symbols-outlined text-error text-2xl mt-0.5">campaign</span>
        <div className="flex-1">
          <div className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-error">
            Urgent Regional Alert
          </div>
          <p className="text-sm font-body-md mt-0.5">
            Regional Blight Outbreak detected in North Sector. Priority verification requested for cases with confidence &lt; 70%.
          </p>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Pending */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-container-high relative overflow-hidden flex flex-col justify-between h-32">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-variant"></div>
          <div className="flex justify-between items-start">
            <div className="bg-surface-container rounded-full p-2 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">folder</span>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase font-bold">Pending</span>
          </div>
          <div>
            <div className="font-display text-display text-on-surface font-bold">
              {cases.filter((c) => c.status === 'pending_expert').length}
            </div>
            <div className="font-body-md text-on-surface-variant text-sm">Cases awaiting verification</div>
          </div>
        </div>

        {/* High Priority */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-error-container relative overflow-hidden flex flex-col justify-between h-32">
          <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
          <div className="flex justify-between items-start">
            <div className="bg-error-container rounded-full p-2 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-error-container">warning</span>
            </div>
            <span className="font-label-caps text-label-caps text-error uppercase font-bold">High Priority</span>
          </div>
          <div>
            <div className="font-display text-display text-on-background font-bold">15</div>
            <div className="font-body-md text-on-surface-variant text-sm">High-Risk Cases</div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-secondary-container relative overflow-hidden flex flex-col justify-between h-32">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
          <div className="flex justify-between items-start">
            <div className="bg-secondary-container rounded-full p-2 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-secondary-container">check_circle</span>
            </div>
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">Completed</span>
          </div>
          <div>
            <div className="font-display text-display text-on-surface font-bold">124</div>
            <div className="font-body-md text-on-surface-variant text-sm">Verified Today</div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-surface-container-high overflow-hidden">
        <div className="p-card-padding border-b border-surface-container-high bg-surface-bright flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Cases Awaiting Verification</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Case ID or crop..."
              className="pl-9 pr-4 py-2 rounded-lg border border-outline-variant bg-surface text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none w-full sm:w-64 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-caps text-label-caps border-b border-surface-container-high">
                <th className="p-4 py-3 font-semibold">Case ID</th>
                <th className="p-4 py-3 font-semibold">Crop</th>
                <th className="p-4 py-3 font-semibold">AI Diagnosis</th>
                <th className="p-4 py-3 font-semibold">Confidence</th>
                <th className="p-4 py-3 font-semibold">Date</th>
                <th className="p-4 py-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="font-body-md text-body-md text-on-surface divide-y divide-surface-container">
              {filteredCases.map((item) => (
                <tr
                  key={item.id}
                  className={`hover:bg-surface-container-lowest/50 transition-colors group ${
                    item.severity === 'Critical' ? 'bg-error-container/10' : ''
                  }`}
                >
                  <td className="p-4 font-bold text-primary">#{item.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-secondary text-sm">grass</span>
                      </div>
                      <span className="font-medium">{item.crop}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.severity === 'Critical'
                          ? 'bg-error-container text-on-error-container'
                          : 'bg-surface-container-high text-on-surface'
                      }`}
                    >
                      {item.aiDiagnosis}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-surface-variant rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.aiConfidence > 75 ? 'bg-primary' : 'bg-amber-600'}`}
                          style={{ width: `${item.aiConfidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{item.aiConfidence}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant text-sm">{item.date}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleOpenCase(item.id)}
                      className="text-primary hover:bg-primary-container hover:text-on-primary-container px-3 py-1.5 rounded-lg transition-colors font-bold text-sm flex items-center gap-1 mx-auto cursor-pointer"
                    >
                      <span>Review</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
