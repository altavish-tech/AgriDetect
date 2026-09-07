import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

export const CropPhotoCapturePage: React.FC = () => {
  const navigate = useNavigate();
  const { updateReportDraft, showToast, language } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleCaptureSimulated = () => {
    // Simulate taking a photo
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        updateReportDraft({ imageUrl: result });
        showToast(language === 'hi' ? 'फोटो अपलोड हो गई।' : 'Photo uploaded from device storage.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!photoPreview) {
      showToast(language === 'hi' ? 'कृपया पहले फोटो लें।' : 'Please capture a photo first.');
      return;
    }
    navigate('/farmer/analyzing');
  };

  const handleVoiceNote = () => {
    updateReportDraft({ voiceNote: true });
    showToast(language === 'hi' 
      ? 'आवाज़ नोट रिकॉर्ड किया गया: "टमाटर के पत्तों पर 3 दिन पहले पीले धब्बे दिखाई दिए।"'
      : 'Voice note recorded: "Yellow spots appeared on tomato leaves 3 days ago."'
    );
  };

  const handleRetake = () => {
    setPhotoPreview(null);
    setUploadedFile(null);
    showToast(language === 'hi' ? 'फिर से फोटो लेने के लिए तैयार।' : 'Camera reset for retake.');
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-container-margin flex flex-col gap-6">
      {/* Header */}
      <div className="mb-2">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold">
          {t('reportProblem', language)}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
          {language === 'hi' 
            ? 'सटीक AI विश्लेषण के लिए प्रभावित क्षेत्र की स्पष्ट तस्वीरें लें।'
            : 'Capture clear photos of the affected area for accurate AI analysis.'}
        </p>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Camera Viewfinder Placeholder or Photo Preview */}
      <div className="relative w-full aspect-[3/4] md:aspect-video bg-surface-container-high rounded-xl overflow-hidden shadow-lg border-2 border-outline-variant/50 flex flex-col items-center justify-center group transition-all hover:border-primary">
        {photoPreview ? (
          <img src={photoPreview} alt="Captured Crop Leaf" className="w-full h-full object-cover" />
        ) : (
          <>
            {/* Reticle / Frame Guides */}
            <div className="absolute inset-4 border-2 border-primary/30 rounded-lg pointer-events-none grid grid-cols-3 grid-rows-3 z-10">
              <div className="border-r border-b border-primary/10"></div>
              <div className="border-r border-b border-primary/10"></div>
              <div className="border-b border-primary/10"></div>
              <div className="border-r border-b border-primary/10"></div>
              <div className="border-r border-b border-primary/10 flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-primary/40 rounded-full animate-pulse"></div>
              </div>
              <div className="border-b border-primary/10"></div>
              <div className="border-r border-primary/10"></div>
              <div className="border-r border-primary/10"></div>
              <div></div>
            </div>

            {/* Main Action Area (before capture) */}
            <div className="flex flex-col items-center z-10 p-6 bg-surface/85 backdrop-blur-md rounded-2xl shadow-sm border border-surface-variant text-center max-w-xs">
              <button
                onClick={handleCaptureSimulated}
                className="w-20 h-20 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all mb-4 focus:outline-none focus:ring-4 focus:ring-primary/30 cursor-pointer"
              >
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  photo_camera
                </span>
              </button>
              <p className="font-headline-md text-[18px] text-on-surface font-semibold mb-1">
                {t('capturePhoto', language)}
              </p>
              <div className="mt-4 border-t border-outline-variant/30 pt-4 w-full">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:text-primary-container font-body-md text-body-md flex items-center gap-2 justify-center w-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">image</span>
                  <span>{t('uploadPhoto', language)}</span>
                </button>
              </div>
            </div>

            {/* Stylized background */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high to-surface-container opacity-50 z-0"></div>
          </>
        )}
      </div>

      {/* Secondary Actions & Guidance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Guidance Section */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding shadow-sm border border-surface-variant">
          <h3 className="font-headline-md text-[20px] text-on-surface mb-4 flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
              lightbulb
            </span>
            {language === 'hi' ? 'अच्छी फोटो कैसे लें' : 'How to take a good photo'}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">eco</span>
              </div>
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  {language === 'hi' ? 'पत्ती स्पष्ट रूप से दिखाई दे' : 'Keep leaf clearly visible'}
                </p>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  {language === 'hi' 
                    ? 'सुनिश्चित करें कि प्रभावित हिस्सा फोकस में है और धुंधला नहीं है।'
                    : 'Ensure the affected part is in focus and not blurry.'}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">wb_sunny</span>
              </div>
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  {language === 'hi' ? 'अच्छी रोशनी का उपयोग करें' : 'Use good lighting'}
                </p>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  {language === 'hi'
                    ? 'पत्ती की सतह पर कठोर छाया या सीधी चमक से बचें।'
                    : 'Avoid harsh shadows or direct glare on the leaf surface.'}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-on-secondary-container text-sm">center_focus_strong</span>
              </div>
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  {language === 'hi' ? 'प्रभावित क्षेत्र को पास से कैप्चर करें' : 'Capture affected area closely'}
                </p>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  {language === 'hi'
                    ? 'बेहतर AI पहचान के लिए समस्या क्षेत्र से फ्रेम भरें।'
                    : 'Fill the frame with the problem area for better AI detection.'}
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Voice & Submission Actions */}
        <div className="flex flex-col gap-4 justify-between">
          <button
            onClick={handleVoiceNote}
            className="bg-surface-container-low hover:bg-surface-container-high border border-outline-variant text-on-surface rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all h-32 w-full group shadow-sm active:scale-95 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">mic</span>
            </div>
            <span className="font-body-md text-body-md font-medium text-center">
              {language === 'hi' ? 'आवाज़ से समस्या बताएं' : 'Describe the problem by voice'}
            </span>
          </button>

          {/* Post-Capture Actions */}
          <div className="flex gap-4 mt-auto">
            <button
              onClick={handleRetake}
              className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 rounded-full py-3 px-6 font-body-md text-body-md font-bold transition-colors text-center h-touch-target-min flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">replay</span>
              {language === 'hi' ? 'फिर से लें' : 'Retake'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!photoPreview}
              className={`flex-1 ${photoPreview ? 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'} rounded-full py-3 px-6 font-body-md text-body-md font-bold transition-colors shadow-md text-center h-touch-target-min flex items-center justify-center gap-2`}
            >
              <span>{language === 'hi' ? 'फोटो जमा करें' : 'Submit Photo'}</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
