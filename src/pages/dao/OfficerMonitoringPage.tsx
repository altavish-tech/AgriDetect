import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const OfficerMonitoringPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts, broadcastAdvisory, showToast } = useApp();

  return (
    <div className="p-container-margin max-w-7xl mx-auto flex flex-col gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Regional Agriculture Monitoring
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Real-time command center: agricultural health, cluster detection, and threat vectors across managed sectors.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast('Date range: Last 30 Days selected')}
            className="flex items-center justify-center gap-2 h-touch-target-min px-5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-label-caps hover:bg-surface-container-highest transition-colors cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Last 30 Days
          </button>
          <button
            onClick={() => showToast('Regional situation report downloaded as PDF')}
            className="flex items-center justify-center gap-2 h-touch-target-min px-6 rounded-full bg-primary text-on-primary font-label-caps text-label-caps hover:bg-primary/90 transition-colors shadow-sm cursor-pointer font-bold"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-primary text-[32px] p-2 bg-surface-container-low rounded-lg group-hover:scale-110 transition-transform">
              article
            </span>
            <span className="flex items-center gap-1 text-secondary font-label-caps text-label-caps bg-secondary-container/50 px-2 py-1 rounded-md font-bold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              12%
            </span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider font-bold">
            Total Reports
          </p>
          <p className="font-display text-display text-on-surface font-bold">1,248</p>
        </div>

        {/* KPI Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-surface-tint"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-surface-tint text-[32px] p-2 bg-surface-container-low rounded-lg group-hover:scale-110 transition-transform">
              location_on
            </span>
            <span className="flex items-center gap-1 text-on-surface-variant font-label-caps text-label-caps bg-surface-variant px-2 py-1 rounded-md font-semibold">
              No Change
            </span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider font-bold">
            Active Hotspots
          </p>
          <p className="font-display text-display text-on-surface font-bold">5</p>
        </div>

        {/* KPI Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
          <div className="flex justify-between items-start mb-4">
            <span className="material-symbols-outlined text-error text-[32px] p-2 bg-error-container/30 rounded-lg group-hover:scale-110 transition-transform">
              warning
            </span>
            <span className="flex items-center gap-1 text-error font-label-caps text-label-caps bg-error-container/50 px-2 py-1 rounded-md font-bold">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
              Urgent
            </span>
          </div>
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-wider font-bold">
            Critical Alerts
          </p>
          <p className="font-display text-display text-on-surface font-bold">2</p>
        </div>
      </div>

      {/* Main Grid: Left Column (Map & Trends) + Right Sidebar (Alerts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Left Column (Map & Charts) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Regional Map Widget */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-1 flex flex-col relative overflow-hidden">
            <div className="p-4 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest rounded-t-xl z-10 relative">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-[20px] font-bold">
                  Regional Disease &amp; Pest Hotspot Map
                </h3>
                <p className="font-body-md text-[14px] text-on-surface-variant">
                  Real-time geospatial clustering of reported agricultural threats in Siwan District.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => showToast('Filtered to active pest clusters only')}
                  aria-label="Filter Map"
                  className="p-2 bg-surface-container hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
                <button
                  onClick={() => showToast('Full GIS Map view expanded')}
                  aria-label="Fullscreen Map"
                  className="p-2 bg-surface-container hover:bg-surface-container-high rounded-full text-on-surface-variant transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">fullscreen</span>
                </button>
              </div>
            </div>

            <div className="relative w-full h-[380px] md:h-[460px] bg-surface-container-low rounded-b-xl overflow-hidden">
              {/* Map Background */}
              <div
                className="absolute inset-0 bg-cover bg-center w-full h-full opacity-80"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC37BeI5mPusxpnfK8qvq406OZ_yNcE85-jXIPsPn65sxfuZKtBRWlynYJQsphEZ-xRInAh0zqzbbi_KhR7d0eC3MyIXuW9BMz29y81jrZUqZZlMDCOMoPVKVqiS1bHk1zhl-igm2eUw9ACtVUfOYxBQmsR_SZU-45gbx4MmR5-CwUYnOCTYCF14BgIsr6MqFDhyXgHnJxOf-mFweLnJuj510QwKRuQ6xhB6yHIfq3lQOgXhqrv0W8P0A')",
                }}
              ></div>

              {/* Red Cluster (Critical Fall Armyworm) */}
              <div
                onClick={() => navigate('/dao/early-warnings')}
                className="absolute top-[30%] left-[45%] flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 bg-error/25 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-error rounded-full border-2 border-surface-container-lowest flex items-center justify-center shadow-lg"></div>
                </div>
                <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-sm px-2.5 py-1 rounded shadow-md border border-error/30 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="font-label-caps text-label-caps text-error font-bold">Critical: Fall Armyworm</p>
                  <p className="text-[10px] text-on-surface font-medium">North Valley Sector • 50+ cases</p>
                </div>
              </div>

              {/* Yellow Cluster (Warning Rust) */}
              <div className="absolute top-[60%] left-[25%] flex flex-col items-center group cursor-pointer">
                <div className="w-10 h-10 bg-amber-500/25 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-amber-500 rounded-full border-2 border-surface-container-lowest shadow-md"></div>
                </div>
                <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-sm px-2 py-1 rounded shadow-sm border border-outline-variant/30 opacity-90 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="font-label-caps text-label-caps text-amber-700 font-bold">Warning: Leaf Rust (24 cases)</p>
                </div>
              </div>

              {/* Green Cluster (Monitoring) */}
              <div className="absolute top-[40%] right-[25%] flex flex-col items-center group cursor-pointer">
                <div className="w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-secondary rounded-full border-2 border-surface-container-lowest shadow-sm"></div>
                </div>
                <div className="mt-1 bg-surface-container-lowest/95 backdrop-blur-sm px-2 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <p className="text-[10px] text-secondary font-bold">Sector 3: Stable</p>
                </div>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-3 rounded-lg shadow-md border border-outline-variant/30 flex flex-col gap-1.5 z-20">
                <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  Threat Level
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-error"></span>
                  <span className="text-[12px] text-on-surface font-medium">Critical (&gt;50 cases)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-[12px] text-on-surface font-medium">Elevated (10-50 cases)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-[12px] text-on-surface font-medium">Low (&lt;10 cases)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Widgets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Disease Trends Chart */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col h-[280px]">
              <h3 className="font-headline-md text-[18px] text-on-surface mb-3 font-bold">Disease Spread Trends</h3>
              <div className="flex-1 w-full bg-surface-container-low rounded-lg relative overflow-hidden flex items-end p-4 gap-3">
                <div className="w-full h-[60%] bg-surface-variant rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full h-[25%] bg-primary/40 rounded-t-md"></div>
                </div>
                <div className="w-full h-[70%] bg-surface-variant rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full h-[45%] bg-primary/60 rounded-t-md"></div>
                </div>
                <div className="w-full h-[40%] bg-surface-variant rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full h-[35%] bg-primary/50 rounded-t-md"></div>
                </div>
                <div className="w-full h-[85%] bg-surface-variant rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full h-[75%] bg-error/70 rounded-t-md"></div>
                </div>
                <div className="w-full h-[95%] bg-surface-variant rounded-t-md relative group">
                  <div className="absolute bottom-0 w-full h-[92%] bg-error rounded-t-md"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label-caps font-bold">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span className="text-error">Current (Peak)</span>
              </div>
            </div>

            {/* Most Affected Crops */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col h-[280px]">
              <h3 className="font-headline-md text-[18px] text-on-surface mb-3 font-bold">Most Affected Crops</h3>
              <div className="flex flex-col gap-4 flex-1 justify-center">
                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-body-md text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">grass</span> Maize
                    </span>
                    <span className="font-status-number text-status-number text-[14px] text-error font-bold">45%</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-error rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-body-md text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">psychiatry</span> Wheat
                    </span>
                    <span className="font-status-number text-status-number text-[14px] font-bold">28%</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-body-md text-on-surface font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-primary">eco</span> Soybeans
                    </span>
                    <span className="font-status-number text-status-number text-[14px] font-bold">15%</span>
                  </div>
                  <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-surface-tint rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Early Warning Center Quick Feed) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 p-card-padding flex flex-col h-full">
            <div className="flex justify-between items-center mb-5 border-b border-outline-variant/20 pb-3">
              <h3 className="font-headline-md text-[18px] text-on-surface flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-error">campaign</span>
                Early Warning Feed
              </h3>
              <span className="bg-error-container text-on-error-container font-label-caps text-[10px] px-2 py-0.5 rounded-full font-bold">
                2 CRITICAL
              </span>
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg relative overflow-hidden border ${
                    alert.level === 'CRITICAL'
                      ? 'bg-error-container/15 border-l-4 border-error'
                      : alert.level === 'WARNING'
                      ? 'bg-surface-container border-l-4 border-amber-500'
                      : 'bg-surface-container border-outline-variant/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span
                      className={`font-label-caps text-[11px] font-bold ${
                        alert.level === 'CRITICAL' ? 'text-error' : 'text-amber-700'
                      }`}
                    >
                      {alert.sector}
                    </span>
                    <span className="text-[10px] text-on-surface-variant">{alert.timeAgo}</span>
                  </div>
                  <h4 className="font-body-md font-bold text-on-surface mb-1">{alert.title}</h4>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-relaxed">
                    {alert.description}
                  </p>

                  {alert.actionType === 'broadcast' && (
                    <button
                      onClick={() => broadcastAdvisory(alert.sector)}
                      className="mt-3 text-[12px] font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Broadcast Advisory to Sector</span>
                      <span className="material-symbols-outlined text-[14px]">send</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/dao/early-warnings')}
              className="mt-4 w-full py-2.5 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-lg font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              Open Early Warning Command Center
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
