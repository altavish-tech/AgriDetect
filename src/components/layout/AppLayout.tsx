import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { TopAppBar } from './TopAppBar';
import { NavigationDrawer } from './NavigationDrawer';
import { BottomNavBar } from './BottomNavBar';
import { useApp } from '../../context/AppContext';

export const AppLayout: React.FC = () => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { currentRole } = useApp();
  const location = useLocation();

  // Certain linear transactional flows (welcome, analysis progress, photo capture) can hide side drawers or bottom bars
  const isLinearFlow =
    location.pathname === '/' ||
    location.pathname === '/welcome' ||
    location.pathname === '/farmer/analyzing';

  const showDrawer = !isLinearFlow && (currentRole === 'officer' || currentRole === 'expert' || location.pathname.startsWith('/dao') || location.pathname.startsWith('/expert'));

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans">
      {!isLinearFlow && (
        <TopAppBar
          onToggleSidebar={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          showSidebarToggle={showDrawer}
        />
      )}

      <div className="flex-1 flex">
        {showDrawer && (
          <NavigationDrawer
            isOpenMobile={isMobileDrawerOpen}
            onCloseMobile={() => setIsMobileDrawerOpen(false)}
          />
        )}

        <main
          className={`flex-1 flex flex-col min-h-screen transition-all ${
            !isLinearFlow ? 'pt-[64px] pb-24 md:pb-6' : ''
          } ${showDrawer ? 'md:pl-64' : ''}`}
        >
          <Outlet />
        </main>
      </div>

      {!isLinearFlow && <BottomNavBar />}
    </div>
  );
};
