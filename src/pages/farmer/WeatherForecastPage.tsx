import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const WeatherForecastPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const t = {
    en: {
      title: 'Weather Forecast',
      subtitle: 'Siwan District, Bihar',
      current: 'Current Conditions',
      hourly: 'Hourly Forecast',
      daily: '7-Day Forecast',
      sprayConditions: 'Spraying Conditions',
      optimal: 'Optimal',
      goodForSpraying: 'Good for spraying pesticides',
      windSpeed: 'Wind Speed',
      humidity: 'Humidity',
      precipitation: 'Precipitation',
      uvIndex: 'UV Index',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      recommendations: 'Recommendations',
      rec1: 'Excellent conditions for pesticide application',
      rec2: 'Low wind speeds ensure minimal drift',
      rec3: 'Moderate humidity helps absorption',
      rec4: 'No rain expected for next 48 hours',
      back: 'Back'
    },
    hi: {
      title: 'मौसम पूर्वानुमान',
      subtitle: 'सीवान जिला, बिहार',
      current: 'वर्तमान स्थिति',
      hourly: 'प्रति घंटा पूर्वानुमान',
      daily: '7-दिन का पूर्वानुमान',
      sprayConditions: 'छिड़काव की स्थिति',
      optimal: 'उत्तम',
      goodForSpraying: 'कीटनाशक छिड़काव के लिए अच्छा',
      windSpeed: 'हवा की गति',
      humidity: 'आर्द्रता',
      precipitation: 'वर्षा',
      uvIndex: 'यूवी सूचकांक',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      recommendations: 'सिफारिशें',
      rec1: 'कीटनाशक छिड़काव के लिए उत्कृष्ट स्थिति',
      rec2: 'कम हवा की गति न्यूनतम बहाव सुनिश्चित करती है',
      rec3: 'मध्यम आर्द्रता अवशोषण में मदद करती है',
      rec4: 'अगले 48 घंटों में बारिश की उम्मीद नहीं',
      back: 'वापस'
    }
  };

  const text = t[language];

  const hourlyData = [
    { time: '12 PM', temp: 32, icon: 'sunny', condition: language === 'hi' ? 'धूप' : 'Sunny' },
    { time: '1 PM', temp: 33, icon: 'sunny', condition: language === 'hi' ? 'धूप' : 'Sunny' },
    { time: '2 PM', temp: 34, icon: 'sunny', condition: language === 'hi' ? 'धूप' : 'Sunny' },
    { time: '3 PM', temp: 33, icon: 'partly_cloudy_day', condition: language === 'hi' ? 'आंशिक बादल' : 'Partly Cloudy' },
    { time: '4 PM', temp: 31, icon: 'partly_cloudy_day', condition: language === 'hi' ? 'आंशिक बादल' : 'Partly Cloudy' },
    { time: '5 PM', temp: 29, icon: 'cloudy', condition: language === 'hi' ? 'बादल' : 'Cloudy' },
  ];

  const dailyData = [
    { day: language === 'hi' ? 'आज' : 'Today', high: 34, low: 24, icon: 'sunny', rain: 10 },
    { day: language === 'hi' ? 'कल' : 'Tomorrow', high: 33, low: 23, icon: 'partly_cloudy_day', rain: 15 },
    { day: language === 'hi' ? 'बुधवार' : 'Wed', high: 32, low: 23, icon: 'partly_cloudy_day', rain: 20 },
    { day: language === 'hi' ? 'गुरुवार' : 'Thu', high: 31, low: 22, icon: 'cloudy', rain: 30 },
    { day: language === 'hi' ? 'शुक्रवार' : 'Fri', high: 30, low: 22, icon: 'rainy', rain: 60 },
    { day: language === 'hi' ? 'शनिवार' : 'Sat', high: 29, low: 21, icon: 'rainy', rain: 70 },
    { day: language === 'hi' ? 'रविवार' : 'Sun', high: 30, low: 22, icon: 'partly_cloudy_day', rain: 40 },
  ];

  return (
    <div className="p-container-margin max-w-5xl mx-auto space-y-gutter w-full pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            {text.title}
          </h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">{text.subtitle}</p>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-on-primary ambient-shadow">
        <div className="text-center">
          <span className="material-symbols-outlined text-[80px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
            sunny
          </span>
          <div className="font-display text-[56px] font-bold">32°C</div>
          <div className="font-headline-md text-headline-md opacity-90 mb-4">
            {language === 'hi' ? 'धूप' : 'Sunny'}
          </div>
          <div className="flex justify-center gap-6 text-sm">
            <div>
              <div className="opacity-80">{language === 'hi' ? 'अधिकतम' : 'High'}</div>
              <div className="font-bold text-lg">34°</div>
            </div>
            <div>
              <div className="opacity-80">{language === 'hi' ? 'न्यूनतम' : 'Low'}</div>
              <div className="font-bold text-lg">24°</div>
            </div>
          </div>
        </div>
      </div>

      {/* Spray Conditions Alert */}
      <div className="bg-secondary-container text-on-secondary-container rounded-xl p-4 flex items-start gap-3 ambient-shadow">
        <span className="material-symbols-outlined text-[24px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          agriculture
        </span>
        <div>
          <div className="font-body-lg text-body-lg font-bold mb-1">
            {text.sprayConditions}: {text.optimal}
          </div>
          <div className="font-body-md text-body-md opacity-90">{text.goodForSpraying}</div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">air</span>
            <span className="font-label-caps text-label-caps">{text.windSpeed}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">8 km/h</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">water_drop</span>
            <span className="font-label-caps text-label-caps">{text.humidity}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">65%</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">rainy</span>
            <span className="font-label-caps text-label-caps">{text.precipitation}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">10%</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
            <span className="font-label-caps text-label-caps">{text.uvIndex}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">7 (High)</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
            <span className="font-label-caps text-label-caps">{text.sunrise}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">5:42 AM</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30">
          <div className="flex items-center gap-2 text-on-surface-variant mb-2">
            <span className="material-symbols-outlined text-[20px]">bedtime</span>
            <span className="font-label-caps text-label-caps">{text.sunset}</span>
          </div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface">6:28 PM</div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4 font-bold">{text.hourly}</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30 flex flex-col items-center gap-2 min-w-[100px]"
            >
              <div className="font-label-caps text-label-caps text-on-surface-variant">{hour.time}</div>
              <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                {hour.icon}
              </span>
              <div className="font-headline-sm text-headline-sm font-bold text-on-surface">{hour.temp}°</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant text-center">{hour.condition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h2 className="font-headline-md text-headline-md text-on-background mb-4 font-bold">{text.daily}</h2>
        <div className="space-y-2">
          {dailyData.map((day, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest rounded-xl p-4 ambient-shadow border border-outline-variant/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 font-body-md text-body-md font-semibold text-on-surface">{day.day}</div>
                <span className="material-symbols-outlined text-[28px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {day.icon}
                </span>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px]">water_drop</span>
                  <span className="text-sm">{day.rain}%</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-on-surface-variant text-sm">{day.low}°</div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-primary/30 to-error rounded-full"></div>
                <div className="font-body-md text-body-md font-bold text-on-surface">{day.high}°</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-tertiary-container text-on-tertiary-container rounded-xl p-5 ambient-shadow">
        <h3 className="font-headline-sm text-headline-sm font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
          {text.recommendations}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] mt-0.5">check_circle</span>
            <span className="font-body-md text-body-md">{text.rec1}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] mt-0.5">check_circle</span>
            <span className="font-body-md text-body-md">{text.rec2}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] mt-0.5">check_circle</span>
            <span className="font-body-md text-body-md">{text.rec3}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="material-symbols-outlined text-[20px] mt-0.5">check_circle</span>
            <span className="font-body-md text-body-md">{text.rec4}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
