import { useState } from 'react';
import HomePage from './pages/HomePage';
import MapSearchPage from './pages/MapSearchPage';
import LandDetailPage from './pages/LandDetailPage';
import FarmingMatchPage from './pages/FarmingMatchPage';
import MyLandPage from './pages/MyLandPage';
import ConsultPage from './pages/ConsultPage';

const NAV_ITEMS = [
  {
    id: 'home', label: '홈',
    icon: (active) => (
      <svg width="20" height="20" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'map', label: '지도검색',
    icon: (active) => (
      <svg width="20" height="20" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 'matching', label: '귀농매칭',
    icon: (active) => (
      <svg width="20" height="20" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    id: 'myLand', label: '내토지',
    icon: (active) => (
      <svg width="20" height="20" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'consult', label: '상담/정보',
    icon: (active) => (
      <svg width="20" height="20" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const PAGE_TITLES = {
  home: '땅땅땅', map: '지도 검색', detail: '토지 상세',
  matching: '귀농 매칭', myLand: '내 토지', consult: '상담 / 정보',
};

export default function App() {
  const [tab, setTab] = useState('home');
  const [selectedLand, setSelectedLand] = useState(null);

  const navigate = (nextTab, land = null) => {
    setTab(nextTab);
    if (land) setSelectedLand(land);
  };

  const renderPage = () => {
    switch (tab) {
      case 'home':     return <HomePage onNavigate={navigate} />;
      case 'map':      return <MapSearchPage onNavigate={navigate} />;
      case 'detail':   return <LandDetailPage land={selectedLand} onNavigate={navigate} />;
      case 'matching': return <FarmingMatchPage />;
      case 'myLand':   return <MyLandPage onNavigate={navigate} />;
      case 'consult':  return <ConsultPage />;
      default:         return <HomePage onNavigate={navigate} />;
    }
  };

  const isMap = tab === 'map';

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* ── 헤더 ── */}
      <header className="app-header">
        <div className="app-header-inner" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '0 16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#15803d' }}>
              {PAGE_TITLES[tab] || '땅땅땅'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', borderRadius: 8 }} aria-label="알림">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', borderRadius: 8 }} aria-label="프로필">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── 데스크탑 사이드바 (CSS로 제어) ── */}
      <aside className="app-sidebar">
        <p style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '8px 16px 12px' }}>메뉴</p>
        {NAV_ITEMS.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                margin: '2px 10px', padding: '10px 12px', borderRadius: 8,
                border: 'none', cursor: 'pointer', width: 'calc(100% - 20px)',
                background: active ? '#f0fdf4' : 'transparent',
                color: active ? '#15803d' : '#4b5563',
                fontSize: 14, fontWeight: 500, textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = '#f9fafb'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              {item.icon(active)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main
        className="app-main"
        style={isMap ? { height: 'calc(100vh - 56px)', overflow: 'hidden' } : undefined}
      >
        {renderPage()}
      </main>

      {/* ── 모바일 하단 탭바 (CSS로 제어) ── */}
      <nav className="app-bottomnav">
        {NAV_ITEMS.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 3, border: 'none', background: 'none',
                cursor: 'pointer', color: active ? '#15803d' : '#9ca3af', fontSize: 10, fontWeight: 500,
              }}
            >
              {item.icon(active)}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
