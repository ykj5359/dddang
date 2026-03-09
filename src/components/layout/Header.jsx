import { useState } from 'react';

export default function Header({ currentTab, onTabChange, navItems }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)', height: 60 }}
      >
        <div className="h-full max-w-5xl mx-auto px-4 flex items-center justify-between">
          {/* ── Logo ── */}
          <button
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-400/30 flex items-center justify-center">
              <span className="text-lg leading-none">🌾</span>
            </div>
            <span className="font-black text-white text-lg tracking-tight">땅땅땅</span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = currentTab === item.id || (currentTab === 'detail' && item.id === 'home');
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon(active)}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/10" aria-label="알림">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold hover:bg-white/30 transition-colors" aria-label="프로필">
              나
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 ml-1"
              aria-label="메뉴"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile dropdown menu ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-[60px] left-0 right-0 shadow-2xl border-b border-white/10"
            style={{ background: 'linear-gradient(180deg, #0f766e 0%, #134e4a 100%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { onTabChange(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold border-b border-white/10 transition-colors ${
                    active ? 'text-white bg-white/20' : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon(active)}
                  <span>{item.label}</span>
                  {active && <span className="ml-auto w-2 h-2 rounded-full bg-primary-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
