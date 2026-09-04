import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { RoleSwitcher } from './RoleSwitcher';

interface TopAppBarProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({ onToggleSidebar, showSidebarToggle = false }) => {
  const { currentRole, language, setLanguage, showToast } = useApp();

  const getHomeLink = () => {
    switch (currentRole) {
      case 'expert':
        return '/expert/dashboard';
      case 'officer':
        return '/dao/monitoring';
      default:
        return '/farmer/home';
    }
  };

  return (
    <header className="bg-surface shadow-sm flex justify-between items-center px-container-margin h-touch-target-min w-full fixed top-0 z-40 border-b border-outline-variant/30">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Menu"
            className="md:hidden text-primary hover:bg-surface-container-low transition-colors rounded-full p-2"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        )}
        <Link to={getHomeLink()} className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            agriculture
          </span>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">AgriDetect</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switcher */}
        <RoleSwitcher />

        {/* Language switch */}
        <button
          onClick={() => {
            const next = language === 'en' ? 'hi' : 'en';
            setLanguage(next);
            showToast(next === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई' : 'Language set to English');
          }}
          className="hidden sm:flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full border border-outline-variant hover:bg-surface-container-high transition-colors font-medium text-on-surface-variant"
          title="Switch Language"
        >
          <span className="material-symbols-outlined text-[16px]">language</span>
          <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => showToast('You have 2 unread regional disease alerts')}
          aria-label="Notifications"
          className="relative text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full p-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
        </button>

        {/* Persona Indicator (Desktop) */}
        {currentRole === 'officer' && (
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-outline-variant/40">
            <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-caps text-[11px] font-bold">
              RA
            </span>
            <span className="font-label-caps text-xs text-on-surface font-semibold">Regional Admin</span>
          </div>
        )}
        {currentRole === 'expert' && (
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-outline-variant/40">
            <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-caps text-[11px] font-bold">
              EX
            </span>
            <span className="font-label-caps text-xs text-on-surface font-semibold">Dr. Ramesh (Expert)</span>
          </div>
        )}
      </div>
    </header>
  );
};
