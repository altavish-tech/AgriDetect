import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const BottomNavBar: React.FC = () => {
  const { currentRole } = useApp();

  const farmerTabs = [
    { label: 'Home', icon: 'home', path: '/farmer/home' },
    { label: 'Report', icon: 'add_circle', path: '/farmer/report' },
    { label: 'My Crops', icon: 'grass', path: '/farmer/progress' },
    { label: 'Risk Info', icon: 'warning', path: '/farmer/risk-analysis' },
    { label: 'Advisory', icon: 'psychiatry', path: '/farmer/advisory' },
  ];

  const expertTabs = [
    { label: 'Cases', icon: 'folder_open', path: '/expert/dashboard' },
    { label: 'Hotspots', icon: 'location_on', path: '/dao/monitoring' },
    { label: 'Analytics', icon: 'insights', path: '/dao/analytics' },
    { label: 'Advisories', icon: 'campaign', path: '/dao/early-warnings' },
  ];

  const officerTabs = [
    { label: 'Monitoring', icon: 'dashboard', path: '/dao/monitoring' },
    { label: 'Analytics', icon: 'insights', path: '/dao/analytics' },
    { label: 'Warnings', icon: 'warning', path: '/dao/early-warnings' },
    { label: 'Cases', icon: 'folder_open', path: '/expert/dashboard' },
  ];

  const tabs = currentRole === 'officer' ? officerTabs : currentRole === 'expert' ? expertTabs : farmerTabs;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.08)] border-t border-outline-variant/30 rounded-t-2xl">
      {tabs.map((tab) => (
        <NavLink
          key={tab.label}
          to={tab.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all min-h-[44px] ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container font-bold scale-105 shadow-sm'
                : 'text-on-surface-variant hover:text-primary active:scale-95'
            }`
          }
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {tab.icon}
          </span>
          <span className="font-label-caps text-[10px] mt-0.5 whitespace-nowrap">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};
