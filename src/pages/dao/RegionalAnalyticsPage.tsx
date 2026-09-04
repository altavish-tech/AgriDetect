import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VILLAGE_RISKS } from '../../data/mockData';

export const RegionalAnalyticsPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedCrop, setSelectedCrop] = useState('All Crops');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Disease Analytics &amp; Trends
          </h1>
          <p className="text-on-surface-variant font-body-md mt-1">
            Epidemiological intelligence, temporal progression, and village-level vulnerability metrics.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => showToast('Compiling analytical PDF dossier for Siwan District...')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface text-primary border border-outline rounded-full hover:bg-surface-container-low transition-colors font-bold h-touch-target-min cursor-pointer text-sm"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>PDF Report</span>
          </button>
          <button
            onClick={() => showToast('Aggregated village case records exported to CSV.')}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface text-primary border border-outline rounded-full hover:bg-surface-container-low transition-colors font-bold h-touch-target-min cursor-pointer text-sm"
          >
            <span className="material-symbols-outlined text-sm">dataset</span>
            <span>CSV Data</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Date Range
            </label>
            <select className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Current Kharif Season</option>
              <option>This Year (2024)</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Crop Type
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>All Crops</option>
              <option>Tomato</option>
              <option>Wheat</option>
              <option>Maize</option>
              <option>Rice</option>
              <option>Potato</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Region / Block
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none"
            >
              <option>All Regions (Siwan)</option>
              <option>North Valley Sector</option>
              <option>Village A Sector</option>
              <option>Eastern Plains</option>
              <option>Southern Basin</option>
            </select>
          </div>
          <div>
            <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
              Disease Type
            </label>
            <select className="w-full bg-surface border border-outline rounded-lg p-2 text-on-surface h-10 text-sm focus:border-primary outline-none">
              <option>All Pathogens &amp; Pests</option>
              <option>Early Blight (Alternaria)</option>
              <option>Fall Armyworm (Spodoptera)</option>
              <option>Stem Rust (Puccinia)</option>
              <option>Late Blight (Phytophthora)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bento Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant col-span-1 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold text-base">
            Disease-wise Distribution
          </h3>
          <div className="flex-1 flex items-center justify-center min-h-[220px] relative">
            <div className="w-44 h-44 rounded-full bg-surface-container border-8 border-surface flex items-center justify-center relative shadow-inner overflow-hidden">
              <div
                className="absolute inset-0 bg-error opacity-75"
                style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 100% 0, 100% 40%)' }}
              ></div>
              <div
                className="absolute inset-0 bg-amber-500 opacity-60"
                style={{ clipPath: 'polygon(50% 50%, 100% 40%, 100% 100%, 50% 100%)' }}
              ></div>
              <div
                className="absolute inset-0 bg-primary opacity-50"
                style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0 100%, 0 50%)' }}
              ></div>
              <div className="w-20 h-20 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center z-10 shadow-sm">
                <span className="text-xs font-bold text-on-surface">Total</span>
                <span className="font-status-number text-primary font-bold text-sm">1,248</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-error"></span> Blight (42%)
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span> Armyworm (31%)
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="w-3 h-3 rounded-full bg-primary"></span> Rust (27%)
            </div>
          </div>
        </div>

        {/* Area / Trend Chart Card */}
        <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant col-span-1 md:col-span-2 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary"></div>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold text-base">
            Weekly Incident Volume by Block (Trend)
          </h3>
          <div className="flex-1 flex items-end justify-between min-h-[220px] relative border-b border-l border-outline-variant pb-2 pl-2 gap-3">
            <div className="flex-1 h-[30%] bg-primary opacity-50 rounded-t-sm"></div>
            <div className="flex-1 h-[45%] bg-primary opacity-60 rounded-t-sm"></div>
            <div className="flex-1 h-[60%] bg-primary opacity-70 rounded-t-sm"></div>
            <div className="flex-1 h-[80%] bg-primary opacity-80 rounded-t-sm"></div>
            <div className="flex-1 h-[50%] bg-primary opacity-60 rounded-t-sm"></div>
            <div className="flex-1 h-[70%] bg-primary opacity-75 rounded-t-sm"></div>
            <div className="flex-1 h-[95%] bg-error opacity-90 rounded-t-sm"></div>
            <div className="flex-1 h-[82%] bg-error opacity-80 rounded-t-sm"></div>
          </div>
          <div className="flex justify-between text-xs text-on-surface-variant mt-2 px-1 font-label-caps font-semibold">
            <span>W1</span>
            <span>W2</span>
            <span>W3</span>
            <span>W4</span>
            <span>W5</span>
            <span>W6</span>
            <span className="text-error font-bold">W7 (Peak)</span>
            <span>W8 (Proj)</span>
          </div>
        </div>
      </div>

      {/* Village Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-card-padding border-b border-outline-variant bg-surface flex justify-between items-center">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-base">
            Village-level Risk &amp; Outbreak Summary
          </h3>
          <span className="text-xs text-on-surface-variant font-medium">5 Sectors Audited</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Village Name</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Active Cases</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Risk Level</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Trend (7 Days)</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-sm font-medium">
              {VILLAGE_RISKS.map((village) => (
                <tr key={village.name} className="hover:bg-surface-container-lowest transition-colors">
                  <td className="p-4 font-bold text-on-surface">{village.name}</td>
                  <td className="p-4">{village.activeCases}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        village.riskLevel === 'High'
                          ? 'bg-error-container text-on-error-container'
                          : village.riskLevel === 'Medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {village.riskLevel}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className={`flex items-center gap-1 font-bold ${
                        village.trendDirection === 'up' ? 'text-error' : village.trendDirection === 'down' ? 'text-secondary' : 'text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {village.trendDirection === 'up' ? 'trending_up' : village.trendDirection === 'down' ? 'trending_down' : 'trending_flat'}
                      </span>
                      <span>{village.trend}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => showToast(`Drill-down insights for ${village.name} sector opened.`)}
                      className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-surface-container-low transition-colors cursor-pointer"
                      title="Inspect Sector"
                    >
                      <span className="material-symbols-outlined text-lg">visibility</span>
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
