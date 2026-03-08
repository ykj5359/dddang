import { useState } from 'react';
import { recentLands, priceHistory, nearbyLivestock } from '../data/dummyData';
import { formatPrice, formatArea } from '../utils/format';

const LIVESTOCK_ICONS = { 돈사: '🐷', 계사: '🐔', 우사: '🐄' };

function RiskBar({ score }) {
  const level =
    score >= 60 ? { color: '#ef4444', label: '높음' } :
    score >= 30 ? { color: '#f97316', label: '보통' } :
                  { color: '#22c55e', label: '낮음' };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: '#4b5563' }}>자경 의무 위반 위험도</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: level.color }}>{score}점 ({level.label})</span>
      </div>
      <div style={{ width: '100%', background: '#f3f4f6', borderRadius: 99, height: 10 }}>
        <div style={{ height: 10, borderRadius: 99, background: level.color, width: `${score}%`, transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

function PriceChart({ data }) {
  const maxPrice = Math.max(...data.map((d) => d.avgPrice));
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
        {data.map((item, i) => {
          const isLatest = i === data.length - 1;
          return (
            <div key={item.year} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 11, color: '#6b7280', fontWeight: 500 }}>{item.avgPrice.toLocaleString()}</span>
              <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: isLatest ? '#16a34a' : '#bbf7d0', height: `${(item.avgPrice / maxPrice) * 80}px` }} />
              <span style={{ fontSize: 11, color: '#6b7280' }}>{item.year}</span>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 8, textAlign: 'center' }}>단위: 원/㎡ | 기준: 해당 읍면동 평균 실거래가</p>
    </div>
  );
}

const TABS = [
  { id: 'info', label: '기본정보' },
  { id: 'price', label: '가격정보' },
  { id: 'analysis', label: '분석' },
];

const RECENT_DEALS = [
  { date: '2026-02', price: 92000, area: 2640, type: '전' },
  { date: '2025-11', price: 88000, area: 1980, type: '전' },
  { date: '2025-08', price: 85000, area: 3300, type: '답' },
];

const ENV_ITEMS = [
  { label: '공장', count: 0, ok: true },
  { label: '묘지', count: 1, ok: false },
  { label: '송전탑', count: 0, ok: true },
  { label: '군사시설', count: 0, ok: true },
  { label: '도로 접면', count: 1, ok: true },
  { label: '수원 접근', count: 1, ok: true },
];

export default function LandDetailPage({ land, onNavigate }) {
  const [activeTab, setActiveTab] = useState('info');
  const selectedLand = land || recentLands[0];

  if (!selectedLand) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: 56, marginBottom: 16 }}>🔍</span>
        <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>조회할 토지를 선택하세요</p>
        <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>홈 또는 지도에서 토지를 선택하거나 검색하세요</p>
        <button onClick={() => onNavigate('home')} style={{ background: '#16a34a', color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const ratio = ((selectedLand.dealPrice / selectedLand.officialPrice) * 100).toFixed(0);

  const card = (children) => (
    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', marginBottom: 16 }}>
      {children}
    </div>
  );

  return (
    <div>
      {/* 주소 배너 */}
      <div style={{ background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)', padding: '28px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.2)', color: 'white', padding: '3px 10px', borderRadius: 20 }}>{selectedLand.type}</span>
            <span style={{ fontSize: 12, color: '#bbf7d0' }}>농지</span>
          </div>
          <h2 style={{ color: 'white', fontWeight: 700, fontSize: 22, marginBottom: 6 }}>{selectedLand.address}</h2>
          <p style={{ color: '#bbf7d0', fontSize: 14 }}>{formatArea(selectedLand.area)}</p>
        </div>
      </div>

      {/* 탭 바 */}
      <div className="pc-tabs">
        <div className="pc-tabs-inner">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '14px 20px', fontSize: 14, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === tab.id ? '2px solid #16a34a' : '2px solid transparent', color: activeTab === tab.id ? '#16a34a' : '#6b7280' }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pc-container" style={{ paddingTop: 24 }}>
        {/* 기본정보 */}
        {activeTab === 'info' && (
          <div className="pc-grid-2">
            <div>
              {card(
                <>
                  <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>토지 기본 정보</span>
                  </div>
                  <div>
                    {[
                      { label: '소재지', value: selectedLand.address },
                      { label: '지목', value: `${selectedLand.type} (농지)` },
                      { label: '면적', value: formatArea(selectedLand.area) },
                      { label: '용도지역', value: '농림지역' },
                      { label: '개발제한구역', value: '해당 없음' },
                      { label: '농업진흥구역', value: '농업진흥지역 내' },
                    ].map((row, i) => (
                      <div key={row.label} style={{ display: 'flex', padding: '12px 20px', gap: 16, borderBottom: i < 5 ? '1px solid #f9fafb' : 'none' }}>
                        <span style={{ fontSize: 14, color: '#6b7280', width: 100, flexShrink: 0 }}>{row.label}</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {card(
                <>
                  <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>농지 판별 결과</span>
                  </div>
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { label: '농지 여부', value: '✅ 농지 (「농지법」상 농지)', color: '#16a34a' },
                      { label: '자경 의무', value: '⚠️ 자경 또는 임대 필요', color: '#ea580c' },
                      { label: '농취증 필요', value: '✅ 취득 시 필요', color: '#2563eb' },
                      { label: '신탁 가능', value: '✅ 농지신탁 가능', color: '#16a34a' },
                    ].map((item) => (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 14, color: '#4b5563' }}>{item.label}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: item.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 오른쪽 사이드바 */}
            <div>
              <div style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', borderRadius: 14, padding: 24, color: 'white', marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: '#bbf7d0', marginBottom: 4 }}>개별 공시지가 기준</p>
                <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 2 }}>{selectedLand.officialPrice.toLocaleString()}</p>
                <p style={{ fontSize: 13, color: '#bbf7d0', marginBottom: 16 }}>원/㎡</p>
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: '#dcfce7', marginBottom: 4 }}>공시가 합산 추정액</p>
                  <p style={{ fontSize: 20, fontWeight: 700 }}>{formatPrice(selectedLand.officialPrice * selectedLand.area)}</p>
                </div>
                <button onClick={() => onNavigate('consult')} style={{ width: '100%', background: 'white', color: '#15803d', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  🏛️ 농지신탁 무료 상담
                </button>
              </div>

              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 20 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 12 }}>리스크 현황</p>
                <RiskBar score={selectedLand.riskScore} />
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { label: '자경 이력', status: selectedLand.riskScore < 50 ? '있음' : '없음', ok: selectedLand.riskScore < 50 },
                    { label: '농업경영계획서', status: '제출 필요', ok: false },
                    { label: '처분 의무 통보', status: '해당 없음', ok: true },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: '#6b7280' }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: item.ok ? '#16a34a' : '#ef4444' }}>{item.ok ? '✅' : '⚠️'} {item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 가격정보 */}
        {activeTab === 'price' && (
          <div className="pc-grid-2">
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 24, textAlign: 'center' }}>
                  <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>개별 공시지가</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: '#111827' }}>{selectedLand.officialPrice.toLocaleString()}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>원/㎡</p>
                  <p style={{ fontSize: 14, color: '#374151', fontWeight: 600 }}>총 {formatPrice(selectedLand.officialPrice * selectedLand.area)}</p>
                </div>
                <div style={{ background: 'white', borderRadius: 14, border: '2px solid #bbf7d0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: 24, textAlign: 'center' }}>
                  <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 8 }}>인근 실거래가</p>
                  <p style={{ fontSize: 28, fontWeight: 700, color: '#15803d' }}>{selectedLand.dealPrice.toLocaleString()}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>원/㎡</p>
                  <p style={{ fontSize: 14, color: '#16a34a', fontWeight: 600 }}>공시가 대비 {ratio}%</p>
                </div>
              </div>

              {card(
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>공시가 대비 실거래 비율</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: Number(ratio) > 150 ? '#ef4444' : '#16a34a' }}>{ratio}%</span>
                  </div>
                  <div style={{ background: '#f3f4f6', borderRadius: 99, height: 10, marginBottom: 8 }}>
                    <div style={{ height: 10, borderRadius: 99, background: '#16a34a', width: `${Math.min(Number(ratio), 200) / 2}%` }} />
                  </div>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>
                    공시가의 {ratio}% 수준 — {Number(ratio) > 150 ? '고평가 구간' : Number(ratio) > 100 ? '적정 수준' : '저평가 가능성'}
                  </p>
                </div>
              )}

              {card(
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>최근 실거래 내역</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>인근 500m 이내 · 최근 3건</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {RECENT_DEALS.map((deal, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid #f9fafb' : 'none' }}>
                        <div>
                          <span style={{ fontSize: 11, background: '#fef9c3', color: '#854d0e', padding: '2px 6px', borderRadius: 4, marginRight: 6 }}>{deal.type}</span>
                          <span style={{ fontSize: 12, color: '#6b7280' }}>{deal.date} · {deal.area.toLocaleString()}㎡</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>{deal.price.toLocaleString()}원/㎡</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {card(
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151' }}>가격 추이 (최근 4년)</p>
                  <PriceChart data={priceHistory} />
                </div>
              )}
            </div>

            <div>
              <div style={{ background: 'white', borderRadius: 14, border: '1px solid #f3f4f6', padding: 24 }}>
                <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>가격 요약</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: '공시지가/㎡', value: `${selectedLand.officialPrice.toLocaleString()}원` },
                    { label: '실거래가/㎡', value: `${selectedLand.dealPrice.toLocaleString()}원`, highlight: true },
                    { label: '면적', value: formatArea(selectedLand.area) },
                    { label: '공시 총액', value: formatPrice(selectedLand.officialPrice * selectedLand.area) },
                    { label: '실거래 총액', value: formatPrice(selectedLand.dealPrice * selectedLand.area), highlight: true },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9fafb' }}>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{item.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: item.highlight ? '#15803d' : '#111827' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('consult')} style={{ width: '100%', background: '#16a34a', color: 'white', marginTop: 20, padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  가격 상담 문의
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 분석 */}
        {activeTab === 'analysis' && (
          <div className="pc-grid-2">
            <div>
              {card(
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 20 }}>농지 리스크 스코어</p>
                  <RiskBar score={selectedLand.riskScore} />
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      { label: '자경 이력', status: selectedLand.riskScore >= 50 ? '없음' : '있음', ok: selectedLand.riskScore < 50 },
                      { label: '농업경영계획서', status: '제출 필요', ok: false },
                      { label: '임대차 계약', status: '미체결', ok: false },
                      { label: '처분 의무 통보', status: '해당 없음', ok: true },
                    ].map((item) => (
                      <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: '#6b7280' }}>{item.label}</span>
                        <span style={{ fontWeight: 600, color: item.ok ? '#16a34a' : '#ef4444' }}>{item.ok ? '✅' : '⚠️'} {item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {card(
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 4 }}>축사 검색 결과</p>
                  <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>키워드: 축사·돈사·계사·우사·양계장·양돈장·한우</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {nearbyLivestock.map((item) => (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 10, border: '1px solid #f3f4f6', background: '#f9fafb' }}>
                        <span style={{ fontSize: 28 }}>{LIVESTOCK_ICONS[item.type] || '🏠'}</span>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{item.name}</p>
                          <p style={{ fontSize: 12, color: '#6b7280' }}>{item.type} · {item.distance}m</p>
                        </div>
                        <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, fontWeight: 600, background: item.distance <= 300 ? '#fee2e2' : item.distance <= 500 ? '#ffedd5' : '#fef9c3', color: item.distance <= 300 ? '#b91c1c' : item.distance <= 500 ? '#c2410c' : '#854d0e' }}>
                          {item.distance <= 300 ? '위험' : item.distance <= 500 ? '주의' : '참고'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, padding: 12, background: '#fef2f2', borderRadius: 10, border: '1px solid #fecaca' }}>
                    <p style={{ fontSize: 13, color: '#b91c1c', fontWeight: 500 }}>⚠️ 300m 이내 돈사(양돈장)가 있습니다. 악취·민원 가능성을 확인하세요.</p>
                  </div>
                </div>
              )}

              {card(
                <div style={{ padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#374151', marginBottom: 14 }}>주변 환경 분석</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    {ENV_ITEMS.map((env) => (
                      <div key={env.label} style={{ padding: 14, borderRadius: 10, border: '1px solid', textAlign: 'center', background: env.ok ? '#f0fdf4' : '#fff7ed', borderColor: env.ok ? '#bbf7d0' : '#fed7aa' }}>
                        <span style={{ fontSize: 20 }}>{env.ok ? '✅' : '⚠️'}</span>
                        <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginTop: 4 }}>{env.label}</p>
                        <p style={{ fontSize: 12, color: env.ok ? '#16a34a' : '#ea580c' }}>{env.count > 0 ? `${env.count}건` : '없음'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', borderRadius: 14, padding: 24, color: 'white' }}>
                <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏛️ 농지신탁 안내</p>
                <p style={{ fontSize: 14, color: '#bbf7d0', lineHeight: 1.6, marginBottom: 20 }}>
                  이 토지는 농지신탁 적용 가능합니다. 자경 의무 없이 합법적으로 보유하세요.
                </p>
                <button onClick={() => onNavigate('consult')} style={{ width: '100%', background: 'white', color: '#15803d', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>
                  무료 상담 신청하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
