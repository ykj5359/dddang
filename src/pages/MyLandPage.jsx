import { useState } from 'react';
import { myLands, savedLands } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

export default function MyLandPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('my');

  const totalValue = myLands.reduce((acc, l) => acc + l.totalValue, 0);
  const totalPyeong = Math.round(myLands.reduce((acc, l) => acc + l.area, 0) / 3.3058);

  const LandCard = ({ land, showSavedBadge = false }) => (
    <button onClick={() => onNavigate('detail', land)}
      style={{ width: '100%', background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 20, textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#86efac'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[land.type] || 'bg-gray-100 text-gray-700'}`}>{land.type}</span>
            {showSavedBadge && <span style={{ fontSize: 11, color: '#9ca3af' }}>관심 등록</span>}
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>{land.address}</p>
          <p style={{ fontSize: 13, color: '#6b7280' }}>{formatArea(land.area)}</p>
        </div>
        <div style={{ textAlign: 'right', marginLeft: 16 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#15803d', marginBottom: 4 }}>{formatPrice(land.totalValue)}</p>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>공시 {land.officialPrice.toLocaleString()}원/㎡</p>
        </div>
      </div>
      {!showSavedBadge && (
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 12, background: '#f0fdf4', color: '#15803d', padding: '4px 10px', borderRadius: 6, border: '1px solid #bbf7d0' }}>공시지가 조회</span>
          <span style={{ fontSize: 12, background: '#eff6ff', color: '#1d4ed8', padding: '4px 10px', borderRadius: 6, border: '1px solid #bfdbfe' }}>실거래가 조회</span>
          <span style={{ fontSize: 12, background: '#fff7ed', color: '#c2410c', padding: '4px 10px', borderRadius: 6, border: '1px solid #fed7aa' }}>리스크 분석</span>
        </div>
      )}
    </button>
  );

  return (
    <div>
      {/* 배너 */}
      <div style={{ background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)', padding: '36px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ color: '#bbf7d0', fontSize: 14, marginBottom: 10 }}>보유 농지 현황</p>
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            <div>
              <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>{myLands.length}</span>
              <span style={{ fontSize: 16, color: '#bbf7d0', marginLeft: 4 }}>필지</span>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <span style={{ fontSize: 36, fontWeight: 700, color: 'white' }}>{totalPyeong.toLocaleString()}</span>
              <span style={{ fontSize: 16, color: '#bbf7d0', marginLeft: 4 }}>평</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '14px 18px', display: 'inline-block' }}>
            <p style={{ fontSize: 12, color: '#dcfce7', marginBottom: 2 }}>공시지가 합산 추정액</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>{formatPrice(totalValue)}</p>
            <p style={{ fontSize: 11, color: '#dcfce7', marginTop: 2 }}>※ 개별 공시지가 기준 · 실거래가와 다를 수 있음</p>
          </div>
        </div>
      </div>

      {/* 탭 바 */}
      <div className="pc-tabs">
        <div className="pc-tabs-inner">
          {[
            { id: 'my', label: `내 토지 (${myLands.length})` },
            { id: 'saved', label: `관심 필지 (${savedLands.length})` },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === tab.id ? '2px solid #16a34a' : '2px solid transparent', color: activeTab === tab.id ? '#16a34a' : '#6b7280' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pc-container" style={{ paddingTop: 24 }}>
        <div className="pc-grid-2">
          {/* 왼쪽: 토지 목록 */}
          <div>
            {activeTab === 'my' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {myLands.map((land) => <LandCard key={land.id} land={land} />)}
                <button onClick={() => onNavigate('home')}
                  style={{ width: '100%', border: '2px dashed #e5e7eb', borderRadius: 14, padding: '20px', fontSize: 14, color: '#9ca3af', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#86efac'; e.currentTarget.style.color = '#16a34a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#9ca3af'; }}
                >
                  + 토지 추가하기
                </button>
              </div>
            )}

            {activeTab === 'saved' && (
              <>
                {savedLands.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
                    <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🔖</span>
                    <p style={{ fontSize: 15, marginBottom: 4 }}>관심 필지가 없습니다</p>
                    <p style={{ fontSize: 13 }}>토지 상세 페이지에서 북마크하세요</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {savedLands.map((land) => <LandCard key={land.id} land={land} showSavedBadge />)}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 오른쪽 사이드바 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* 요약 통계 */}
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 16 }}>보유 현황 요약</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: '보유 필지', value: `${myLands.length}필지` },
                  { label: '총 면적', value: `${myLands.reduce((a, l) => a + l.area, 0).toLocaleString()}㎡` },
                  { label: '총 평수', value: `${totalPyeong.toLocaleString()}평` },
                  { label: '공시 총액', value: formatPrice(totalValue), highlight: true },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9fafb', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: item.highlight ? '#15803d' : '#111827' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: '#fdf8f0', border: '1px solid #f5d5a8', borderRadius: 14, padding: 24 }}>
              <p style={{ fontWeight: 700, color: '#7c4d18', fontSize: 15, marginBottom: 8 }}>보유 농지 종합 분석 리포트</p>
              <p style={{ fontSize: 13, color: '#9e631a', marginBottom: 16, lineHeight: 1.6 }}>공시지가 합산, 리스크 스코어, 신탁 가능 여부를 한눈에</p>
              <button onClick={() => onNavigate('consult')}
                style={{ width: '100%', background: '#9e631a', color: 'white', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                무료 상담 신청
              </button>
            </div>

            {/* 빠른 기능 */}
            <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: '#111827' }}>빠른 기능</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: '🗺️', label: '지도에서 내 토지 보기', tab: 'map' },
                  { icon: '🌾', label: '귀농 매칭 찾기', tab: 'matching' },
                  { icon: '💬', label: '전문가 상담', tab: 'consult' },
                ].map((item) => (
                  <button key={item.label} onClick={() => onNavigate(item.tab)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: '1px solid #f3f4f6', background: '#f9fafb', cursor: 'pointer', fontSize: 14, color: '#374151', fontWeight: 500, textAlign: 'left' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.borderColor = '#bbf7d0'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#f3f4f6'; }}
                  >
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
