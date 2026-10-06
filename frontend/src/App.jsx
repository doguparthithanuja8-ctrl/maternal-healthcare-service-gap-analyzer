import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AreaAnalysis from './pages/AreaAnalysis.jsx';
import ServiceGaps from './pages/ServiceGaps.jsx';
import AreaComparison from './pages/AreaComparison.jsx';
import MapView from './pages/MapView.jsx';
import Reports from './pages/Reports.jsx';
import DataManagement from './pages/DataManagement.jsx';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [selectedAreaId, setSelectedAreaId] = useState('area-002');

  const handleNavigate = (route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArea = (id) => {
    setSelectedAreaId(id);
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={handleNavigate}
            onSelectArea={handleSelectArea}
          />
        );
      case 'areas':
        return (
          <AreaAnalysis
            selectedAreaId={selectedAreaId}
            onSelectArea={handleSelectArea}
            onNavigate={handleNavigate}
          />
        );
      case 'gaps':
        return (
          <ServiceGaps
            onNavigate={handleNavigate}
            onSelectArea={handleSelectArea}
          />
        );
      case 'map':
        return (
          <MapView
            onNavigate={handleNavigate}
            onSelectArea={handleSelectArea}
          />
        );
      case 'compare':
        return (
          <AreaComparison
            key={selectedAreaId}
            initialAreaA={selectedAreaId || 'area-001'}
            initialAreaB={selectedAreaId === 'area-002' ? 'area-004' : 'area-002'}
          />
        );
      case 'reports':
        return <Reports />;
      case 'data':
        return <DataManagement />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <MainLayout
      currentRoute={currentRoute}
      onNavigate={handleNavigate}
    >
      {renderCurrentPage()}
    </MainLayout>
  );
}
