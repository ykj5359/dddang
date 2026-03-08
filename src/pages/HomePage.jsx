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
    <div style={{ width: '100%' }}>
      {/* 히어로 검색 배너 */}
      <div style={{
        background: 'linear-gradient(135deg, #16a34a 0%, #14532d 100%)',
        padding: '40px 24px 60px',
        width: '100%',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <p style={{ color: '#bbf7d0', fontSize: 14, marginBottom: 8 }}>농지 정보 &amp; 귀농 매칭 플랫폼</p>
          <h2 style={{ color: 'white', fontSize: 28, fontWeight: 700, marginBottom: 20 }}>내 농지의 가치를 확인하세요</h2>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, maxWidth: 640 }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="주소 또는 지번 검색 (예: 여주시 강천면)"
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: 12,
                border: 'none',
                fontSize: 14,
                color: '#1f2937',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'white',
                color: '#15803d',
                padding: '12px 20px',
                borderRadius: 12,
                border: 'none',
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              검색
            </button>
          </form>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                style={{
                  fontSize: 12,
                  color: '#bbf7d0',
                  background: 'rgba(255,255,255,0.15)',
                  padding: '4px 12px',
                  borderRadius: 20,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px 32px' }}>

        {/* 빠른 메뉴 */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '20px 24px',
          marginTop: -24,
          marginBottom: 24,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
          }}>
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => onNavigate(action.tab)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 8px',
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 32 }}>{action.icon}</span>
                <span style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2열 그리드 레이아웃 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: 20,
        }}
          className="home-grid"
        >
          {/* 왼쪽: 농지 뉴스 + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 농지 뉴스 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>농지 뉴스</h3>
                <div style={{ display: 'flex', gap: 4 }}>
                  {newsItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setNewsIndex(i)}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        border: 'none',
                        cursor: 'pointer',
                        background: i === newsIndex ? '#16a34a' : '#d1d5db',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={{
                background: 'white',
                borderRadius: 12,
                border: '1px solid #f3f4f6',
                padding: 20,
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              }}>
                <span style={{
                  fontSize: 11,
                  padding: '3px 8px',
                  borderRadius: 20,
                  fontWeight: 600,
                  ...(NEWS_CATEGORY_COLORS[currentNews.category]
                    ? {}
                    : { background: '#f3f4f6', color: '#374151' }),
                }} className={NEWS_CATEGORY_COLORS[currentNews.category] || ''}>
                  {currentNews.category}
                </span>
                <p style={{ marginTop: 10, fontWeight: 500, color: '#111827', fontSize: 15, lineHeight: 1.5 }}>{currentNews.title}</p>
                <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>{currentNews.date}</p>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <button
                  onClick={() => setNewsIndex((newsIndex - 1 + newsItems.length) % newsItems.length)}
                  style={{ flex: 1, padding: '8px', fontSize: 12, color: '#6b7280', background: '#f3f4f6', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                >← 이전</button>
                <button
                  onClick={() => setNewsIndex((newsIndex + 1) % newsItems.length)}
                  style={{ flex: 1, padding: '8px', fontSize: 12, color: '#6b7280', background: '#f3f4f6', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                >다음 →</button>
              </div>
            </div>

            {/* CTA 배너 */}
            <div style={{
              background: '#fdf8f0',
              border: '1px solid #f5d5a8',
              borderRadius: 12,
              padding: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}>
              <span style={{ fontSize: 40 }}>🏛️</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: '#7c4d18', fontSize: 15, margin: 0 }}>농지 처분 의무 고민 중이신가요?</p>
                <p style={{ fontSize: 12, color: '#9e631a', marginTop: 4 }}>농지신탁으로 합법적 보유 가능 — 무료 상담</p>
              </div>
              <button
                onClick={() => onNavigate('consult')}
                style={{
                  background: '#9e631a',
                  color: 'white',
                  fontSize: 13,
                  padding: '10px 16px',
                  borderRadius: 8,
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >상담 신청</button>
            </div>
          </div>

          {/* 오른쪽: 최근 조회 + 신규 매물 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 최근 조회한 토지 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>최근 조회한 토지</h3>
                <button style={{ fontSize: 12, color: '#15803d', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>전체보기</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {recentLands.slice(0, 3).map((land) => (
                  <button
                    key={land.id}
                    onClick={() => onNavigate('detail', land)}
                    style={{
                      background: 'white',
                      borderRadius: 12,
                      border: '1px solid #f3f4f6',
                      padding: 16,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#86efac'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[land.type] || 'bg-gray-100 text-gray-700'}`} style={{ fontSize: 11 }}>
                            {land.type}
                          </span>
                          <span style={{
                            fontSize: 11,
                            padding: '2px 8px',
                            borderRadius: 20,
                            background: land.riskScore >= 50 ? '#fee2e2' : land.riskScore >= 30 ? '#ffedd5' : '#dcfce7',
                            color: land.riskScore >= 50 ? '#b91c1c' : land.riskScore >= 30 ? '#c2410c' : '#15803d',
                          }}>
                            리스크 {land.riskScore}점
                          </span>
                        </div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#111827', margin: 0 }}>{land.address}</p>
                        <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{formatArea(land.area)}</p>
                      </div>
                      <div style={{ textAlign: 'right', marginLeft: 12 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#15803d', margin: 0 }}>{formatPrice(land.price)}</p>
                        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 신규 매물 */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#111827', margin: 0 }}>신규 매물</h3>
                <button onClick={() => onNavigate('matching')} style={{ fontSize: 12, color: '#15803d', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}>전체보기</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {listings.slice(0, 2).map((listing) => (
                  <button
                    key={listing.id}
                    onClick={() => onNavigate('matching')}
                    style={{
                      background: 'white',
                      borderRadius: 12,
                      border: '1px solid #f3f4f6',
                      padding: 16,
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#86efac'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`} style={{ fontSize: 11 }}>
                            {listing.type}
                          </span>
                          <span style={{
                            fontSize: 11,
                            padding: '2px 8px',
                            borderRadius: 20,
                            background: listing.dealType === '매매' ? '#dbeafe' : '#ede9fe',
                            color: listing.dealType === '매매' ? '#1d4ed8' : '#7c3aed',
                            fontWeight: 600,
                          }}>
                            {listing.dealType}
                          </span>
                        </div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#111827', margin: 0 }}>{listing.address}</p>
                        <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{formatArea(listing.area)}</p>
                      </div>
                      <div style={{ textAlign: 'right', marginLeft: 12 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: listing.dealType === '매매' ? '#15803d' : '#7c3aed', margin: 0 }}>
                          {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
                        </p>
                        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{listing.createdAt}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{listing.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 그리드 반응형 스타일 */}
      <style>{`
        @media (max-width: 767px) {
          .home-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
