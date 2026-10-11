import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/translations';

interface Report {
  id: string;
  date: string;
  cropType: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  status: 'resolved' | 'monitoring' | 'pending';
  imageUrl: string;
}

export const MyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  // Mock data - in production this would come from API
  const reports: Report[] = [
    {
      id: 'RPT-2026-001',
      date: '2026-01-08',
      cropType: language === 'hi' ? 'टमाटर' : 'Tomato',
      disease: language === 'hi' ? 'अर्ली ब्लाइट' : 'Early Blight',
      severity: 'high',
      status: 'monitoring',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAd7DoRNQGp4leP67GGKLIj3M8dbo96j_ka09Cm6jdVN1lneoadcHfAWiD12owyc_CFRRhJHi8lyJ5gl7Ats-bi3qofeS_TlFTRT82vsF52speVh1ZX0k4Q7_5LdqWmvUChC5EK9g724FvGEf630Sdk3Mx6iHi98qBFYkp42uvkBkZCVexUumjkkA1zWntRvOXG-wK7I7bKTn82qt4UZOiHaHWqCLwu6Xn4jNUf4T77C1jl-pwxTHibg'
    },
    {
      id: 'RPT-2023-047',
      date: '2023-12-15',
      cropType: language === 'hi' ? 'धान' : 'Rice',
      disease: language === 'hi' ? 'ब्राउन स्पॉट' : 'Brown Spot',
      severity: 'medium',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop'
    },
    {
      id: 'RPT-2023-038',
      date: '2023-11-22',
      cropType: language === 'hi' ? 'गेहूं' : 'Wheat',
      disease: language === 'hi' ? 'रस्ट' : 'Rust',
      severity: 'low',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop'
    },
    {
      id: 'RPT-2023-029',
      date: '2023-10-30',
      cropType: language === 'hi' ? 'टमाटर' : 'Tomato',
      disease: language === 'hi' ? 'लीफ कर्ल' : 'Leaf Curl',
      severity: 'high',
      status: 'resolved',
      imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error-container text-on-error-container';
      case 'medium':
        return 'bg-[#fef3c7] text-[#92400e]';
      case 'low':
        return 'bg-secondary-container text-on-secondary-container';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getSeverityText = (severity: string) => {
    const labels: Record<string, { en: string; hi: string }> = {
      high: { en: 'High', hi: 'उच्च' },
      medium: { en: 'Medium', hi: 'मध्यम' },
      low: { en: 'Low', hi: 'कम' }
    };
    return language === 'hi' ? labels[severity]?.hi : labels[severity]?.en;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-secondary-container text-on-secondary-container';
      case 'monitoring':
        return 'bg-tertiary-container text-on-tertiary-container';
      case 'pending':
        return 'bg-surface-variant text-on-surface-variant';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getStatusText = (status: string) => {
    const labels: Record<string, { en: string; hi: string }> = {
      resolved: { en: 'Resolved', hi: 'हल हो गया' },
      monitoring: { en: 'Monitoring', hi: 'निगरानी में' },
      pending: { en: 'Pending', hi: 'लंबित' }
    };
    return language === 'hi' ? labels[status]?.hi : labels[status]?.en;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    if (language === 'hi') {
      return date.toLocaleDateString('hi-IN', options);
    }
    return date.toLocaleDateString('en-IN', options);
  };

  return (
    <div className="p-container-margin max-w-5xl mx-auto space-y-gutter w-full pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
            {language === 'hi' ? 'मेरी रिपोर्ट्स' : 'My Reports'}
          </h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            {language === 'hi' 
              ? `कुल ${reports.length} रिपोर्ट्स सबमिट की गई` 
              : `${reports.length} Total Reports Submitted`}
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-gutter">
        <div className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/30">
          <div className="font-headline-md text-headline-md font-bold text-on-surface">
            {reports.filter(r => r.status === 'monitoring').length}
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            {language === 'hi' ? 'सक्रिय' : 'Active'}
          </div>
        </div>
        <div className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/30">
          <div className="font-headline-md text-headline-md font-bold text-secondary">
            {reports.filter(r => r.status === 'resolved').length}
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            {language === 'hi' ? 'हल हुए' : 'Resolved'}
          </div>
        </div>
        <div className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/30">
          <div className="font-headline-md text-headline-md font-bold text-on-surface">
            {reports.length}
          </div>
          <div className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            {language === 'hi' ? 'कुल' : 'Total'}
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => navigate(`/farmer/report-detail/${report.id}`)}
            className="bg-surface-container-lowest rounded-xl p-card-padding ambient-shadow border border-outline-variant/40 hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-variant shrink-0">
                <img
                  src={report.imageUrl}
                  alt={`${report.cropType} ${report.disease}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface truncate">
                      {report.cropType} - {report.disease}
                    </h3>
                    <p className="font-label-caps text-label-caps text-on-surface-variant">
                      {report.id} • {formatDate(report.date)}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    chevron_right
                  </span>
                </div>

                {/* Status Tags */}
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 rounded-full font-label-caps text-label-caps ${getSeverityColor(report.severity)}`}>
                    {getSeverityText(report.severity)} {language === 'hi' ? 'जोखिम' : 'Risk'}
                  </span>
                  <span className={`px-2 py-1 rounded-full font-label-caps text-label-caps ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (when no reports) */}
      {reports.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4 block">
            description
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            {language === 'hi' ? 'कोई रिपोर्ट नहीं' : 'No Reports Yet'}
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mb-6">
            {language === 'hi' 
              ? 'फसल की समस्या की रिपोर्ट करके शुरू करें'
              : 'Start by reporting a crop problem'}
          </p>
          <button
            onClick={() => navigate('/farmer/report')}
            className="px-6 py-3 bg-primary text-on-primary rounded-lg font-body-md text-body-md font-semibold hover:bg-primary/90 transition-colors"
          >
            {language === 'hi' ? 'समस्या रिपोर्ट करें' : 'Report Problem'}
          </button>
        </div>
      )}
    </div>
  );
};
