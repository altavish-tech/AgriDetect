import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const ExpertCaseAnalysisPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const { getCaseById, updateCaseVerification, showToast } = useApp();

  const activeCase = getCaseById(caseId || 'AD-7829-T') || getCaseById('AD-7829-T');

  const [diagnosis, setDiagnosis] = useState(activeCase?.aiDiagnosis || 'Early Blight');
  const [comments, setComments] = useState(
    'Alternaria solani confirmed. Prune lower 3 branches immediately. Spray Mancozeb 75% WP @ 2.5g/L.'
  );
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!activeCase) {
    return (
      <div className="p-8 text-center">
        <p className="text-error font-bold">Case not found.</p>
        <button onClick={() => navigate('/expert/dashboard')} className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-lg">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSubmitVerification = () => {
    updateCaseVerification(activeCase.id, diagnosis, comments);
    setTimeout(() => {
      navigate('/expert/dashboard');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      {/* Header */}
      <div className="px-container-margin py-4 border-b border-outline-variant bg-surface-container-lowest sticky top-0 z-20 shadow-xs flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/expert/dashboard')}
            className="p-1.5 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Case #{activeCase.id}</h2>
            <p className="text-on-surface-variant text-xs mt-0.5">
              Submitted by Farmer {activeCase.farmerName} • {activeCase.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast(`Field History: 2 prior cases logged this season.`)}
            className="px-3 py-1.5 rounded-lg border border-outline text-on-surface hover:bg-surface-container-low transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">history</span> History
          </button>
          <button
            onClick={() => showToast(`Shareable case link copied: https://agridetect.gov.in/cases/${activeCase.id}`)}
            className="px-3 py-1.5 rounded-lg border border-outline text-on-surface hover:bg-surface-container-low transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">share</span> Share
          </button>
        </div>
      </div>

      {/* Multi-pane Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-container-margin overflow-y-auto">
        {/* Left Pane: High-res Image (Col 1-5) */}
        <div className="lg:col-span-5 flex flex-col gap-4 min-h-[380px] bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setZoomLevel((z) => (z === 1 ? 1.4 : 1))}
              className="w-10 h-10 bg-surface/90 backdrop-blur rounded-full flex items-center justify-center text-on-surface shadow-sm hover:bg-surface transition cursor-pointer"
              title="Toggle Zoom"
            >
              <span className="material-symbols-outlined">{zoomLevel > 1 ? 'zoom_out' : 'zoom_in'}</span>
            </button>
            <button
              onClick={() => showToast('Full resolution inspection view enabled')}
              className="w-10 h-10 bg-surface/90 backdrop-blur rounded-full flex items-center justify-center text-on-surface shadow-sm hover:bg-surface transition cursor-pointer"
              title="Full frame"
            >
              <span className="material-symbols-outlined">crop_free</span>
            </button>
          </div>

          <div className="flex-1 relative bg-surface-container group cursor-crosshair overflow-hidden flex items-center justify-center">
            <img
              src={activeCase.imageUrl}
              alt="High resolution crop lesion analysis"
              style={{ transform: `scale(${zoomLevel})` }}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            {/* AI Bounding Boxes */}
            {activeCase.lesions?.map((lesion) => (
              <div
                key={lesion.id}
                style={{
                  top: lesion.top,
                  left: lesion.left,
                  width: lesion.width,
                  height: lesion.height,
                }}
                className="absolute border-2 border-error rounded-sm shadow-[0_0_8px_rgba(186,26,26,0.5)] pointer-events-none"
              >
                <span className="absolute -top-5 left-0 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                  {lesion.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Center Pane: Context & Environment (Col 6-8) */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Metadata Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-card-padding relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
            <h3 className="font-headline-md text-body-lg text-on-surface font-semibold mb-4">Case Context</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined filled">grass</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Crop</p>
                  <p className="font-medium text-on-surface">
                    {activeCase.crop} <span className="text-on-surface-variant text-xs font-normal">({activeCase.scientificName || 'Solanum lycopersicum'})</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">filter_vintage</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Stage</p>
                  <p className="font-medium text-on-surface">{activeCase.stage}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary-container">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-label-caps uppercase tracking-wider">Location</p>
                  <p className="font-medium text-on-surface">{activeCase.sector}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-card-padding">
            <h3 className="font-headline-md text-body-lg text-on-surface font-semibold mb-4">Environmental Data</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                <div className="flex items-center gap-1.5 text-primary mb-1">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                  <span className="text-xs font-semibold">Humidity</span>
                </div>
                <p className="font-status-number text-status-number text-on-surface">{activeCase.environmentalData.humidity}</p>
                <p className="text-[11px] text-error font-bold mt-1">{activeCase.environmentalData.humidityStatus}</p>
              </div>

              <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                <div className="flex items-center gap-1.5 text-secondary mb-1">
                  <span className="material-symbols-outlined text-[18px]">thermostat</span>
                  <span className="text-xs font-semibold">Temp</span>
                </div>
                <p className="font-status-number text-status-number text-on-surface">{activeCase.environmentalData.temperature}</p>
                <p className="text-[11px] text-secondary font-bold mt-1">{activeCase.environmentalData.temperatureStatus}</p>
              </div>

              <div className="col-span-2 bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-tertiary-container">
                  <span className="material-symbols-outlined text-[18px]">dry</span>
                  <span className="text-xs font-semibold">Soil Moisture</span>
                </div>
                <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-xs font-bold">
                  {activeCase.environmentalData.soilMoisture}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane: AI & Expert Verification (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* AI Prediction */}
          <div className="bg-surface-container-lowest rounded-xl border-2 border-secondary shadow-sm p-card-padding relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-secondary text-on-secondary px-3 py-1 rounded-bl-lg text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">smart_toy</span> AI Analysis
            </div>
            <h3 className="text-xs text-on-surface-variant font-label-caps uppercase mb-1 mt-1 font-bold">
              Primary Prediction
            </h3>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="font-headline-md text-headline-md text-on-surface font-bold">{activeCase.aiDiagnosis}</p>
              <span className="text-secondary font-bold text-lg">({activeCase.aiConfidence}%)</span>
            </div>
            <div className="w-full bg-surface-variant rounded-full h-2.5 mb-3 overflow-hidden">
              <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${activeCase.aiConfidence}%` }}></div>
            </div>
            <p className="text-xs text-on-surface-variant mb-4">
              Suspected pathogen confirmed. Atypical lesion margins require expert differential confirmation.
            </p>

            {activeCase.aiAlternativeDiagnosis && (
              <div className="border-t border-outline-variant pt-3">
                <p className="text-xs text-on-surface-variant font-label-caps uppercase mb-2 font-bold">
                  Alternative Possibilities
                </p>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span className="text-on-surface">{activeCase.aiAlternativeDiagnosis}</span>
                  <span className="text-on-surface-variant font-semibold">{activeCase.aiAlternativeConfidence}%</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-outline h-1.5 rounded-full" style={{ width: `${activeCase.aiAlternativeConfidence}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-card-padding flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline-md text-body-lg text-on-surface font-semibold mb-4 font-bold">
                Expert Verification
              </h3>
              <div className="mb-4">
                <label className="block text-xs font-label-caps uppercase font-bold text-on-surface mb-1">
                  Final Confirmed Diagnosis
                </label>
                <select
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full bg-surface border-2 border-outline focus:border-primary rounded-lg p-2.5 text-on-surface font-medium outline-none"
                >
                  <option value="Tomato Early Blight">Tomato Early Blight (Alternaria solani)</option>
                  <option value="Septoria Leaf Spot">Septoria Leaf Spot</option>
                  <option value="Late Blight">Late Blight (Phytophthora)</option>
                  <option value="Nutrient Deficiency">Magnesium / Nitrogen Deficiency</option>
                  <option value="Bacterial Canker">Bacterial Canker</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-label-caps uppercase font-bold text-on-surface mb-1">
                  Pathologist Recommendation / Advice
                </label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={4}
                  className="w-full bg-surface border-2 border-outline focus:border-primary rounded-lg p-2.5 text-sm text-on-surface outline-none resize-none"
                  placeholder="Provide explicit fungicide recommendations, dosage, and preventive steps..."
                ></textarea>
              </div>
            </div>

            <button
              onClick={handleSubmitVerification}
              className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3 px-4 rounded-xl shadow-md transition-transform active:scale-[0.98] flex items-center justify-center gap-2 h-touch-target-min cursor-pointer"
            >
              <span className="material-symbols-outlined filled">verified</span>
              Submit Verification & Notify Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
