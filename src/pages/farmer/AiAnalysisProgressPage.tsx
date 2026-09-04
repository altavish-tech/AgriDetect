import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const AiAnalysisProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { reportDraft } = useApp();
  const [step, setStep] = useState(2); // 0 to 4 steps

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(3), 1200);
    const timer2 = setTimeout(() => setStep(4), 2400);
    const timer3 = setTimeout(() => {
      // Navigate to high confidence diagnosis by default after full sequence
      navigate('/farmer/diagnosis');
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-container-margin min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Analysis Visualization Area */}
        <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
          {/* Background Pulse Effect */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 pulse-ring"></div>
          <div className="absolute inset-4 rounded-full border-2 border-primary/40 pulse-ring" style={{ animationDelay: '0.5s' }}></div>

          {/* Central Element Container */}
          <div className="relative w-48 h-48 bg-surface-container-highest rounded-full shadow-lg border-4 border-surface overflow-hidden z-10 flex items-center justify-center">
            {/* Animated Background Texture */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary via-primary-container to-surface"></div>

            {/* Scanner Line Overlay */}
            <div
              className="absolute left-0 w-full h-2 bg-secondary-fixed/90 shadow-[0_0_15px_rgba(148,249,144,0.9)]"
              style={{ animation: 'scan 2s ease-in-out infinite alternate' }}
            ></div>

            {/* Central Image */}
            <img
              className="w-full h-full object-cover rounded-full p-2"
              alt="Crop leaf under AI scan"
              src={reportDraft.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCx62hAVg7rL9SBsqf_O0MLg_Hh5YR4y0MVmWuLqurxX6EbQBkYEMOzgu6o_6YeXy6FEfQJDiNjtvjvM0uB7LYW7dMqdmcY-rRcM79oS-x5zIxCYJ_sqzR1xt6_74QLU5BrGHX_fQbFEHYC3jQ4V4why5t5Y0FrvtRDW5YK7qmxi108Io3mNqyGsScVZMKPu_HRWgdgxalWF7FlmbM3SXctCHqVd3Qts4GoWz_i8GMyK1hSkfK_-rWEA'}
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute top-0 right-0 bg-surface text-primary-container font-label-caps text-label-caps px-3 py-1 rounded-full shadow-md z-20 flex items-center gap-1 border border-primary-container/20 font-bold">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            AI Active
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface text-center mb-10 font-bold tracking-tight">
          Analyzing Your Crop...
        </h1>

        {/* Analysis Checklist Container */}
        <div className="w-full bg-surface/80 backdrop-blur-md rounded-xl p-6 shadow-[0_8px_32px_rgba(0,69,13,0.08)] border border-surface-variant flex flex-col gap-4">
          {/* Step 1: Image received */}
          <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg border border-transparent">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <div className="flex-1">
              <p className="font-body-md text-body-md text-on-surface font-medium">Image received</p>
            </div>
          </div>

          {/* Step 2: Crop identified */}
          <div className="flex items-center gap-4 bg-surface-container-low p-3 rounded-lg border border-transparent">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check
              </span>
            </div>
            <div className="flex-1">
              <p className="font-body-md text-body-md text-on-surface font-medium">Crop identified</p>
            </div>
            <span className="bg-surface text-primary font-label-caps text-label-caps px-3 py-1 rounded-full border border-outline-variant font-bold">
              {reportDraft.crop}
            </span>
          </div>

          {/* Step 3: Detecting disease/pest */}
          <div className={`flex items-center gap-4 p-3 rounded-lg border ${step >= 3 ? 'bg-surface-container-low border-transparent' : 'bg-surface border-2 border-primary-container shadow-sm'}`}>
            {step >= 3 ? (
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-primary-container border-t-transparent spin-slow flex-shrink-0"></div>
            )}
            <div className="flex-1">
              <p className="font-body-md text-body-md text-primary font-semibold">Detecting disease/pest</p>
              <p className="text-[12px] text-on-surface-variant mt-0.5">Cross-referencing 10k+ patterns...</p>
            </div>
          </div>

          {/* Step 4: Checking weather conditions */}
          <div className={`flex items-center gap-4 p-3 rounded-lg ${step >= 4 ? 'bg-surface-container-low' : 'opacity-60'}`}>
            {step >= 4 ? (
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-outline-variant flex items-center justify-center flex-shrink-0"></div>
            )}
            <div className="flex-1">
              <p className="font-body-md text-body-md text-on-surface">Checking weather conditions (Siwan)</p>
            </div>
          </div>

          {/* Step 5: Assessing local risk */}
          <div className={`flex items-center gap-4 p-3 rounded-lg ${step >= 4 ? 'bg-surface border-2 border-secondary' : 'opacity-60'}`}>
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent spin-slow flex-shrink-0"></div>
            <div className="flex-1">
              <p className="font-body-md text-body-md text-on-surface-variant">Assessing local risk</p>
            </div>
          </div>
        </div>

        {/* Workflow demo switchers */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={() => navigate('/farmer/diagnosis')}
            className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-body-md text-sm font-semibold hover:bg-primary-container cursor-pointer shadow-sm text-center"
          >
            Skip to High-Confidence Result (89%)
          </button>
          <button
            onClick={() => navigate('/farmer/uncertain')}
            className="px-5 py-2.5 rounded-full border-2 border-error text-error font-body-md text-sm font-semibold hover:bg-error-container/20 cursor-pointer text-center"
          >
            Simulate Low-Confidence Result (52%)
          </button>
        </div>
      </div>
    </div>
  );
};
