import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GRADE_INFO } from '../utils/authUtils';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [farmOpen, setFarmOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const grade = user?.grade || 'bronze';
  const gradeInfo = GRADE_INFO[grade] || GRADE_INFO.bronze;

  const isActive = (path) => pathname === path || (path !== '/' && pathname.startsWith(path));

  const linkClass = (path) =>
    `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
      isActive(path)
        ? 'text-green-700 bg-green-50'
        : 'text-slate-600 hover:text-green-700 hover:bg-slate-50'
    }`;

  return (
    <header className="bg-white border-b border-slate-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <span className="text-base font-bold text-slate-900 tracking-tight">땅꾼</span>
        </Link>

        {/* PC 메뉴 */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 ml-6">
          <Link to="/" className={linkClass('/')}>지도</Link>

          {/* 매물 드롭다운 */}
          <div className="relative" onMouseEnter={() => setTradeOpen(true)} onMouseLeave={() => setTradeOpen(false)}>
            <button className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
              isActive('/land') || isActive('/direct-trade')
                ? 'text-green-700 bg-green-50'
                : 'text-slate-600 hover:text-green-700 hover:bg-slate-50'
            }`}>
              매물
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {tradeOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-40 z-50">
                <Link to="/land-category" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700" onClick={() => setTradeOpen(false)}>유형별 매물</Link>
                <Link to="/direct-trade" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700" onClick={() => setTradeOpen(false)}>직거래 매물</Link>
              </div>
            )}
          </div>

          <Link to="/auction" className={linkClass('/auction')}>경매</Link>
          <Link to="/statistics" className={linkClass('/statistics')}>통계</Link>
          <Link to="/loan" className={linkClass('/loan')}>대출계산기</Link>
          <Link to="/consultation" className={linkClass('/consultation')}>상담신청</Link>

          {/* 농지신탁 드롭다운 */}
          <div className="relative" onMouseEnter={() => setFarmOpen(true)} onMouseLeave={() => setFarmOpen(false)}>
            <button className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
              isActive('/farmland') || isActive('/my-land')
                ? 'text-green-700 bg-green-50'
                : 'text-slate-600 hover:text-green-700 hover:bg-slate-50'
            }`}>
              농지신탁
              <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {farmOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 w-44 z-50">
                <Link to="/farmland-consult" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700" onClick={() => setFarmOpen(false)}>농지신탁 상담</Link>
                <Link to="/farmland-matching" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700" onClick={() => setFarmOpen(false)}>귀농귀촌 매칭</Link>
                <Link to="/my-land" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-green-700" onClick={() => setFarmOpen(false)}>내 토지 관리</Link>
              </div>
            )}
          </div>
        </nav>

        {/* 우측 사용자 영역 */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <Link to="/mypage" className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-green-700 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors">
                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-semibold">{gradeInfo.icon}</span>
                <span>{user.name || user.email?.split('@')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-red-500 px-2 py-2 transition-colors">로그아웃</button>
            </>
          ) : (
            <Link to="/login" className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
              로그인
            </Link>
          )}
        </div>

        {/* 모바일 햄버거 */}
        <button className="md:hidden p-2 text-slate-600 rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-0.5">
          <Link to="/" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>지도</Link>
          <Link to="/land-category" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>유형별 매물</Link>
          <Link to="/direct-trade" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>직거래 매물</Link>
          <Link to="/auction" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>경매</Link>
          <Link to="/statistics" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>통계</Link>
          <Link to="/loan" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>대출계산기</Link>
          <Link to="/consultation" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>상담신청</Link>
          <div className="border-t border-slate-100 my-1" />
          <p className="text-xs text-slate-400 px-3 pb-1 font-semibold uppercase tracking-wide">농지신탁</p>
          <Link to="/farmland-consult" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>농지신탁 상담</Link>
          <Link to="/farmland-matching" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>귀농귀촌 매칭</Link>
          <Link to="/my-land" className="py-2.5 px-3 text-sm text-slate-700 font-medium rounded-md hover:bg-slate-50" onClick={() => setMenuOpen(false)}>내 토지 관리</Link>
          <div className="border-t border-slate-100 my-1" />
          {user ? (
            <>
              <Link to="/mypage" className="py-2.5 px-3 text-sm text-green-700 font-medium rounded-md hover:bg-green-50" onClick={() => setMenuOpen(false)}>마이페이지 ({user.name || user.email?.split('@')[0]})</Link>
              <button onClick={handleLogout} className="py-2.5 px-3 text-sm text-red-500 font-medium rounded-md hover:bg-red-50 text-left">로그아웃</button>
            </>
          ) : (
            <Link to="/login" className="mt-1 bg-green-700 text-white px-4 py-2.5 rounded-md text-center font-medium text-sm" onClick={() => setMenuOpen(false)}>로그인</Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
