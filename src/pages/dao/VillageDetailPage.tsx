import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface VillageCase {
  id: string;
  farmerName: string;
  crop: string;
  disease: string;
  severity: string;
  date: string;
  status: string;
}

export const VillageDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { villageName } = useParams<{ villageName: string }>();
  const { showToast } = useApp();

  // Mock data for the selected village
  const villageData: Record<string, any> = {
    'Green Valley': {
      activeCases: 124,
      riskLevel: 'High',
      trend: '+12%',
      population: 4500,
      farmlands: 850,
      lastUpdated: '2 hours ago',
      cases: [
        { id: 'CS-GV-001', farmerName: 'Rajesh Kumar', crop: 'Tomato', disease: 'Early Blight', severity: 'High', date: 'Today, 10:30 AM', status: 'Under Treatment' },
        { id: 'CS-GV-002', farmerName: 'Suresh Patel', crop: 'Wheat', disease: 'Rust', severity: 'Medium', date: 'Yesterday', status: 'Monitoring' },
        { id: 'CS-GV-003', farmerName: 'Anita Devi', crop: 'Rice', disease: 'Brown Spot', severity: 'High', date: 'Today, 8:15 AM', status: 'Treatment Started' },
        { id: 'CS-GV-004', farmerName: 'Mohan Singh', crop: 'Tomato', disease: 'Leaf Curl', severity: 'Medium', date: '2 days ago', status: 'Monitoring' },
        { id: 'CS-GV-005', farmerName: 'Priya Sharma', crop: 'Maize', disease: 'Fall Armyworm', severity: 'Critical', date: 'Today, 11:00 AM', status: 'Urgent Action' }
      ]
    },
    'Sunny Ridge': {
      activeCases: 45,
      riskLevel: 'Medium',
      trend: '-5%',
      population: 2800,
      farmlands: 520,
      lastUpdated: '5 hours ago',
      cases: [
        { id: 'CS-SR-001', farmerName: 'Vikram Yadav', crop: 'Wheat', disease: 'Powdery Mildew', severity: 'Low', date: 'Yesterday', status: 'Resolved' },
        { id: 'CS-SR-002', farmerName: 'Geeta Kumari', crop: 'Potato', disease: 'Late Blight', severity: 'Medium', date: 'Today, 9:00 AM', status: 'Monitoring' },
        { id: 'CS-SR-003', farmerName: 'Ashok Verma', crop: 'Rice', disease: 'Blast', severity: 'Medium', date: '3 days ago', status: 'Treatment Applied' }
      ]
    },
    'Village A': {
      activeCases: 89,
      riskLevel: 'High',
      trend: '+18%',
      population: 3900,
      farmlands: 720,
      lastUpdated: '1 hour ago',
      cases: [
        { id: 'CS-VA-001', farmerName: 'Ramesh Gupta', crop: 'Tomato', disease: 'Bacterial Wilt', severity: 'Critical', date: 'Today, 7:45 AM', status: 'Emergency Response' },
        { id: 'CS-VA-002', farmerName: 'Sunita Rao', crop: 'Maize', disease: 'Blight', severity: 'High', date: 'Yesterday', status: 'Under Treatment' },
        { id: 'CS-VA-003', farmerName: 'Deepak Kumar', crop: 'Wheat', disease: 'Rust', severity: 'Medium', date: 'Today, 10:00 AM', status: 'Monitoring' },
        { id: 'CS-VA-004', farmerName: 'Kavita Singh', crop: 'Rice', disease: 'Sheath Blight', severity: 'High', date: '2 days ago', status: 'Treatment Started' }
      ]
    },
    'Village C': {
      activeCases: 38,
      riskLevel: 'Medium',
      trend: '+2%',
      population: 2200,
      farmlands: 380,
      lastUpdated: '3 hours ago',
      cases: [
        { id: 'CS-VC-001', farmerName: 'Anil Tiwari', crop: 'Potato', disease: 'Early Blight', severity: 'Low', date: '4 days ago', status: 'Resolved' },
        { id: 'CS-VC-002', farmerName: 'Meena Devi', crop: 'Tomato', disease: 'Leaf Spot', severity: 'Medium', date: 'Yesterday', status: 'Monitoring' },
        { id: 'CS-VC-003', farmerName: 'Sanjay Mishra', crop: 'Maize', disease: 'Cutworm', severity: 'Medium', date: 'Today, 8:30 AM', status: 'Treatment Applied' }
      ]
    },
    'Riverdale': {
      activeCases: 12,
      riskLevel: 'Low',
      trend: '0%',
      population: 1500,
      farmlands: 250,
      lastUpdated: '6 hours ago',
      cases: [
        { id: 'CS-RD-001', farmerName: 'Ravi Prasad', crop: 'Wheat', disease: 'Aphids', severity: 'Low', date: '5 days ago', status: 'Resolved' },
        { id: 'CS-RD-002', farmerName: 'Lalita Kumari', crop: 'Rice', disease: 'Leaf Folder', severity: 'Low', date: '3 days ago', status: 'Monitoring' }
      ]
    }
  };

  const village = villageName ? villageData[villageName] : null;

  if (!village) {
    return (
      <div className="p-container-margin max-w-7xl mx-auto text-center py-12">
        <span className="material-symbols-outlined text-[64px] text-on-surface-variant opacity-50 mb-4 block">
          location_off
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
          Village Not Found
        </h2>
        <button
          onClick={() => navigate('/dao/analytics')}
          className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-lg font-body-md font-semibold"
        >
          Back to Analytics
        </button>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high':
        return 'bg-error-container text-on-error-container';
      case 'medium':
        return 'bg-amber-100 text-amber-900';
      case 'low':
        return 'bg-secondary-container text-on-secondary-container';
      default:
        return 'bg-surface-variant text-on-surface-variant';
    }
  };

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('urgent') || status.toLowerCase().includes('emergency')) {
      return 'text-error font-bold';
    } else if (status.toLowerCase().includes('resolved')) {
      return 'text-secondary';
    } else {
      return 'text-tertiary';
    }
  };

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full pb-24">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dao/analytics')}
          className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="font-headline-lg text-headline-lg text-primary font-bold">
            {villageName} Sector
          </h1>
          <p className="text-on-surface-variant font-body-md text-sm mt-1">
            Detailed outbreak tracking and case management
          </p>
        </div>
      </div>

      {/* Risk Status Banner */}
      <div className={`${
        village.riskLevel === 'High' 
          ? 'bg-error text-on-error' 
          : village.riskLevel === 'Medium' 
          ? 'bg-amber-500 text-white' 
          : 'bg-secondary text-on-secondary'
      } rounded-xl p-6 flex items-center gap-4`}>
        <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {village.riskLevel === 'High' ? 'warning' : village.riskLevel === 'Medium' ? 'error_outline' : 'check_circle'}
        </span>
        <div className="flex-1">
          <div className="font-headline-md text-headline-md font-bold">
            {village.riskLevel} Risk Level
          </div>
          <div className="font-body-md opacity-90">
            Trend: {village.trend} over last 7 days • Last updated {village.lastUpdated}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest rounded-xl p-card-padding border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-error text-2xl">coronavirus</span>
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Active Cases</div>
          </div>
          <div className="font-display text-display text-on-surface font-bold">{village.activeCases}</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-card-padding border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">groups</span>
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Population</div>
          </div>
          <div className="font-display text-display text-on-surface font-bold">{village.population.toLocaleString()}</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-card-padding border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-secondary text-2xl">agriculture</span>
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">Farmlands</div>
          </div>
          <div className="font-display text-display text-on-surface font-bold">{village.farmlands} acres</div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-card-padding border border-outline-variant shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-tertiary text-2xl">trending_up</span>
            <div className="font-label-caps text-label-caps text-on-surface-variant uppercase">7-Day Trend</div>
          </div>
          <div className={`font-display text-display font-bold ${village.trend.includes('+') ? 'text-error' : village.trend.includes('-') ? 'text-secondary' : 'text-on-surface'}`}>
            {village.trend}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => showToast(`Sending alert to all farmers in ${villageName}`)}
          className="px-6 py-3 bg-primary text-on-primary rounded-lg font-body-md font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">campaign</span>
          Send Village Alert
        </button>
        <button
          onClick={() => showToast(`Exporting case data for ${villageName}`)}
          className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-body-md font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined">download</span>
          Export Cases
        </button>
      </div>

      {/* Cases Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-card-padding border-b border-outline-variant bg-surface">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
            Active Disease Cases
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Case ID</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Farmer</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Crop</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Disease</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Severity</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Date</th>
                <th className="p-4 font-label-caps text-label-caps text-on-surface-variant font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {village.cases.map((caseItem: VillageCase) => (
                <tr key={caseItem.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="p-4 font-bold text-primary">#{caseItem.id}</td>
                  <td className="p-4 text-on-surface">{caseItem.farmerName}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm">grass</span>
                      <span>{caseItem.crop}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{caseItem.disease}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(caseItem.severity)}`}>
                      {caseItem.severity}
                    </span>
                  </td>
                  <td className="p-4 text-on-surface-variant text-sm">{caseItem.date}</td>
                  <td className="p-4">
                    <span className={`text-sm font-semibold ${getStatusColor(caseItem.status)}`}>
                      {caseItem.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
