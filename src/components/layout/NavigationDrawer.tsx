import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface NavigationDrawerProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpenMobile = false, onCloseMobile }) => {
  const { currentRole } = useApp();

  // Define nav links based on role
  const officerLinks = [
    { label: 'Dashboard', icon: 'dashboard', path: '/dao/monitoring' },
    { label: 'Hotspots', icon: 'location_on', path: '/dao/monitoring' },
    { label: 'Analytics', icon: 'insights', path: '/dao/analytics' },
    { label: 'Cases', icon: 'folder_open', path: '/expert/dashboard' },
    { label: 'Early Warnings', icon: 'warning', path: '/dao/early-warnings' },
    { label: 'Reports', icon: 'summarize', path: '/dao/analytics' },
  ];

  const expertLinks = [
    { label: 'Dashboard', icon: 'dashboard', path: '/expert/dashboard' },
    { label: 'Cases Queue', icon: 'folder_open', path: '/expert/dashboard' },
    { label: 'Hotspots', icon: 'location_on', path: '/dao/monitoring' },
    { label: 'Analytics', icon: 'insights', path: '/dao/analytics' },
    { label: 'Early Warnings', icon: 'warning', path: '/dao/early-warnings' },
  ];

  const farmerLinks = [
    { label: 'Home Dashboard', icon: 'home', path: '/farmer/home' },
    { label: 'Report Problem', icon: 'add_circle', path: '/farmer/report' },
    { label: 'My Crops & Health', icon: 'grass', path: '/farmer/progress' },
    { label: 'Current Risk', icon: 'warning', path: '/farmer/risk-analysis' },
    { label: 'Advisory Guide', icon: 'psychiatry', path: '/farmer/advisory' },
  ];

  const links = currentRole === 'officer' ? officerLinks : currentRole === 'expert' ? expertLinks : farmerLinks;

  const profileInfo = {
    title: currentRole === 'officer' ? 'AgriDetect Admin' : currentRole === 'expert' ? 'Dr. Ramesh' : 'Ramesh Patel',
    subtitle: currentRole === 'officer' ? 'District Officer' : currentRole === 'expert' ? 'Senior Pathologist' : 'Farmer (Siwan)',
    avatar: currentRole === 'officer'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuASvRJEdwLrTnOtL42x5WKNWe2Uw9nUvnn3Wcqn1xPF07E5Y2mWWcQAcIxLYhH7eKHBDHjAuvIfuWCq6ON29q33X2fiNOAfVNGF0oz7cGM6oL2JeBhCmy4-5r-utQIl84fjZK1gL73apEIpDDqC4ByrhhAhTaIKIvx0dL-dnHjTvs2FEOy7TTWeSY7_TcAhy_Yal1LFVxUTODWm7YKJHzyOsHzYEIp4vOaBLncOfUwrOjS6coxCgWERqw'
      : currentRole === 'expert'
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu8dsZWG4qTlmWVt9Qf4rbxFBasAUTiB5wCJ_Hi2HfQGv5hXb9g84uA-2sE_A025kbtb6aDL-N-deAA35y4KhTDtFhPRa0ZEjO2yEaRol9xDtANV4A86csXYZcqj3gF6jxUQ-WKESb4uHTP7YvvSj8s0wEglcEvPvwZddRG4zZdALch7HD0aQR6TsjBmp-AGclQLp3CjWNuzVzZqegMv8GoorvRBQwyBCIZ-yR3nbnZDfjz39uUfuXvg'
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKDTzRmuRgw0lq0lF6Ost7rtLI9h-zwFB70tynSoB-nfKq2VufWXAsxOL12E6YnojwszoD847hdx45VP9JF8c0ZzDz8ql5-4h9Ti08iJL4-lqjY-tDTaTrhCMViJwvhsneSAbYtCP-xKs54Jbu6MReiOW9X2GkaDQhMmnrxQRAilovpmw_nzoJhpf8Ovf4FUozGucU3yjxGBAKfIBrDAbh8l3_qywm2pDrymLD8mRySCbbqYuis8VdZw'
  };

  const navContent = (
    <div className="flex flex-col h-full bg-surface-container-low border-r border-outline-variant shadow-md">
      {/* User Card */}
      <div className="p-container-margin border-b border-outline-variant/40 flex items-center gap-4 pt-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-variant flex-shrink-0 border-2 border-primary-container">
          <img src={profileInfo.avatar} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <p className="font-body-md font-bold text-on-surface truncate">{profileInfo.title}</p>
          <p className="font-label-caps text-on-surface-variant text-xs truncate">{profileInfo.subtitle}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">Active Now</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto px-2">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm translate-x-1'
                  : 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {link.icon}
            </span>
            <span className="font-body-md text-sm">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom status */}
      <div className="p-4 border-t border-outline-variant/30">
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span className="font-label-caps">AGRIDETECT AI</span>
          <span className="flex items-center gap-1 text-secondary font-bold">
            <span className="material-symbols-outlined text-sm">cloud_done</span> ONLINE
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Drawer */}
      <aside className="hidden md:flex flex-col w-64 fixed left-0 top-[64px] bottom-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Modal Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-64 h-full z-50 pt-[64px]">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
