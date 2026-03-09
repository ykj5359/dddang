import { useState } from 'react';
import { recentLands, listings, newsItems } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

const QUICK_ACTIONS = [
  { icon: '🗺️', label: '지도 검색', tab: 'map', color: 'from-teal-500 to-teal-700' },
  { icon: '💰', label: '실거래가', tab: 'detail', color: 'from-blue-500 to-blue-700' },
  { icon: '🌾', label: '귀농 매칭', tab: 'matching', color: 'from-amber-500 to-orange-600' },
  { icon: '🏛️', label: '농지신탁', tab: 'consult', color: 'from-purple-500 to-purple-700' },
];

const MARKET_STATS = [
  { label: '전국 평균 공시지가', value: '92,000원', unit: '/㎡', trend: '+8.5%', up: true },
  { label: '이달 거래량', value: '1,248건', unit: '', trend: '+12%', up: true },
  { label: '귀농 매칭 매물', value: '287건', unit: '', trend: '+35건', up: true },
];

const QUICK_TAGS = ['경기 여주', '충남 홍성', '전북 완주', '강원 평창'];

const NEWS_CATEGORY_COLORS = {
  농지법:   'bg-red-100 text-red-700',
  귀농지원: 'bg-emerald-100 text-emerald-700',
  시장동향: 'bg-sky-100 text-sky-700',
  농지신탁: 'bg-amber-100 text-amber-700',
};

export default function HomePage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsIndex, setNewsIndex] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) onNavigate('detail', { address: searchQuery });
  };

  const currentNews = newsItems[newsIndex];

  return (
    <div>
      {/* ── Hero ── */}
      <div
        className="px-4 pt-8 pb-10 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 60%, #134e4a 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-16 -right-4 w-24 h-24 rounded-full bg-primary-400/10 pointer-events-none" />

        <p className="text-primary-300 text-xs font-semibold uppercase tracking-widest mb-2">농지 정보 & 귀농 매칭 플랫폼</p>
        <h1 className="text-white text-2xl md:text-3xl font-black leading-snug mb-6">
          내 농지의 가치를<br />지금 확인하세요
        </h1>

        {/* Search box */}
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl p-3 flex gap-2">
          <div className="flex-1 flex items-center gap-2 px-2">
            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="주소 또는 지번 검색 (예: 여주시 강천면)"
              className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-700 transition-colors flex-shrink-0"
          >
            검색
          </button>
        </form>

        {/* Quick tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs text-primary-200 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-medium transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Market stats strip ── */}
      <div className="bg-white border-b border-slate-100 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex min-w-max">
          {MARKET_STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3 border-r border-slate-100 last:border-0">
              <div>
                <p className="text-xs text-slate-500 whitespace-nowrap">{stat.label}</p>
                <p className="text-sm font-bold text-slate-800">
                  {stat.value}
                  <span className="text-xs font-normal text-slate-400">{stat.unit}</span>
                </p>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <div className="px-4 mt-5">
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => onNavigate(action.tab)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md`}>
                <span className="text-2xl">{action.icon}</span>
              </div>
              <span className="text-xs font-semibold text-slate-600 text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Content grid: 1 col on mobile, 2 cols on md+ ── */}
      <div className="px-4 mt-6 md:grid md:grid-cols-2 md:gap-5">

        {/* ── Left column ── */}
        <div className="space-y-5">

          {/* News */}
          <div>
            <div className="section-header">
              <h2 className="section-title">농지 뉴스</h2>
              <div className="flex gap-1 items-center">
                {newsItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setNewsIndex(i)}
                    className={`rounded-full transition-all ${i === newsIndex ? 'w-4 h-2 bg-primary-600' : 'w-2 h-2 bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
            <div className="card">
              <span className={`badge text-xs font-semibold ${NEWS_CATEGORY_COLORS[currentNews.category] || 'bg-slate-100 text-slate-700'}`}>
                {currentNews.category}
              </span>
              <p className="mt-2.5 font-semibold text-slate-900 text-sm leading-relaxed">{currentNews.title}</p>
              <p className="text-xs text-slate-400 mt-1.5">{currentNews.date}</p>
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setNewsIndex((newsIndex - 1 + newsItems.length) % newsItems.length)}
                  className="flex-1 py-1.5 text-xs text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >← 이전</button>
                <button
                  onClick={() => setNewsIndex((newsIndex + 1) % newsItems.length)}
                  className="flex-1 py-1.5 text-xs text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                >다음 →</button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl p-5 text-white"
            style={{ background: 'linear-gradient(135deg, #7c4d18 0%, #9e631a 100%)' }}
          >
            <p className="text-xs text-amber-200 font-semibold uppercase tracking-widest mb-1">무료 상담</p>
            <p className="font-bold text-base mb-1">농지 처분 의무 고민 중이신가요?</p>
            <p className="text-xs text-amber-100 mb-4">농지신탁으로 합법적 보유 가능</p>
            <button
              onClick={() => onNavigate('consult')}
              className="w-full bg-white text-earth-700 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors"
            >
              상담 신청하기 →
            </button>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-5 mt-5 md:mt-0">

          {/* Recent lands */}
          <div>
            <div className="section-header">
              <h2 className="section-title">최근 조회한 토지</h2>
              <button className="text-xs text-primary-600 font-semibold">전체보기</button>
            </div>
            <div className="space-y-2.5">
              {recentLands.map((land) => (
                <button
                  key={land.id}
                  onClick={() => onNavigate('detail', land)}
                  className="w-full card-hover text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`badge text-xs ${LAND_TYPE_COLORS[land.type] || 'bg-slate-100 text-slate-600'}`}>
                          {land.type}
                        </span>
                        <span className={`badge text-xs ${
                          land.riskScore >= 50 ? 'bg-red-100 text-red-700' :
                          land.riskScore >= 30 ? 'bg-amber-100 text-amber-700' :
                          'bg-emerald-100 text-emerald-700'
                        }`}>
                          리스크 {land.riskScore}점
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">{land.address}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatArea(land.area)}</p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className="text-sm font-bold text-primary-700">{formatPrice(land.price)}</p>
                      <p className="text-xs text-slate-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* New listings */}
          <div>
            <div className="section-header">
              <h2 className="section-title">신규 매물</h2>
              <button onClick={() => onNavigate('matching')} className="text-xs text-primary-600 font-semibold">
                전체보기
              </button>
            </div>
            <div className="space-y-2.5">
              {listings.slice(0, 2).map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => onNavigate('matching')}
                  className="w-full card-hover text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={`badge ${LAND_TYPE_COLORS[listing.type] || 'bg-slate-100 text-slate-600'}`}>
                          {listing.type}
                        </span>
                        <span className={`badge ${
                          listing.dealType === '매매' ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {listing.dealType}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 truncate">{listing.address}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatArea(listing.area)}</p>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <p className={`text-sm font-bold ${listing.dealType === '매매' ? 'text-primary-700' : 'text-purple-700'}`}>
                        {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
                      </p>
                      <p className="text-xs text-slate-400">{listing.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 truncate">{listing.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-4" />
    </div>
  );
}
