import { useState } from 'react';
import { myLands, savedLands } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

export default function MyLandPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('my');

  const totalValue = myLands.reduce((acc, l) => acc + l.totalValue, 0);
  const totalArea  = myLands.reduce((acc, l) => acc + l.area, 0);
  const totalPyeong = Math.round(totalArea / 3.3058);

  return (
    <div>
      {/* ── Portfolio header ── */}
      <div
        className="px-4 py-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #115e59 100%)' }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />
        <p className="text-primary-300 text-xs font-semibold uppercase tracking-widest mb-3">보유 농지 현황</p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: '필지 수',   value: myLands.length, unit: '필지' },
            { label: '총 면적',   value: totalPyeong.toLocaleString(), unit: '평' },
            { label: '필지 수',   value: myLands.length, unit: '필지' },
          ].filter((_, i) => i < 2).map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-2xl px-3 py-3">
              <p className="text-xs text-primary-300 mb-1">{stat.label}</p>
              <p className="text-xl font-black text-white">
                {stat.value}
                <span className="text-sm font-semibold text-primary-300 ml-1">{stat.unit}</span>
              </p>
            </div>
          ))}
          <div className="bg-white/10 rounded-2xl px-3 py-3">
            <p className="text-xs text-primary-300 mb-1">관심 필지</p>
            <p className="text-xl font-black text-white">
              {savedLands.length}
              <span className="text-sm font-semibold text-primary-300 ml-1">개</span>
            </p>
          </div>
        </div>

        <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-xs text-primary-300 mb-1">공시지가 합산 추정액</p>
          <p className="text-2xl font-black text-white">{formatPrice(totalValue)}</p>
          <p className="text-xs text-primary-400 mt-1">※ 개별 공시지가 기준 · 실거래가와 다를 수 있음</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white sticky top-[60px] z-30 border-b border-slate-200 px-4 py-2.5">
        <div className="tab-bar">
          {[
            { id: 'my',    label: `내 토지 (${myLands.length})` },
            { id: 'saved', label: `관심 필지 (${savedLands.length})` },
          ].map((tab) => (
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

      <div className="px-4 py-4 space-y-3">
        {activeTab === 'my' && (
          <>
            {myLands.map((land) => (
              <button
                key={land.id}
                onClick={() => onNavigate('detail', land)}
                className="w-full card-hover text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <span className={`badge mb-2 ${LAND_TYPE_COLORS[land.type] || 'bg-slate-100 text-slate-600'}`}>
                      {land.type}
                    </span>
                    <p className="text-sm font-bold text-slate-800 leading-tight truncate">{land.address}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatArea(land.area)}</p>
                  </div>
                  <div className="text-right ml-4 flex-shrink-0">
                    <p className="text-sm font-black text-primary-700">{formatPrice(land.totalValue)}</p>
                    <p className="text-xs text-slate-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100 font-semibold">공시지가 조회</span>
                  <span className="text-xs bg-sky-50 text-sky-700 px-2.5 py-1 rounded-lg border border-sky-100 font-semibold">실거래가 조회</span>
                  <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg border border-amber-100 font-semibold">리스크 분석</span>
                </div>
              </button>
            ))}

            <button
              onClick={() => onNavigate('home')}
              className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-6 text-sm text-slate-400 hover:border-primary-300 hover:text-primary-500 transition-all font-semibold"
            >
              + 토지 추가하기
            </button>
          </>
        )}

        {activeTab === 'saved' && (
          <>
            {savedLands.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔖</span>
                </div>
                <p className="text-sm font-semibold">관심 필지가 없습니다</p>
                <p className="text-xs mt-1">토지 상세 페이지에서 북마크하세요</p>
              </div>
            ) : (
              savedLands.map((land) => (
                <button
                  key={land.id}
                  onClick={() => onNavigate('detail', land)}
                  className="w-full card-hover text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`badge ${LAND_TYPE_COLORS[land.type] || 'bg-slate-100 text-slate-600'}`}>
                          {land.type}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">관심 등록</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 truncate">{land.address}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{formatArea(land.area)}</p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <p className="text-sm font-black text-slate-700">{formatPrice(land.totalValue)}</p>
                      <p className="text-xs text-slate-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <div className="px-4 pb-4">
        <div
          className="rounded-2xl p-5 text-white"
          style={{ background: 'linear-gradient(135deg, #7c4d18 0%, #9e631a 100%)' }}
        >
          <p className="font-bold text-base mb-1">보유 농지 종합 분석 리포트</p>
          <p className="text-xs text-amber-200 mb-4">공시지가 합산, 리스크 스코어, 신탁 가능 여부를 한눈에</p>
          <button
            onClick={() => onNavigate('consult')}
            className="w-full bg-white text-earth-700 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-50 transition-colors"
          >
            무료 상담 신청
          </button>
        </div>
      </div>
    </div>
  );
}
