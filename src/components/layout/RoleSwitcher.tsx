import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setCurrentRole, showToast } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const roles: { role: UserRole; label: string; icon: string; path: string; desc: string }[] = [
    {
      role: 'farmer',
      label: 'Farmer',
      icon: 'psychiatry',
      path: '/farmer/home',
      desc: 'Report issues, check diagnosis, view advisories'
    },
    {
      role: 'expert',
      label: 'Agriculture Expert',
      icon: 'science',
      path: '/expert/dashboard',
      desc: 'Review low-confidence cases, verify diagnoses'
    },
    {
      role: 'officer',
      label: 'District Officer (DAO)',
      icon: 'analytics',
      path: '/dao/monitoring',
      desc: 'Regional monitoring, hotspots, emergency alerts'
    }
  ];

  const handleSelect = (r: typeof roles[0]) => {
    setCurrentRole(r.role);
    setIsOpen(false);
    navigate(r.path);
    showToast(`Switched active role to: ${r.label}`);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-variant border border-outline-variant text-on-surface text-xs md:text-sm font-semibold transition-all shadow-sm active:scale-95"
        title="Switch AgriDetect User Persona"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
        <span className="capitalize font-bold text-primary">Role: {currentRole === 'officer' ? 'District Officer' : currentRole}</span>
        <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 md:w-80 rounded-2xl bg-surface shadow-2xl border border-outline-variant p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-outline-variant/40 mb-2">
              <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Switch Active Persona</p>
              <p className="text-xs text-on-surface-variant">AgriDetect 3-Role Workflow</p>
            </div>
            <div className="space-y-1">
              {roles.map((r) => {
                const isActive = currentRole === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => handleSelect(r)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-container shadow-sm border border-secondary/30'
                        : 'hover:bg-surface-container-low text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {r.icon}
                    </span>
                    <div>
                      <div className="font-body-md font-bold text-sm flex items-center gap-2">
                        {r.label}
                        {isActive && <span className="text-[10px] bg-primary text-on-primary px-2 py-0.5 rounded-full font-bold">ACTIVE</span>}
                      </div>
                      <div className="text-xs opacity-80 mt-0.5">{r.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
