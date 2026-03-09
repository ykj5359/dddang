import { useState } from 'react';
import { recentLands, priceHistory, nearbyLivestock } from '../data/dummyData';
import { formatPrice, formatArea } from '../utils/format';

const LIVESTOCK_ICONS = { 돈사: '🐷', 계사: '🐔', 우사: '🐄' };

function RiskMeter({ score }) {
  const level =
    score >= 60 ? { color: '#ef4444', bg: 'bg-red-100', text: 'text-red-700', label: '높음', desc: '자경 의무 위반 위험이 높습니다' } :
    score >= 30 ? { color: '#f59e0b', bg: 'bg-amber-100', text: 'text-amber-700', label: '보통', desc: '주의가 필요합니다' } :
                  { color: '#10b981', bg: 'bg-emerald-100', text: 'text-emerald-700', label: '낮음', desc: '양호한 상태입니다' };
  return (
    <div className={`${level.bg} rounded-2xl p-4`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">리스크 스코어</p>
          <p className={`text-3xl font-black mt-0.5 ${level.text}`}>{score}<span className="text-base font-semibold">점</span></p>
        </div>
        <div className={`px-4 py-1.5 rounded-full ${level.bg} border-2`} style={{ borderColor: level.color }}>
          <span className={`text-sm font-bold ${level.text}`}>{level.label}</span>
        </div>
      </div>
      <div className="w-full bg-white/60 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full transition-all"
          style={{ width: `${score}%`, backgroundColor: level.color }}
        />
      </div>
      <p className={`text-xs mt-2 font-medium ${level.text}`}>{level.desc}</p>
    </div>
  );
}

function PriceChart({ data }) {
  const maxPrice = Math.max(...data.map((d) => d.avgPrice));
  return (
    <div className="mt-4">
      <div className="flex items-end gap-2 h-28">
        {data.map((item, i) => {
          const isLatest = i === data.length - 1;
          const heightPct = (item.avgPrice / maxPrice) * 100;
          return (
            <div key={item.year} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-slate-500 font-semibold">{item.avgPrice.toLocaleString()}</span>
              <div
                className={`w-full rounded-t-lg transition-all ${isLatest ? 'bg-primary-500' : 'bg-primary-200'}`}
                style={{ height: `${heightPct}%`, minHeight: 4 }}
              />
              <span className="text-xs text-slate-400">{item.year}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 mt-3 text-center">단위: 원/㎡ | 인근 읍면동 평균 실거래가</p>
    </div>
  );
}

const TABS = [
  { id: 'info',     label: '기본정보' },
  { id: 'price',    label: '가격정보' },
  { id: 'analysis', label: '분석' },
];

const RECENT_DEALS = [
  { date: '2026-02', price: 92000, area: 2640, type: '전' },
  { date: '2025-11', price: 88000, area: 1980, type: '전' },
  { date: '2025-08', price: 85000, area: 3300, type: '답' },
];

const ENV_ITEMS = [
  { label: '공장',    count: 0, ok: true },
  { label: '묘지',    count: 1, ok: false },
  { label: '송전탑',  count: 0, ok: true },
  { label: '군사시설', count: 0, ok: true },
  { label: '도로 접면', count: 1, ok: true },
  { label: '수원 접근', count: 1, ok: true },
];

export default function LandDetailPage({ land, onNavigate, onAddMyLand, onToggleSaved, isInMyLands, isSaved }) {
  const [activeTab, setActiveTab] = useState('info');
  const selectedLand = land || recentLands[0];

  if (!selectedLand) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 text-center px-6 py-20">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-5">
          <span className="text-4xl">🔍</span>
        </div>
        <p className="font-bold text-slate-700 mb-2 text-lg">조회할 토지를 선택하세요</p>
        <p className="text-sm text-slate-400 mb-6">홈 또는 지도에서 토지를 선택하거나 검색하세요</p>
        <button onClick={() => onNavigate('home')} className="btn-primary">
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const ratio = ((selectedLand.dealPrice / selectedLand.officialPrice) * 100).toFixed(0);

  return (
    <div>
      {/* ── Address hero ── */}
      <div
        className="px-4 py-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #115e59 100%)' }}
      >
        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <span className="badge bg-primary-500/30 text-primary-200 border border-primary-400/30">{selectedLand.type}</span>
          <span className="text-xs text-primary-300">농지</span>
        </div>
        <h2 className="text-white font-bold text-base leading-snug">{selectedLand.address}</h2>
        <p className="text-primary-300 text-sm mt-1">{formatArea(selectedLand.area)}</p>

        {onAddMyLand && onToggleSaved && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onAddMyLand(selectedLand)}
              disabled={isInMyLands}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                isInMyLands
                  ? 'bg-white/10 text-white/40 cursor-default'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 4v16m8-8H4" />
              </svg>
              {isInMyLands ? '내 토지 등록됨' : '내 토지 등록'}
            </button>
            <button
              onClick={() => onToggleSaved(selectedLand)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                isSaved
                  ? 'bg-amber-400/30 text-amber-200 hover:bg-amber-400/20'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {isSaved ? '관심 필지 해제' : '관심 필지 저장'}
            </button>
          </div>
        )}
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white sticky top-[60px] z-30 border-b border-slate-200 px-4 py-2.5">
        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? 'tab-item-active' : 'tab-item'}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* ── 기본정보 ── */}
        {activeTab === 'info' && (
          <>
            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-3">토지 기본 정보</p>
              <div className="divide-y divide-slate-50">
                {[
                  { label: '소재지',      value: selectedLand.address },
                  { label: '지목',        value: `${selectedLand.type} (농지)` },
                  { label: '면적',        value: formatArea(selectedLand.area) },
                  { label: '용도지역',    value: '농림지역' },
                  { label: '개발제한구역', value: '해당 없음' },
                  { label: '농업진흥구역', value: '농업진흥지역 내' },
                ].map((row) => (
                  <div key={row.label} className="flex py-3 gap-4">
                    <span className="text-xs text-slate-400 font-semibold w-24 shrink-0 uppercase tracking-wide pt-0.5">{row.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-3">농지 판별 결과</p>
              <div className="space-y-2.5">
                {[
                  { label: '농지 여부',  value: '농지 (농지법상 농지)',     icon: '✅', ok: true },
                  { label: '자경 의무',  value: '자경 또는 임대 필요',      icon: '⚠️', ok: false },
                  { label: '농취증 필요', value: '취득 시 필요',            icon: '✅', ok: true },
                  { label: '신탁 가능',  value: '농지신탁 가능',            icon: '✅', ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className={`text-xs font-semibold flex items-center gap-1 ${item.ok ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {item.icon} {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('consult')}
              className="w-full py-4 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-md"
              style={{ background: 'linear-gradient(135deg, #7c4d18 0%, #9e631a 100%)' }}
            >
              <span>🏛️</span> 농지신탁 무료 상담 신청
            </button>
          </>
        )}

        {/* ── 가격정보 ── */}
        {activeTab === 'price' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="card text-center">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-1">개별 공시지가</p>
                <p className="text-2xl font-black text-slate-800">{selectedLand.officialPrice.toLocaleString()}</p>
                <p className="text-xs text-slate-400 mb-1">원/㎡</p>
                <p className="text-sm font-semibold text-slate-600">
                  총 {formatPrice(selectedLand.officialPrice * selectedLand.area)}
                </p>
              </div>
              <div className="card text-center border-primary-200 bg-primary-50">
                <p className="text-xs text-primary-500 font-semibold uppercase tracking-wide mb-1">인근 실거래가</p>
                <p className="text-2xl font-black text-primary-700">{selectedLand.dealPrice?.toLocaleString() ?? '-'}</p>
                <p className="text-xs text-primary-400 mb-1">원/㎡</p>
                <p className="text-sm font-semibold text-primary-600">공시가 대비 {ratio}%</p>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-slate-700">공시가 대비 실거래 비율</span>
                <span className={`text-sm font-bold ${Number(ratio) > 150 ? 'text-red-500' : 'text-primary-600'}`}>
                  {ratio}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                  style={{ width: `${Math.min(Number(ratio), 200) / 2}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                공시가의 {ratio}% —{' '}
                {Number(ratio) > 150 ? '고평가 구간' : Number(ratio) > 100 ? '적정 수준' : '저평가 가능성'}
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-0.5">최근 실거래 내역</p>
              <p className="text-xs text-slate-400 mb-4">인근 500m 이내 · 최근 3건</p>
              <div className="space-y-1.5">
                {RECENT_DEALS.map((deal, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="badge bg-amber-100 text-amber-700">{deal.type}</span>
                      <span className="text-xs text-slate-500">{deal.date} · {deal.area.toLocaleString()}㎡</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{deal.price.toLocaleString()}원/㎡</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-700">가격 추이 (최근 4년)</p>
              <PriceChart data={priceHistory} />
            </div>
          </>
        )}

        {/* ── 분석 ── */}
        {activeTab === 'analysis' && (
          <>
            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-3">농지 리스크 스코어</p>
              <RiskMeter score={selectedLand.riskScore} />
              <div className="mt-4 space-y-2.5">
                {[
                  { label: '자경 이력',      status: selectedLand.riskScore >= 50 ? '없음' : '있음', ok: selectedLand.riskScore < 50 },
                  { label: '농업경영계획서',  status: '제출 필요',  ok: false },
                  { label: '임대차 계약',    status: '미체결',     ok: false },
                  { label: '처분 의무 통보',  status: '해당 없음',  ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className={`text-xs font-semibold ${item.ok ? 'text-emerald-600' : 'text-red-500'}`}>
                      {item.ok ? '✅' : '⚠️'} {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-0.5">축사 검색 결과</p>
              <p className="text-xs text-slate-400 mb-4">키워드: 축사·돈사·계사·우사·양계장·양돈장·한우</p>
              <div className="space-y-2.5">
                {nearbyLivestock.map((item) => {
                  const danger = item.distance <= 300;
                  const caution = item.distance <= 500;
                  return (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                      <span className="text-2xl">{LIVESTOCK_ICONS[item.type] || '🏠'}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.type} · {item.distance}m</p>
                      </div>
                      <span className={`badge ${
                        danger ? 'bg-red-100 text-red-700' :
                        caution ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {danger ? '위험' : caution ? '주의' : '참고'}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs text-red-700 font-semibold">⚠️ 300m 이내 돈사(양돈장)가 있습니다. 악취·민원 가능성을 확인하세요.</p>
              </div>
            </div>

            <div className="card">
              <p className="text-sm font-bold text-slate-700 mb-3">주변 환경 분석</p>
              <div className="grid grid-cols-3 gap-2">
                {ENV_ITEMS.map((env) => (
                  <div key={env.label} className={`p-3 rounded-xl text-center border ${env.ok ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                    <span className="text-lg">{env.ok ? '✅' : '⚠️'}</span>
                    <p className="text-xs font-semibold text-slate-700 mt-1">{env.label}</p>
                    <p className={`text-xs mt-0.5 ${env.ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {env.count > 0 ? `${env.count}건` : '없음'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0f766e 100%)' }}
            >
              <p className="font-bold mb-1">🏛️ 농지신탁 안내</p>
              <p className="text-sm text-primary-200 mb-4">
                이 토지는 농지신탁 적용 가능합니다. 자경 의무 없이 합법적으로 보유하세요.
              </p>
              <button
                onClick={() => onNavigate('consult')}
                className="w-full bg-white text-primary-800 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-50 transition-colors"
              >
                무료 상담 신청하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
