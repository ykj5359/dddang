export default function Header({ currentTab }) {
  const titles = {
    home: '땅땅땅',
    map: '지도 검색',
    detail: '토지 상세',
    matching: '귀농 매칭',
    myLand: '내 토지',
    consult: '상담 / 정보',
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-600 border-b border-primary-700 max-w-md mx-auto">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="font-bold text-lg text-white">
            {titles[currentTab] || '땅땅땅'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="p-2 text-white/80 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
