const PAGE_TITLES = {
  home: '땅땅땅',
  map: '지도 검색',
  detail: '토지 상세',
  matching: '귀농 매칭',
  myLand: '내 토지',
  consult: '상담 / 정보',
};

export default function Header({ currentTab, isDesktop, sidebarWidth = 224 }) {
  const title = PAGE_TITLES[currentTab] || '땅땅땅';

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 56,
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: isDesktop ? sidebarWidth + 16 : 16,
        paddingRight: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>🌱</span>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#15803d' }}>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{ padding: 8, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }} aria-label="알림">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button style={{ padding: 8, color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 8 }} aria-label="프로필">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
