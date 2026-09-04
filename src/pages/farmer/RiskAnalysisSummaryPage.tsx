import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RiskAnalysisSummaryPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-container-margin space-y-gutter w-full">
      {/* Header */}
      <div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2 font-bold">
          Risk Analysis
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Detailed breakdown of current threat levels for your registered fields.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Risk Meter Card */}
        <div className="md:col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-container-highest flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-2 bg-error"></div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-8 w-full text-left font-bold">
            Current Status
          </h2>

          <div className="relative w-64 h-32 flex justify-center overflow-hidden mb-6">
            <div className="absolute bottom-0 w-64 h-64 rounded-full risk-dial-conic opacity-30"></div>
            <div className="absolute bottom-0 w-48 h-48 rounded-full bg-surface-container-lowest z-10 flex items-end justify-center pb-2">
              <div className="flex flex-col items-center">
                <span className="font-display text-display text-error leading-none font-bold">84%</span>
              </div>
            </div>
            {/* Needle */}
            <div className="absolute bottom-0 w-1.5 h-32 bg-on-surface z-20 origin-bottom transform rotate-[52deg] transition-transform duration-1000 ease-out">
              <div className="w-3.5 h-3.5 bg-error rounded-full absolute -top-1 -left-1 shadow-sm"></div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            <span className="font-status-number text-status-number text-error uppercase tracking-wider font-bold">
              High Risk
            </span>
          </div>
          <p className="font-body-md text-body-md text-center text-on-surface-variant max-w-xs">
            Conditions are highly favorable for disease outbreak. Immediate action recommended.
          </p>
        </div>

        {/* Explanation & Action Card */}
        <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-gutter">
          {/* Why High Risk */}
          <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.04)] border border-surface-container-highest flex-1">
            <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-4">Why is the risk high?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6 pb-4 border-b border-outline-variant/30">
              Recent weather conditions and reported cases in your area significantly elevate the risk of disease spread.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">water_drop</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-bold text-on-surface">Weather Factor</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Recent high humidity 85% (Risk Up)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-bold text-on-surface">Regional Cluster</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">12 cases reported in Village C (Risk Up)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">grass</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-bold text-on-surface">Crop Stage Sensitivity</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Flowering stage is highly vulnerable to spore germination</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">history</span>
                </div>
                <div>
                  <h4 className="font-body-md text-body-md font-bold text-on-surface">Local History</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Known Early Blight hotspot in Siwan sector</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Recommended Action */}
          <div className="bg-primary-container rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-label-caps text-label-caps text-on-primary-container mb-1 opacity-90 font-bold">
                Recommended Next Action
              </h4>
              <p className="font-body-lg text-body-lg font-bold text-on-primary-container">
                Apply preventive advisory immediately.
              </p>
            </div>
            <button
              onClick={() => navigate('/farmer/advisory')}
              className="bg-surface text-primary font-body-md text-body-md font-bold py-3 px-6 rounded-lg h-touch-target-min whitespace-nowrap shadow-sm hover:bg-surface-variant transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View Advisory</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
