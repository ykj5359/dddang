import { useState } from 'react';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
import HomePage from './pages/HomePage';
import MapSearchPage from './pages/MapSearchPage';
import LandDetailPage from './pages/LandDetailPage';
import FarmingMatchPage from './pages/FarmingMatchPage';
import MyLandPage from './pages/MyLandPage';
import ConsultPage from './pages/ConsultPage';

export const NAV_ITEMS = [
  {
    id: 'home',
    label: '홈',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'map',
    label: '지도검색',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'matching',
    label: '귀농매칭',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'myLand',
    label: '내토지',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'consult',
    label: '상담/정보',
    icon: (active) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [selectedLand, setSelectedLand] = useState(null);

  const navigate = (tab, land = null) => {
    setCurrentTab(tab);
    if (land) setSelectedLand(land);
  };

  const renderPage = () => {
    switch (currentTab) {
      case 'home':     return <HomePage onNavigate={navigate} />;
      case 'map':      return <MapSearchPage onNavigate={navigate} />;
      case 'detail':   return <LandDetailPage land={selectedLand} onNavigate={navigate} />;
      case 'matching': return <FarmingMatchPage />;
      case 'myLand':   return <MyLandPage onNavigate={navigate} />;
      case 'consult':  return <ConsultPage />;
      default:         return <HomePage onNavigate={navigate} />;
    }
  };

  const isMapPage = currentTab === 'map';
  const HEADER_H = 60;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ── Header (always on top) ── */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} navItems={NAV_ITEMS} />

      {/* ── Main content ── */}
      <div style={{ paddingTop: HEADER_H }}>
        {isMapPage ? (
          <div style={{ height: `calc(100vh - ${HEADER_H}px)` }}>
            {renderPage()}
          </div>
        ) : (
          <main className="max-w-5xl mx-auto pb-20 md:pb-8 min-h-screen">
            {renderPage()}
          </main>
        )}
      </div>

      {/* ── Mobile bottom tab bar ── */}
      <div className="md:hidden">
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} navItems={NAV_ITEMS} />
      </div>
    </div>
  );
}
