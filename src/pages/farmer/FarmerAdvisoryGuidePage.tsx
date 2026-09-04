import React from 'react';
import { useApp } from '../../context/AppContext';

export const FarmerAdvisoryGuidePage: React.FC = () => {
  const { language, setLanguage, showToast } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="px-container-margin py-6 max-w-5xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary font-bold mb-2">
            What Should You Do?
          </h1>
          <div className="flex items-center gap-2 bg-error-container text-on-error-container px-3 py-1.5 rounded-full inline-flex">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              pest_control
            </span>
            <span className="font-body-md text-body-md font-bold">Tomato Early Blight</span>
            <span className="material-symbols-outlined text-lg ml-1 text-secondary font-bold" title="Expert Verified">
              verified
            </span>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex bg-surface-container-high rounded-lg p-1 self-start">
          <button
            onClick={() => setLanguage('hi')}
            className={`px-4 py-2 rounded-md font-body-md text-body-md transition-colors ${
              language === 'hi' ? 'bg-surface text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md font-body-md text-body-md transition-colors ${
              language === 'en' ? 'bg-surface text-primary shadow-sm font-bold' : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Immediate Action */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-error flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined">local_florist</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Immediate Action</h2>
          </div>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant flex-grow">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-error mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Remove severely affected leaves and destroy them outside the field</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-error mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Maintain strict field hygiene and sanitize tools after pruning</span>
            </li>
          </ul>
        </div>

        {/* Prevention */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-primary flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Prevention</h2>
          </div>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant flex-grow">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Maintain adequate plant spacing (60 cm) for air circulation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Monitor nearby plants twice weekly for secondary lesion formation</span>
            </li>
          </ul>
        </div>

        {/* IPM */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-secondary flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined">bug_report</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Integrated Pest Mgmt</h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mb-3">Focus on non-chemical methods first.</p>
          <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/30 text-sm mt-auto">
            <span className="font-bold text-secondary">Tip:</span> Introduce beneficial microorganisms (Trichoderma harzianum) or use neem-based organic sprays before resorting to strong chemicals.
          </div>
        </div>

        {/* Treatment Guidance */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-l-4 border-tertiary flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined">medication</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Treatment Guidance</h2>
          </div>
          <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant flex-grow">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Use approved contact fungicide (Consult local agro center for 'Mancozeb 75% WP')</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-tertiary mt-0.5 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>Follow product label: Dilute 2.5g per liter of water during dry hours</span>
            </li>
          </ul>
        </div>

        {/* Avoid (Full Width) */}
        <div className="md:col-span-2 bg-[#fff5f5] rounded-xl p-card-padding shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-[#ffdad6] flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-error text-on-error flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[28px]">warning</span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-[#93000a] mb-1 font-bold">Avoid</h2>
            <p className="font-body-lg text-body-lg text-[#ba1a1a]">
              Do not overhead irrigate during evenings. Extended leaf wetness accelerates fungal spore germination.
            </p>
          </div>
        </div>
      </div>

      {/* Print / Export button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handlePrint}
          className="bg-primary text-on-primary font-body-md text-body-md font-bold py-3 px-8 rounded-full shadow-md hover:bg-surface-tint transition-colors active:scale-95 flex items-center gap-2 h-touch-target-min cursor-pointer"
        >
          <span className="material-symbols-outlined">print</span>
          Print Advisory Guide
        </button>
      </div>
    </div>
  );
};
