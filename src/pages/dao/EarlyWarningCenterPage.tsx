import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const EarlyWarningCenterPage: React.FC = () => {
  const { alerts, broadcastAdvisory, dispatchTeam, showToast } = useApp();
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualSector, setManualSector] = useState('North Valley Sector');
  const [manualMessage, setManualMessage] = useState('');

  const handleCreateManualAlert = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Emergency Alert "${manualTitle}" created and queued for broadcast to ${manualSector}!`);
    setShowManualModal(false);
    setManualTitle('');
    setManualMessage('');
  };

  return (
    <div className="p-container-margin max-w-7xl mx-auto space-y-gutter w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
            Early Warning Center
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Manage, dispatch, and broadcast emergency notices across high-risk agricultural clusters.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast('Filtered to active high priority alerts')}
            className="h-10 px-4 flex items-center gap-2 border border-outline rounded-full text-on-surface font-body-md hover:bg-surface-container-low transition-colors text-sm font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </button>
          <button
            onClick={() => setShowManualModal(true)}
            className="h-10 px-5 flex items-center gap-2 bg-primary text-on-primary rounded-full font-body-md hover:opacity-90 transition-opacity shadow-sm text-sm font-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Issue Manual Alert
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
        {/* Left Column: Active Warnings Feed */}
        <div className="xl:col-span-2 flex flex-col gap-gutter">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold text-lg">
            Active Regional Warnings
          </h3>

          {/* CRITICAL OUTBREAK ALERT */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-error-container overflow-hidden relative">
            <div className="h-2 w-full bg-error"></div>
            <div className="p-card-padding flex flex-col md:flex-row gap-6">
              {/* Visual/Status */}
              <div className="flex flex-col items-center justify-center bg-error-container/30 rounded-lg p-4 min-w-[120px]">
                <span className="material-symbols-outlined text-error text-4xl mb-2 filled">warning</span>
                <span className="font-label-caps text-label-caps text-error bg-error-container px-2.5 py-1 rounded font-bold">
                  CRITICAL
                </span>
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface font-bold text-lg">
                      Tomato Late Blight Outbreak
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1 font-medium">
                      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      Village A Sector (Siwan)
                    </p>
                  </div>
                  <span className="font-label-caps text-label-caps text-error bg-error-container px-2 py-1 rounded font-bold">
                    24 cases / 48h
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-3 leading-relaxed">
                  Rapid spread detected across multiple adjacent farms. High humidity accelerating spore dispersion. Immediate intervention required to prevent total crop failure in the sector.
                </p>
                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() => broadcastAdvisory('Village A Sector')}
                    className="bg-primary text-on-primary px-4 py-2 rounded-lg font-body-md flex items-center gap-2 hover:opacity-90 shadow-sm transition-opacity font-bold text-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">campaign</span>
                    Broadcast Advisory SMS
                  </button>
                  <button
                    onClick={() => dispatchTeam('Village A Sector')}
                    className="border-2 border-primary text-primary px-4 py-2 rounded-lg font-body-md flex items-center gap-2 hover:bg-surface-container-low transition-colors font-bold text-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">local_shipping</span>
                    Dispatch Extension Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* WARNING ALERT CARD */}
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-outline-variant/50 overflow-hidden relative">
            <div className="h-2 w-full bg-[#f59e0b]"></div>
            <div className="p-card-padding flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center justify-center bg-[#fef3c7] rounded-lg p-4 min-w-[120px]">
                <span className="material-symbols-outlined text-[#d97706] text-4xl mb-2">thermostat</span>
                <span className="font-label-caps text-label-caps text-[#d97706] bg-[#fde68a] px-2.5 py-1 rounded font-bold">
                  WARNING
                </span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-headline-md text-headline-md text-on-surface font-bold text-lg">
                      Elevated Microclimate Humidity Warning
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-1 mt-1 font-medium">
                      <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                      Eastern District Plain
                    </p>
                  </div>
                  <span className="text-xs text-on-surface-variant font-medium">2 hours ago</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-3 leading-relaxed">
                  Persistent relative humidity &gt; 85% with nighttime dew point convergence creates severe fungal spore multiplication conditions. Farmers are advised to avoid night overhead irrigation.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => broadcastAdvisory('Eastern District')}
                    className="border border-outline text-on-surface px-4 py-2 rounded-lg text-sm font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    Push Weather Advisory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Broadcast Intelligence & Stats */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-card-padding">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 font-bold text-base">
              Disaster Response Statistics
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-error">campaign</span>
                  <span className="text-sm font-medium">Active Alert Bulletins</span>
                </div>
                <span className="font-status-number text-error font-bold">2</span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary">groups</span>
                  <span className="text-sm font-medium">Farmers Notified (SMS/App)</span>
                </div>
                <span className="font-status-number text-secondary font-bold">4,850</span>
              </div>

              <div className="p-3 bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary">engineering</span>
                  <span className="text-sm font-medium">Mobile Squads in Field</span>
                </div>
                <span className="font-status-number text-primary font-bold">4 Teams</span>
              </div>
            </div>
          </div>

          <div className="bg-primary-container text-on-primary-container rounded-xl p-card-padding shadow-sm">
            <h4 className="font-headline-md font-bold text-base mb-1">Standard Operating Protocol</h4>
            <p className="text-xs leading-relaxed opacity-90 mb-4">
              Per ICAR Guidelines, automated bulletins trigger when cluster incidence exceeds 20 cases within a 5km radius in under 72 hours.
            </p>
            <button
              onClick={() => showToast('Protocol Guidelines Document opened.')}
              className="px-4 py-2 bg-surface text-primary rounded-lg text-xs font-bold shadow-xs hover:bg-surface-variant transition-colors cursor-pointer"
            >
              Review Protocol Doc
            </button>
          </div>
        </div>
      </div>

      {/* Manual Alert Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-surface rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-outline-variant">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline-md font-bold text-on-surface text-lg">Dispatch Manual Agricultural Warning</h3>
              <button
                onClick={() => setShowManualModal(false)}
                className="p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateManualAlert} className="space-y-4">
              <div>
                <label className="block text-xs font-label-caps uppercase font-bold text-on-surface-variant mb-1">
                  Alert Headline
                </label>
                <input
                  type="text"
                  required
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Yellow Rust Spore Influx Warning"
                  className="w-full bg-surface-container-low border border-outline rounded-lg p-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase font-bold text-on-surface-variant mb-1">
                  Target Sector
                </label>
                <select
                  value={manualSector}
                  onChange={(e) => setManualSector(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline rounded-lg p-2.5 text-sm outline-none focus:border-primary"
                >
                  <option>North Valley Sector</option>
                  <option>Village A Sector</option>
                  <option>Village C Sector</option>
                  <option>District-Wide Broadcast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-label-caps uppercase font-bold text-on-surface-variant mb-1">
                  Advisory Message
                </label>
                <textarea
                  rows={3}
                  required
                  value={manualMessage}
                  onChange={(e) => setManualMessage(e.target.value)}
                  placeholder="Specific symptoms to look for and immediate chemical/preventive actions..."
                  className="w-full bg-surface-container-low border border-outline rounded-lg p-2.5 text-sm outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 border border-outline rounded-lg text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg text-sm font-bold shadow-sm hover:bg-primary-container"
                >
                  Dispatch Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
