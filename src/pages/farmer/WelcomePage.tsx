import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';

export const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, showToast, setCurrentRole } = useApp();

  const handleStart = () => {
    setCurrentRole('farmer');
    navigate('/farmer/home');
  };

  const handleVoiceReport = () => {
    setCurrentRole('farmer');
    showToast('Voice Reporting activated. Listening for your crop issue...');
    setTimeout(() => {
      navigate('/farmer/report');
    }, 1200);
  };

  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-center font-sans text-on-surface p-container-margin relative">
      {/* Top bar with Role Switcher for easy testing */}
      <div className="w-full max-w-md flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-primary font-bold text-lg">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>agriculture</span>
          <span>AgriDetect</span>
        </div>
        <RoleSwitcher />
      </div>

      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-between">
        {/* Header / Illustration Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
          {/* Hero Illustration */}
          <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm mb-4">
            <img
              className="w-full h-full object-cover"
              alt="Farmer examining healthy crop"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKDTzRmuRgw0lq0lF6Ost7rtLI9h-zwFB70tynSoB-nfKq2VufWXAsxOL12E6YnojwszoD847hdx45VP9JF8c0ZzDz8ql5-4h9Ti08iJL4-lqjY-tDTaTrhCMViJwvhsneSAbYtCP-xKs54Jbu6MReiOW9X2GkaDQhMmnrxQRAilovpmw_nzoJhpf8Ovf4FUozGucU3yjxGBAKfIBrDAbh8l3_qywm2pDrymLD8mRySCbbqYuis8VdZw"
            />
          </div>

          {/* Typography */}
          <div className="space-y-2">
            <h1 className="font-display text-display text-primary">AgriDetect</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {language === 'hi' ? 'जल्दी पहचानें। अपनी फसल बचाएं।' : 'Detect Early. Protect Your Crop.'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 mb-8">
          {/* Primary Action */}
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 bg-primary text-on-primary rounded-xl h-14 font-headline-md text-headline-md shadow-sm transition-transform active:scale-95 hover:bg-primary-container"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
            {language === 'hi' ? 'मेरी फसल जांचें' : 'Check My Crop'}
          </button>

          {/* Secondary Action */}
          <button
            onClick={handleVoiceReport}
            className="w-full flex items-center justify-center gap-3 border-2 border-secondary text-secondary rounded-xl h-14 font-headline-md text-headline-md bg-transparent transition-transform active:scale-95 hover:bg-secondary-container/20"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
            {language === 'hi' ? 'आवाज़ से रिपोर्ट करें' : 'Report by Voice'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="w-full flex justify-between items-center py-4 border-t border-outline-variant">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">language</span>
            {language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
          </button>

          <button
            onClick={() => showToast('AgriDetect Helpline: Call 1800-180-1551 (Toll Free)')}
            className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">help</span>
            Need Help?
          </button>
        </div>
      </div>
    </div>
  );
};
