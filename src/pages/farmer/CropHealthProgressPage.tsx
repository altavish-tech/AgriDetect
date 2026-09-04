import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CropHealthProgressPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-container-margin py-6 flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface font-bold">
          Crop Health Progress
        </h1>
        <div className="inline-flex items-center gap-2 bg-surface-container text-on-surface-variant px-4 py-2 rounded-full border border-outline-variant">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            trending_up
          </span>
          <span className="font-body-md text-body-md font-semibold text-secondary">Improving</span>
        </div>
      </div>

      {/* AI Insight Note */}
      <div className="bg-surface-container-lowest ambient-shadow rounded-xl p-card-padding border border-outline-variant flex items-start gap-4">
        <div className="bg-surface-container-high rounded-full p-3 flex-shrink-0">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
        </div>
        <div>
          <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-1">AI Analysis</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Follow-up photo shows <strong className="text-secondary font-semibold">30% reduction</strong> in spotted leaf area compared to the initial scan after treatment application.
          </p>
        </div>
      </div>

      {/* Comparison View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous */}
        <div className="bg-surface-container-lowest ambient-shadow rounded-xl overflow-hidden border border-outline-variant flex flex-col">
          <div className="relative h-48 w-full">
            <img
              className="w-full h-full object-cover"
              alt="Severe leaf lesions on previous scan"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_wE8GZ_cOfDo4m5lETikacIkgPhBKnHiuMMLkOeWAwQE0JOFamvjKNsv-gKgF2njQZ6RW4g-jpx388ya7Vcawy7cpgkDivCXfiTi5he8CBylc0cQXWhhPmHB2Wx32ct-B8i2sas4MBYASG-rXoXXahvOB4rKuC6_m24qFC7BmuCt4eXBNdpW4iMA68dM9E6MUSF9uPl5mO7xCf_R1Ba67Vz00BkbvXC1QIEhSxUw7ND7po7ynPuu2lQ"
            />
            <div className="absolute top-3 left-3 bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-caps text-label-caps flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                error
              </span>
              Severe
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant bg-surface">
            <p className="font-body-md text-body-md font-semibold text-on-surface">Previous Scan</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Oct 12, 2023</p>
          </div>
        </div>

        {/* Current */}
        <div className="bg-surface-container-lowest ambient-shadow rounded-xl overflow-hidden border-2 border-primary-fixed-dim flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary z-10"></div>
          <div className="relative h-48 w-full">
            <img
              className="w-full h-full object-cover"
              alt="Recovering leaf with clear new green growth"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYxvfr55LrJ71x4J8KUn8jRhodHpamVNAeIb5hDHIEoiYu6_wogGnl-MWalccT1z8AxJ_l2-1k8WH4vE03g8czLbkFSo3UkNfqaKPq_80uAoq_AnZZSZvrR2eAmy-5hfYgougyf3IYSYJOfBBzsS_IAMi2nPtC1kDcT1GRn13xNtDRW3uy3w-VamjL6-Wa7xJQXk9BZNXp8Po6GDocxCa_UjLR7jJiSF8qzpVDjapfZw7EvtO6XAAtOg"
            />
            <div className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-caps text-label-caps flex items-center gap-1 shadow-sm font-bold">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              Improving
            </div>
          </div>
          <div className="p-4 border-t border-outline-variant bg-surface">
            <p className="font-body-md text-body-md font-semibold text-on-surface">Current Scan</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Today, 09:45 AM</p>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-surface-container-lowest ambient-shadow rounded-xl p-card-padding border border-outline-variant">
        <h3 className="font-body-lg text-body-lg font-semibold text-on-surface mb-4">Disease Severity Trend</h3>
        <div className="w-full h-40 relative">
          <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
            {/* Grid lines */}
            <line stroke="#d7e4ec" strokeDasharray="4" strokeWidth="1" x1="0" x2="400" y1="20" y2="20" />
            <line stroke="#d7e4ec" strokeDasharray="4" strokeWidth="1" x1="0" x2="400" y1="60" y2="60" />
            <line stroke="#d7e4ec" strokeDasharray="4" strokeWidth="1" x1="0" x2="400" y1="100" y2="100" />
            {/* Area fill */}
            <path d="M 0,20 L 100,30 L 200,60 L 300,90 L 400,105 L 400,100 L 0,100 Z" fill="#e9f6fd" opacity="0.5" />
            {/* Trend Line */}
            <path
              d="M 0,20 L 100,30 L 200,60 L 300,90 L 400,105"
              fill="none"
              stroke="#2a6b2c"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            {/* Data points */}
            <circle cx="0" cy="20" fill="#2a6b2c" r="4" />
            <circle cx="100" cy="30" fill="#2a6b2c" r="4" />
            <circle cx="200" cy="60" fill="#2a6b2c" r="4" />
            <circle cx="300" cy="90" fill="#2a6b2c" r="4" />
            <circle cx="400" cy="105" fill="#ffffff" r="5" stroke="#006e1c" strokeWidth="2" />
          </svg>
          <div className="flex justify-between w-full mt-2 text-on-surface-variant font-label-caps text-label-caps font-semibold">
            <span>Oct 1</span>
            <span>Oct 5</span>
            <span>Oct 9</span>
            <span>Oct 12</span>
            <span className="text-on-surface font-bold text-secondary">Today</span>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="mt-2 mb-6">
        <button
          onClick={() => navigate('/farmer/photo-capture')}
          className="w-full bg-secondary text-on-secondary font-body-lg text-body-lg font-semibold py-4 px-6 rounded-xl shadow-md hover:bg-surface-tint active:scale-[0.98] transition-all flex justify-center items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">add_a_photo</span>
          Submit another follow-up photo in 3 days
        </button>
      </div>
    </div>
  );
};
