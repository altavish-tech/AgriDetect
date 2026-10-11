import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

interface ReportDetail {
  id: string;
  date: string;
  cropType: string;
  disease: string;
  diseaseName: string;
  severity: 'low' | 'medium' | 'high';
  status: 'resolved' | 'monitoring' | 'pending';
  imageUrl: string;
  location: string;
  confidence: number;
  symptoms: string[];
  treatment: string[];
  notes: string;
  followUpDate?: string;
  expertReviewed: boolean;
  updates: Array<{
    date: string;
    status: string;
    note: string;
    imageUrl?: string;
  }>;
}

export const ReportDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { reportId } = useParams<{ reportId: string }>();
  const { language } = useApp();

  // Mock data based on report ID - in production this would come from API
  const reportData: Record<string, ReportDetail> = {
    'RPT-2026-001': {
      id: 'RPT-2026-001',
      date: '2026-01-08',
      cropType: language === 'hi' ? 'टमाटर' : 'Tomato',
      disease: 'Early Blight',
      diseaseName: language === 'hi' ? 'अर्ली ब्लाइट' : 'Early Blight',
      severity: 'high',
      status: 'monitoring',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAd7DoRNQGp4leP67GGKLIj3M8dbo96j_ka09Cm6jdVN1lneoadcHfAWiD12owyc_CFRRhJHi8lyJ5gl7Ats-bi3qofeS_TlFTRT82vsF52speVh1ZX0k4Q7_5LdqWmvUChC5EK9g724FvGEf630Sdk3Mx6iHi98qBFYkp42uvkBkZCVexUumjkkA1zWntRvOXG-wK7I7bKTn82qt4UZOiHaHWqCLwu6Xn4jNUf4T77C1jl-pwxTHibg',
      location: language === 'hi' ? 'फील्ड सेक्टर 4' : 'Field Sector 4',
      confidence: 87,
      symptoms: language === 'hi' 
        ? ['पत्तियों पर भूरे धब्बे', 'पीले घेरे के साथ', 'पत्तियों का मुड़ना']
        : ['Brown spots on leaves', 'Yellow halos around spots', 'Leaf curling'],
      treatment: language === 'hi'
        ? ['मैनकोजेब स्प्रे लगाएं', 'प्रभावित पत्तियां हटाएं', 'सिंचाई कम करें']
        : ['Apply Mancozeb spray', 'Remove affected leaves', 'Reduce watering'],
      notes: language === 'hi' 
        ? 'गीली स्थिति के कारण फैलाव तेज। तुरंत उपचार की जरूरत।'
        : 'Rapid spread due to wet conditions. Immediate treatment needed.',
      followUpDate: '2026-01-15',
      expertReviewed: true,
      updates: [
        {
          date: '2026-01-08',
          status: language === 'hi' ? 'रिपोर्ट सबमिट की गई' : 'Report submitted',
          note: language === 'hi' ? 'AI विश्लेषण पूर्ण' : 'AI analysis complete'
        },
        {
          date: '2026-01-09',
          status: language === 'hi' ? 'विशेषज्ञ द्वारा समीक्षा' : 'Expert reviewed',
          note: language === 'hi' ? 'डॉ. शर्मा ने उपचार की पुष्टि की' : 'Dr. Sharma confirmed treatment'
        },
        {
          date: '2026-01-12',
          status: language === 'hi' ? 'फॉलो-अप फोटो' : 'Follow-up photo',
          note: language === 'hi' ? '30% सुधार देखा गया' : '30% improvement observed',
          imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop'
        }
      ]
    },
    'RPT-2023-047': {
      id: 'RPT-2023-047',
      date: '2023-12-15',
      cropType: language === 'hi' ? 'धान' : 'Rice',
      disease: 'Brown Spot',
      diseaseName: language === 'hi' ? 'ब्राउन स्पॉट' : 'Brown Spot',
      severity: 'medium',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop',
      location: language === 'hi' ? 'खेत A-2' : 'Field A-2',
      confidence: 92,
      symptoms: language === 'hi'
        ? ['अंडाकार भूरे धब्बे', 'पत्तियों पर घाव', 'दानों पर दाग']
        : ['Oval brown spots', 'Lesions on leaves', 'Discoloration on grains'],
      treatment: language === 'hi'
        ? ['कार्बेन्डाजिम स्प्रे', 'पोटाश उर्वरक बढ़ाएं', 'जल निकासी सुधारें']
        : ['Carbendazim spray', 'Increase potash fertilizer', 'Improve drainage'],
      notes: language === 'hi'
        ? 'समय पर उपचार से पूर्ण नियंत्रण हो गया। फसल स्वस्थ है।'
        : 'Timely treatment achieved complete control. Crop is healthy.',
      expertReviewed: true,
      updates: [
        {
          date: '2023-12-15',
          status: language === 'hi' ? 'रिपोर्ट सबमिट की गई' : 'Report submitted',
          note: language === 'hi' ? 'AI निदान पूर्ण' : 'AI diagnosis complete'
        },
        {
          date: '2023-12-20',
          status: language === 'hi' ? 'उपचार शुरू' : 'Treatment started',
          note: language === 'hi' ? 'पहला स्प्रे लगाया गया' : 'First spray applied'
        },
        {
          date: '2023-12-28',
          status: language === 'hi' ? 'हल हो गया' : 'Resolved',
          note: language === 'hi' ? 'कोई नए लक्षण नहीं' : 'No new symptoms observed'
        }
      ]
    },
    'RPT-2023-038': {
      id: 'RPT-2023-038',
      date: '2023-11-22',
      cropType: language === 'hi' ? 'गेहूं' : 'Wheat',
      disease: 'Rust',
      diseaseName: language === 'hi' ? 'रस्ट रोग' : 'Rust Disease',
      severity: 'low',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      location: language === 'hi' ? 'खेत B-1' : 'Field B-1',
      confidence: 89,
      symptoms: language === 'hi'
        ? ['पत्तियों पर नारंगी धब्बे', 'पाउडर जैसा पदार्थ', 'पत्तियों का सूखना']
        : ['Orange spots on leaves', 'Powdery substance', 'Leaf drying'],
      treatment: language === 'hi'
        ? ['प्रोपिकोनाजोल स्प्रे', 'नाइट्रोजन नियंत्रित करें', 'हवा संचार बढ़ाएं']
        : ['Propiconazole spray', 'Control nitrogen', 'Increase air circulation'],
      notes: language === 'hi'
        ? 'प्रारंभिक चरण में पहचान। सफल उपचार।'
        : 'Early stage detection. Successful treatment.',
      expertReviewed: false,
      updates: [
        {
          date: '2023-11-22',
          status: language === 'hi' ? 'रिपोर्ट सबमिट की गई' : 'Report submitted',
          note: language === 'hi' ? 'स्वचालित विश्लेषण' : 'Automated analysis'
        },
        {
          date: '2023-11-25',
          status: language === 'hi' ? 'हल हो गया' : 'Resolved',
          note: language === 'hi' ? 'एक स्प्रे से नियंत्रण' : 'Controlled with one spray'
        }
      ]
    },
    'RPT-2023-029': {
      id: 'RPT-2023-029',
      date: '2023-10-30',
      cropType: language === 'hi' ? 'टमाटर' : 'Tomato',
      disease: 'Leaf Curl',
      diseaseName: language === 'hi' ? 'लीफ कर्ल वायरस' : 'Leaf Curl Virus',
      severity: 'high',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
      location: language === 'hi' ? 'खेत A-3' : 'Field A-3',
      confidence: 91,
      symptoms: language === 'hi'
        ? ['पत्तियों का मुड़ना', 'पत्तियों का छोटा होना', 'पीला रंग', 'वृद्धि रुक जाना']
        : ['Leaf curling', 'Stunted leaf growth', 'Yellowing', 'Growth stunting'],
      treatment: language === 'hi'
        ? ['सफ़ेद मक्खी नियंत्रण', 'इमिडाक्लोप्रिड स्प्रे', 'संक्रमित पौधे हटाएं', 'जाल लगाएं']
        : ['Whitefly control', 'Imidacloprid spray', 'Remove infected plants', 'Install nets'],
      notes: language === 'hi'
        ? 'व्हाइटफ्लाई द्वारा वायरल संक्रमण। समय पर नियंत्रण से फैलाव रोका गया।'
        : 'Viral infection transmitted by whiteflies. Timely control prevented spread.',
      followUpDate: '2023-11-10',
      expertReviewed: true,
      updates: [
        {
          date: '2023-10-30',
          status: language === 'hi' ? 'रिपोर्ट सबमिट की गई' : 'Report submitted',
          note: language === 'hi' ? 'AI ने वायरल संक्रमण की पहचान की' : 'AI identified viral infection'
        },
        {
          date: '2023-11-01',
          status: language === 'hi' ? 'विशेषज्ञ द्वारा समीक्षा' : 'Expert reviewed',
          note: language === 'hi' ? 'डॉ. पटेल ने लीफ कर्ल की पुष्टि की' : 'Dr. Patel confirmed leaf curl virus'
        },
        {
          date: '2023-11-05',
          status: language === 'hi' ? 'उपचार शुरू' : 'Treatment started',
          note: language === 'hi' ? 'व्हाइटफ्लाई नियंत्रण उपाय लागू' : 'Whitefly control measures implemented'
        },
        {
          date: '2023-11-15',
          status: language === 'hi' ? 'हल हो गया' : 'Resolved',
          note: language === 'hi' ? 'नए संक्रमण नहीं, स्वस्थ वृद्धि' : 'No new infection, healthy growth observed'
        }
      ]
    }
  };

  const report = reportData[reportId || ''];

  if (!report) {
    return (
      <div className="p-container-margin max-w-5xl mx-auto text-center py-12">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4 block">
          error
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          {language === 'hi' ? 'रिपोर्ट नहीं मिली' : 'Report Not Found'}
        </h2>
        <button
          onClick={() => navigate('/farmer/my-reports')}
          className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-lg font-body-md font-semibold"
        >
          {language === 'hi' ? 'रिपोर्ट्स पर वापस जाएं' : 'Back to Reports'}
        </button>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error text-on-error';
      case 'medium':
        return 'bg-[#f59e0b] text-white';
      case 'low':
        return 'bg-secondary text-on-secondary';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getSeverityText = (severity: string) => {
    const labels: Record<string, { en: string; hi: string }> = {
      high: { en: 'High Risk', hi: 'उच्च जोखिम' },
      medium: { en: 'Medium Risk', hi: 'मध्यम जोखिम' },
      low: { en: 'Low Risk', hi: 'कम जोखिम' }
    };
    return language === 'hi' ? labels[severity]?.hi : labels[severity]?.en;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'check_circle';
      case 'monitoring':
        return 'visibility';
      case 'pending':
        return 'schedule';
      default:
        return 'help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-secondary';
      case 'monitoring':
        return 'text-tertiary';
      case 'pending':
        return 'text-on-surface-variant';
      default:
        return 'text-on-surface-variant';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return language === 'hi' 
      ? date.toLocaleDateString('hi-IN', options)
      : date.toLocaleDateString('en-IN', options);
  };

  return (
    <div className="p-container-margin max-w-5xl mx-auto space-y-gutter w-full pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/farmer/my-reports')}
          className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            {language === 'hi' ? 'रिपोर्ट विवरण' : 'Report Details'}
          </h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            {report.id} • {formatDate(report.date)}
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <div className={`${getSeverityColor(report.severity)} rounded-xl p-4 flex items-center gap-4`}>
        <span className={`material-symbols-outlined text-[40px] ${getStatusColor(report.status)}`} style={{ fontVariationSettings: "'FILL' 1" }}>
          {getStatusIcon(report.status)}
        </span>
        <div className="flex-1">
          <div className="font-body-lg text-body-lg font-bold opacity-90">
            {getSeverityText(report.severity)}
          </div>
          <div className="font-label-caps text-label-caps opacity-80">
            {report.status === 'resolved' 
              ? (language === 'hi' ? 'हल हो गया' : 'Resolved')
              : report.status === 'monitoring'
              ? (language === 'hi' ? 'निगरानी में' : 'Under Monitoring')
              : (language === 'hi' ? 'लंबित' : 'Pending')}
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow">
        <img
          src={report.imageUrl}
          alt={`${report.cropType} ${report.diseaseName}`}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Disease Information */}
      <div className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40">
        <h2 className="font-headline-md text-headline-md font-bold text-on-surface mb-4">
          {report.cropType} - {report.diseaseName}
        </h2>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {language === 'hi' ? 'स्थान' : 'Location'}
            </div>
            <div className="font-body-md text-body-md text-on-surface">
              {report.location}
            </div>
          </div>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {language === 'hi' ? 'विश्वसनीयता' : 'Confidence'}
            </div>
            <div className="font-body-md text-body-md text-on-surface">
              {report.confidence}%
            </div>
          </div>
        </div>

        {report.expertReviewed && (
          <div className="flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="font-label-caps text-label-caps font-semibold">
              {language === 'hi' ? 'विशेषज्ञ द्वारा सत्यापित' : 'Expert Verified'}
            </span>
          </div>
        )}
      </div>

      {/* Symptoms */}
      <div className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40">
        <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-error">report_problem</span>
          {language === 'hi' ? 'लक्षण' : 'Symptoms'}
        </h3>
        <ul className="space-y-2">
          {report.symptoms.map((symptom, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] mt-0.5">
                chevron_right
              </span>
              <span className="font-body-md text-body-md text-on-surface">
                {symptom}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment */}
      <div className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40">
        <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">medication</span>
          {language === 'hi' ? 'सुझाया गया उपचार' : 'Recommended Treatment'}
        </h3>
        <ul className="space-y-2">
          {report.treatment.map((step, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-label-caps text-label-caps font-bold">
                {index + 1}
              </div>
              <span className="font-body-md text-body-md text-on-surface">
                {step}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-tertiary-container/30 rounded-xl p-card-padding border border-tertiary/30">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-tertiary">info</span>
          <div>
            <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
              {language === 'hi' ? 'नोट्स' : 'Notes'}
            </div>
            <p className="font-body-md text-body-md text-on-surface">
              {report.notes}
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40">
        <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">timeline</span>
          {language === 'hi' ? 'अपडेट टाइमलाइन' : 'Update Timeline'}
        </h3>
        <div className="space-y-4">
          {report.updates.map((update, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-surface-variant'}`}></div>
                {index < report.updates.length - 1 && (
                  <div className="w-0.5 h-full bg-outline-variant mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="font-body-md text-body-md font-bold text-on-surface">
                  {update.status}
                </div>
                <div className="font-label-caps text-label-caps text-on-surface-variant mb-1">
                  {formatDate(update.date)}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {update.note}
                </p>
                {update.imageUrl && (
                  <img
                    src={update.imageUrl}
                    alt="Update"
                    className="mt-2 w-32 h-24 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/farmer/photo-capture')}
          className="flex-1 px-6 py-3 bg-primary text-on-primary rounded-lg font-body-md font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">add_a_photo</span>
          {language === 'hi' ? 'फॉलो-अप फोटो' : 'Add Follow-up Photo'}
        </button>
        <button
          onClick={() => navigate('/farmer/advisory')}
          className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-body-md font-semibold hover:bg-primary/10 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">book</span>
          {language === 'hi' ? 'सलाह देखें' : 'View Advisory'}
        </button>
      </div>
    </div>
  );
};
