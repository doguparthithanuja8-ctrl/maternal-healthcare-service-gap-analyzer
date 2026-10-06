import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import DisclaimerNotice from '../components/DisclaimerNotice.jsx';

export default function MainLayout({ currentRoute, onNavigate, children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F9F8] text-slate-800">
      {/* Sidebar Navigation (Deep Green #176B5B) */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <Navbar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
        />

        {/* Scrollable Viewport Content */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
            <div className="pt-6">
              <DisclaimerNotice compact />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
