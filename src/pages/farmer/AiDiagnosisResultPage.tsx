import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AiDiagnosisResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { reportDraft, showToast } = useApp();

  const handleAskExpert = () => {
    showToast('Case submitted to Agriculture Expert queue for priority review.');
    setTimeout(() => {
      navigate('/expert/dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto p-container-margin pt-6 w-full">
      <div className="mb-6 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="text-on-surface-variant hover:text-on-surface flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Diagnosis Result</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left Column: Image & Highlights */}
        <div className="md:col-span-7 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="relative w-full h-72 md:h-96">
              <img
                className="w-full h-full object-cover"
                alt="Diseased tomato leaf showing early blight concentric rings"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCYJU9JFjL_Dof0tJYG5kIteTjcoTmraHTexpYSIRnD9Fyy8l0uk186dIFMwLfMUfNE-u3f3jkmdkmiHiHxkBRZoCXN0DcWcWJGQca27AhOw7Qvz_lX2h_Tbz9CJ6F4-5Xr3C5Wz2sBWhLm4Cp90SfDUpZiR-jFpewqujKmNfreiByhIEs1WF2x8uw6FLwUHczI6tAhL5v84MhfoD6SOaD2YRwkRJCRYPL3z_PG_slCC-wVOIF-nsT1Q"
              />
              {/* AI Highlight Overlay */}
              <div className="absolute inset-0 border-4 border-error/50 rounded-lg m-4 flex items-center justify-center pointer-events-none">
                <div className="bg-error text-on-error font-label-caps text-label-caps px-3 py-1 rounded-full absolute -top-3 shadow-sm font-bold">
                  AI DETECTED SYMPTOMS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="md:col-span-5 flex flex-col gap-gutter">
          {/* Diagnosis Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-card-padding">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase font-bold">
                  Possible Disease
                </div>
                <h2 className="font-headline-md text-headline-md text-error font-bold">Tomato Early Blight</h2>
              </div>
              <span className="material-symbols-outlined text-error text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                warning
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4 bg-surface-container p-3 rounded-lg">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">AI Confidence</span>
                  <span className="font-body-md text-body-md font-bold text-primary">89%</span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              <span className="font-label-caps text-label-caps text-primary text-xs font-bold">(High)</span>
            </div>

            <p className="font-body-md text-body-md text-on-surface">
              Dark spots and yellowing patterns on the leaves indicate Early Blight. Prompt preventive spray and leaf pruning recommended.
            </p>
          </div>

          {/* Context Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-card-padding">
            <h3 className="font-body-md text-body-md font-bold text-on-surface mb-3 border-b border-outline-variant pb-2">
              Analysis Context
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Crop</span>
                <div className="flex items-center gap-1 font-body-md text-body-md font-semibold">
                  <span className="material-symbols-outlined text-secondary text-sm">grass</span> {reportDraft.crop}
                </div>
              </div>
              <div>
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Stage</span>
                <div className="flex items-center gap-1 font-body-md text-body-md font-semibold">
                  <span className="material-symbols-outlined text-secondary text-sm">local_florist</span> {reportDraft.stage}
                </div>
              </div>
              <div className="col-span-2">
                <span className="font-label-caps text-label-caps text-on-surface-variant block mb-1">Location</span>
                <div className="flex items-center gap-1 font-body-md text-body-md font-semibold">
                  <span className="material-symbols-outlined text-secondary text-sm">location_on</span> {reportDraft.location}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-auto pt-2">
            <button
              onClick={() => navigate('/farmer/advisory')}
              className="w-full bg-primary text-on-primary font-body-md text-body-md font-bold h-touch-target-min rounded-full flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm active:scale-95 duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined">psychiatry</span>
              View Crop Advisory
            </button>
            <button
              onClick={handleAskExpert}
              className="w-full border-2 border-primary text-primary font-body-md text-body-md font-bold h-touch-target-min rounded-full flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-150 cursor-pointer"
            >
              <span className="material-symbols-outlined">science</span>
              Ask Expert to Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
