import { useState } from 'react';
import { recentLands, listings, newsItems } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

const NEWS_CATEGORY_COLORS = {
  농지법: 'bg-red-100 text-red-700',
  귀농지원: 'bg-green-100 text-green-700',
  시장동향: 'bg-blue-100 text-blue-700',
  농지신탁: 'bg-orange-100 text-orange-700',
};

const QUICK_ACTIONS = [
  { icon: '🗺️', label: '지도 검색', tab: 'map' },
  { icon: '💰', label: '실거래가', tab: 'detail' },
  { icon: '🌾', label: '귀농 매칭', tab: 'matching' },
  { icon: '🏛️', label: '농지신탁', tab: 'consult' },
];

const QUICK_TAGS = ['경기 여주', '충남 홍성', '전북 완주', '강원 평창'];

export default function HomePage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsIndex, setNewsIndex] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) onNavigate('detail', { address: searchQuery });
  };

  const currentNews = newsItems[newsIndex];

  return (
    <div className="pb-4">
      {/* 히어로 검색 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 px-4 pt-6 pb-8">
        <p className="text-primary-100 text-sm mb-1">농지 정보 &amp; 귀농 매칭 플랫폼</p>
        <h2 className="text-white text-xl font-bold mb-4">내 농지의 가치를 확인하세요</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="주소 또는 지번 검색 (예: 여주시 강천면)"
            className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-300"
          />
          <button
            type="submit"
            className="bg-white text-primary-600 px-4 py-3 rounded-xl font-semibold text-sm hover:bg-primary-50 transition-colors"
          >
            검색
          </button>
        </form>
        <div className="flex gap-2 mt-3 flex-wrap">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="text-xs text-primary-100 bg-primary-700/50 px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 빠른 메뉴 */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="grid grid-cols-4 gap-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => onNavigate(action.tab)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs text-gray-600 font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 농지 뉴스 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">농지 뉴스</h3>
          <div className="flex gap-1">
            {newsItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setNewsIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === newsIndex ? 'bg-primary-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${NEWS_CATEGORY_COLORS[currentNews.category] || 'bg-gray-100 text-gray-700'}`}>
            {currentNews.category}
          </span>
          <p className="mt-2 font-medium text-gray-900 text-sm leading-relaxed">{currentNews.title}</p>
          <p className="text-xs text-gray-400 mt-1">{currentNews.date}</p>
        </div>
        <div className="flex gap-1 mt-2">
          <button
            onClick={() => setNewsIndex((newsIndex - 1 + newsItems.length) % newsItems.length)}
            className="flex-1 py-1.5 text-xs text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← 이전
          </button>
          <button
            onClick={() => setNewsIndex((newsIndex + 1) % newsItems.length)}
            className="flex-1 py-1.5 text-xs text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            다음 →
          </button>
        </div>
      </div>

      {/* 최근 조회한 토지 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">최근 조회한 토지</h3>
          <button className="text-xs text-primary-600 font-medium">전체보기</button>
        </div>
        <div className="flex flex-col gap-3">
          {recentLands.map((land) => (
            <button
              key={land.id}
              onClick={() => onNavigate('detail', land)}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-left hover:border-primary-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[land.type] || 'bg-gray-100 text-gray-700'}`}>
                      {land.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      land.riskScore >= 50 ? 'bg-red-100 text-red-700' :
                      land.riskScore >= 30 ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      리스크 {land.riskScore}점
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">{land.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatArea(land.area)}</p>
                </div>
                <div className="text-right ml-3">
                  <p className="text-sm font-bold text-primary-700">{formatPrice(land.price)}</p>
                  <p className="text-xs text-gray-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 신규 매물 */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">신규 매물</h3>
          <button onClick={() => onNavigate('matching')} className="text-xs text-primary-600 font-medium">
            전체보기
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {listings.slice(0, 2).map((listing) => (
            <button
              key={listing.id}
              onClick={() => onNavigate('matching')}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-left hover:border-primary-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`}>
                      {listing.type}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      listing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {listing.dealType}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-tight">{listing.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatArea(listing.area)}</p>
                </div>
                <div className="text-right ml-3">
                  <p className={`text-sm font-bold ${listing.dealType === '매매' ? 'text-primary-700' : 'text-purple-700'}`}>
                    {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
                  </p>
                  <p className="text-xs text-gray-400">{listing.createdAt}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 line-clamp-1">{listing.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA 배너 */}
      <div className="px-4 mt-5">
        <div className="bg-earth-50 border border-earth-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏛️</span>
            <div className="flex-1">
              <p className="font-bold text-earth-800 text-sm">농지 처분 의무 고민 중이신가요?</p>
              <p className="text-xs text-earth-600 mt-0.5">농지신탁으로 합법적 보유 가능 — 무료 상담</p>
            </div>
            <button
              onClick={() => onNavigate('consult')}
              className="bg-earth-600 text-white text-xs px-3 py-2 rounded-lg font-medium hover:bg-earth-700 transition-colors whitespace-nowrap"
            >
              상담 신청
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
