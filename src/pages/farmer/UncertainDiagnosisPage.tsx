import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const UncertainDiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast, setCurrentRole } = useApp();

  const handleSendToExpert = () => {
    showToast('Case sent to Senior Agriculture Pathologist for verification.');
    setCurrentRole('expert');
    setTimeout(() => {
      navigate('/expert/dashboard');
    }, 1200);
  };

  return (
    <div className="flex-grow px-container-margin py-6 flex flex-col items-center max-w-3xl mx-auto w-full">
      {/* Status Header */}
      <div className="w-full flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-error-container text-on-error-container rounded-full flex items-center justify-center mb-4 shadow-ambient">
          <span className="material-symbols-outlined text-[40px]">warning</span>
        </div>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-error mb-2 font-bold">
          Diagnosis Uncertain
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          We could not confidently identify the problem from this image alone.
        </p>
      </div>

      {/* AI Confidence Card */}
      <div className="w-full bg-surface-container-lowest rounded-xl shadow-ambient p-card-padding relative overflow-hidden mb-8 border border-outline-variant">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-surface-variant">
          <div className="h-full bg-error w-[52%]"></div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-body-md text-body-md font-semibold text-on-surface">AI Confidence Score</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Expert verification helps avoid incorrect chemical treatment.
            </p>
          </div>
          <div className="flex items-end gap-1">
            <span className="font-display text-display text-error">52</span>
            <span className="font-status-number text-status-number text-error mb-2">%</span>
          </div>
        </div>

        {/* Image Preview */}
        <div className="mt-6 rounded-lg overflow-hidden h-44 w-full relative">
          <img
            className="object-cover w-full h-full absolute inset-0"
            alt="Ambiguous plant leaf requiring expert verification"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUi3XIem5U4aJ0YzN6rno3T6stNMC-Db46i_3uFgIAnJREnhFHhkxvCYL12WWEeDHD-gTWoQCqobkWecVlE-iuBBYAA8mKH8ruFNQpJ5AxFuEDodCL-Kzv2-q8UhyuzYLIbvifLAlXpacR0T9ttzFQVyAlpgjJphpLQ_NdafLQ1YHlv3UuvAf3z88hV_6cxgduZxBrREfWoHRh4DFoqES9LdsFFPHD9yLZHcfyqEZzPROFjaQyJcg9UQ"
          />
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[36px] opacity-80">image_search</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-4 mb-8">
        <button
          onClick={handleSendToExpert}
          className="w-full min-h-touch-target-min bg-primary text-on-primary rounded-full font-body-md text-body-md font-semibold flex items-center justify-center gap-2 hover:bg-surface-tint transition-all active:scale-[0.98] shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined">psychiatry</span>
          Send to Agriculture Expert
        </button>

        <button
          onClick={() => navigate('/farmer/photo-capture')}
          className="w-full min-h-touch-target-min border-2 border-primary text-primary rounded-full font-body-md text-body-md font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined">photo_camera</span>
          Upload a Better Photo
        </button>

        <button
          onClick={() => showToast('Voice memo added: "Plant showing wilt and lower leaf spots."')}
          className="w-full min-h-touch-target-min border border-outline text-on-surface rounded-full font-body-md text-body-md flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-on-surface-variant">mic</span>
          Describe the Problem
        </button>
      </div>
    </div>
  );
};
