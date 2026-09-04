import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CROPS } from '../../data/mockData';

export const ReportProblemStep1Page: React.FC = () => {
  const navigate = useNavigate();
  const { reportDraft, updateReportDraft, showToast } = useApp();

  const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'];

  const handleContinue = () => {
    navigate('/farmer/photo-capture');
  };

  return (
    <div className="flex-grow px-container-margin py-6 max-w-4xl mx-auto w-full">
      {/* Step Indicator */}
      <div className="mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <nav className="flex items-center gap-4 border-b border-outline-variant pb-2 min-w-max">
          <div className="border-b-2 border-primary text-primary font-bold px-2 pb-2 font-body-md text-body-md">
            1 Crop
          </div>
          <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
          <div className="text-on-surface-variant px-2 pb-2 font-body-md text-body-md">2 Details</div>
          <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
          <div className="text-on-surface-variant px-2 pb-2 font-body-md text-body-md">3 Photo</div>
          <span className="material-symbols-outlined text-outline text-sm">arrow_forward</span>
          <div className="text-on-surface-variant px-2 pb-2 font-body-md text-body-md">4 Submit</div>
        </nav>
      </div>

      <h1 className="font-headline-lg text-headline-lg mb-8 font-bold text-on-surface">Report Crop Problem</h1>

      {/* Selection Group: Crop */}
      <section className="mb-10">
        <h2 className="font-headline-md text-headline-md mb-4 font-semibold text-on-surface">Select Crop</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CROPS.map((c) => {
            const isSelected = reportDraft.crop.toLowerCase() === c.name.toLowerCase();
            return (
              <label key={c.id} className="cursor-pointer group">
                <input
                  type="radio"
                  name="crop_selection"
                  value={c.name}
                  checked={isSelected}
                  onChange={() => updateReportDraft({ crop: c.name })}
                  className="sr-only"
                />
                <div
                  className={`bg-surface-container-lowest border-2 rounded-lg p-card-padding flex flex-col items-center gap-3 transition-all duration-200 group-hover:shadow-md ${
                    isSelected
                      ? 'border-primary shadow-md bg-secondary-container/10 ring-2 ring-primary/20'
                      : 'border-outline-variant hover:border-primary'
                  }`}
                >
                  <img
                    className="w-16 h-16 object-cover rounded-full shadow-sm"
                    src={c.image}
                    alt={c.name}
                  />
                  <span className="font-body-lg text-body-lg font-semibold text-center text-on-surface">
                    {c.name}
                  </span>
                </div>
              </label>
            );
          })}

          {/* Other option */}
          <label className="cursor-pointer group">
            <input
              type="radio"
              name="crop_selection"
              value="Other"
              checked={reportDraft.crop === 'Other'}
              onChange={() => updateReportDraft({ crop: 'Other' })}
              className="sr-only"
            />
            <div
              className={`bg-surface-container-lowest border-2 rounded-lg p-card-padding flex flex-col items-center justify-center h-full gap-3 transition-all duration-200 group-hover:border-primary group-hover:shadow-md ${
                reportDraft.crop === 'Other' ? 'border-primary bg-secondary-container/10' : 'border-outline-variant'
              }`}
            >
              <span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors">
                more_horiz
              </span>
              <span className="font-body-lg text-body-lg font-semibold text-center text-on-surface">Other</span>
            </div>
          </label>
        </div>
      </section>

      {/* Radio Group: Crop Stage */}
      <section className="mb-10">
        <h2 className="font-headline-md text-headline-md mb-4 font-semibold text-on-surface">Crop Stage</h2>
        <div className="flex flex-wrap gap-3">
          {stages.map((stage) => {
            const isSelected = reportDraft.stage.toLowerCase() === stage.toLowerCase();
            return (
              <label key={stage} className="cursor-pointer">
                <input
                  type="radio"
                  name="crop_stage"
                  value={stage}
                  checked={isSelected}
                  onChange={() => updateReportDraft({ stage })}
                  className="sr-only"
                />
                <div
                  className={`rounded-full px-6 py-3 transition-all text-sm font-medium ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container-low border border-outline-variant text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {stage}
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Location Input */}
      <section className="mb-10">
        <div className="bg-surface-container-high rounded-xl p-card-padding flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Current Location</p>
              <p className="font-body-lg text-body-lg font-semibold text-on-surface">{reportDraft.location}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('GPS location calibrated: Siwan District, Bihar (26.2196° N, 84.3567° E)')}
            className="border-2 border-primary text-primary px-4 py-2 rounded-full font-body-md text-body-md font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors min-h-[48px]"
          >
            Edit
          </button>
        </div>
      </section>

      {/* Continue CTA */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleContinue}
          className="w-full md:w-auto bg-primary text-on-primary px-8 py-3.5 rounded-full font-body-lg text-body-lg font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all shadow-md min-h-[48px] min-w-[200px] flex items-center justify-center gap-2"
        >
          <span>Continue to Photo</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
