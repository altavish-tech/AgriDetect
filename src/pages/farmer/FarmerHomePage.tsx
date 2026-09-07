import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

export const FarmerHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('goodMorning', language);
    if (hour < 17) return t('goodAfternoon', language);
    return t('goodEvening', language);
  };

  return (
    <div className="p-container-margin max-w-5xl mx-auto space-y-gutter w-full">
      {/* Greeting Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            {getGreeting()}, Ramesh 👋
          </h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            {language === 'hi' ? 'सीवान जिला, बिहार • फार्म ID #BR-8921' : 'Siwan District, Bihar • Farm ID #BR-8921'}
          </p>
        </div>
      </div>

      {/* Primary CTA: Report Crop Problem */}
      <button
        onClick={() => navigate('/farmer/report')}
        className="w-full bg-primary text-on-primary rounded-xl p-card-padding flex flex-col items-center justify-center gap-2 ambient-shadow hover:bg-surface-tint active:scale-95 transition-all duration-150 group text-center cursor-pointer"
      >
        <span className="material-symbols-outlined text-[48px] mb-2 group-hover:scale-110 transition-transform">
          add_a_photo
        </span>
        <span className="font-headline-md text-headline-md font-bold">{t('reportCropProblem', language)}</span>
        <span className="font-body-md text-body-md opacity-90">{t('takePhotoToAnalyze', language)}</span>
      </button>

      {/* Weather Widget */}
      <div className="bg-surface-container-low rounded-xl p-card-padding flex items-center justify-between ambient-shadow border border-outline-variant/30">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            sunny
          </span>
          <div>
            <div className="font-body-lg text-body-lg text-on-surface font-semibold">
              {t('sunny', language)}, 32°C
            </div>
            <div className="font-body-md text-body-md text-on-surface-variant">
              {language === 'hi' ? 'सीवान, बिहार' : 'Siwan, Bihar'}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-label-caps text-label-caps text-primary">{t('precipitation', language)}</div>
          <div className="font-status-number text-status-number text-on-surface">10%</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {/* My Crops */}
        <button
          onClick={() => navigate('/farmer/progress')}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 ambient-shadow hover:bg-surface-container-low active:bg-surface-variant transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined filled">grass</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface">{t('myCrops', language)}</span>
        </button>

        {/* Weather Forecast */}
        <button
          onClick={() => navigate('/farmer/weather')}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 ambient-shadow hover:bg-surface-container-low active:bg-surface-variant transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center">
            <span className="material-symbols-outlined">partly_cloudy_day</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface">{t('weatherForecast', language)}</span>
        </button>

        {/* Current Risk */}
        <button
          onClick={() => navigate('/farmer/risk-analysis')}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 ambient-shadow hover:bg-surface-container-low active:bg-surface-variant transition-colors relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
          <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
            <span className="material-symbols-outlined filled">warning</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface">{t('currentRisk', language)}</span>
        </button>

        {/* My Reports */}
        <button
          onClick={() => navigate('/farmer/progress')}
          className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-card-padding flex flex-col items-center justify-center gap-3 ambient-shadow hover:bg-surface-container-low active:bg-surface-variant transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center">
            <span className="material-symbols-outlined">description</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface">{t('myReports', language)}</span>
        </button>
      </div>

      {/* Recent Update Section */}
      <section className="mt-8">
        <h2 className="font-headline-md text-headline-md text-on-background mb-4 font-bold">{t('recentUpdate', language)}</h2>
        <div className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40 relative overflow-hidden flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Risk Bar at top edge */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#f59e0b]"></div>
          <div className="w-full md:w-32 h-32 md:h-24 rounded-lg overflow-hidden bg-surface-variant shrink-0 mt-2 md:mt-0">
            <img
              className="w-full h-full object-cover"
              alt="Tomato plant leaf showing early blight symptoms"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAd7DoRNQGp4leP67GGKLIj3M8dbo96j_ka09Cm6jdVN1lneoadcHfAWiD12owyc_CFRRhJHi8lyJ5gl7Ats-bi3qofeS_TlFTRT82vsF52speVh1ZX0k4Q7_5LdqWmvUChC5EK9g724FvGEf630Sdk3Mx6iHi98qBFYkp42uvkBkZCVexUumjkkA1zWntRvOXG-wK7I7bKTn82qt4UZOiHaHWqCLwu6Xn4jNUf4T77C1jl-pwxTHibg"
            />
          </div>
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="inline-block px-2 py-0.5 rounded bg-[#fef3c7] text-[#92400e] font-label-caps text-label-caps mb-1 font-bold">
                  {t('high', language)} {language === 'hi' ? 'जोखिम' : 'Risk'}
                </span>
                <h3 className="font-body-lg text-body-lg font-bold text-on-surface">
                  {language === 'hi' ? 'टमाटर अर्ली ब्लाइट' : 'Tomato Early Blight'}
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                {language === 'hi' ? 'कल' : 'Yesterday'}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              {language === 'hi' ? 'फील्ड सेक्टर 4 • फोटो द्वारा प्रारंभिक पहचान' : 'Field Sector 4 • Initial detection via photo'}
            </p>
            <div className="flex items-center gap-2 bg-surface-container p-2 rounded-lg border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[20px]">calendar_clock</span>
              <span className="font-body-md text-body-md text-primary font-semibold">{t('followUpDue', language)}</span>
            </div>
          </div>
          <div className="w-full md:w-auto flex md:flex-col gap-2 mt-2 md:mt-0">
            <button
              onClick={() => navigate('/farmer/progress')}
              className="flex-1 md:flex-none px-4 py-2 bg-secondary text-on-secondary rounded-lg font-body-md text-body-md font-semibold hover:bg-primary transition-colors text-center"
            >
              {t('viewDetails', language)}
            </button>
            <button
              onClick={() => navigate('/farmer/photo-capture')}
              className="flex-1 md:flex-none px-4 py-2 border border-outline text-on-surface rounded-lg font-body-md text-body-md font-semibold hover:bg-surface-container-low transition-colors text-center"
            >
              {t('logUpdate', language)}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
