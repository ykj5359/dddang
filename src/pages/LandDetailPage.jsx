import { useState } from 'react';
import { recentLands, priceHistory, nearbyLivestock } from '../data/dummyData';

function formatPrice(price) {
  if (price >= 100000000) {
    const eok = Math.floor(price / 100000000);
    const man = Math.floor((price % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  return `${Math.floor(price / 10000).toLocaleString()}만원`;
}

function RiskBar({ score }) {
  const color = score >= 60 ? 'bg-red-500' : score >= 30 ? 'bg-orange-400' : 'bg-green-500';
  const label = score >= 60 ? '높음' : score >= 30 ? '보통' : '낮음';
  const textColor = score >= 60 ? 'text-red-600' : score >= 30 ? 'text-orange-600' : 'text-green-600';
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-600">자경 의무 위반 위험도</span>
        <span className={`text-sm font-bold ${textColor}`}>{score}점 ({label})</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full transition-all ${color}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function PriceChart({ data }) {
  const maxPrice = Math.max(...data.map((d) => d.avgPrice));
  return (
    <div className="mt-3">
      <div className="flex items-end gap-2 h-24">
        {data.map((item, i) => {
          const height = (item.avgPrice / maxPrice) * 100;
          const isLatest = i === data.length - 1;
          return (
            <div key={item.year} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">{item.avgPrice.toLocaleString()}</span>
              <div
                className={`w-full rounded-t-md transition-all ${isLatest ? 'bg-primary-500' : 'bg-primary-200'}`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">{item.year}</span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">단위: 원/㎡ | 기준: 해당 읍면동 평균 실거래가</p>
    </div>
  );
}

const livestockIcons = { '돈사': '🐷', '계사': '🐔', '우사': '🐄' };

export default function LandDetailPage({ land, onNavigate }) {
  const [activeTab, setActiveTab] = useState('info');
  const selectedLand = land || recentLands[0];
  const ratio = selectedLand ? ((selectedLand.dealPrice / selectedLand.officialPrice) * 100).toFixed(0) : 0;

  const tabs = [
    { id: 'info', label: '기본정보' },
    { id: 'price', label: '가격정보' },
    { id: 'analysis', label: '분석' },
  ];

  if (!selectedLand) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6 py-20">
        <span className="text-5xl mb-4 block">🔍</span>
        <p className="font-bold text-gray-700 mb-2">조회할 토지를 선택하세요</p>
        <p className="text-sm text-gray-500 mb-6">홈 또는 지도에서 토지를 선택하거나 검색하세요</p>
        <button
          onClick={() => onNavigate('home')}
          className="bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Address Header */}
      <div className="bg-primary-700 px-4 py-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
            {selectedLand.type}
          </span>
          <span className="text-xs text-primary-200">농지</span>
        </div>
        <h2 className="text-white font-bold text-base leading-snug">{selectedLand.address}</h2>
        <p className="text-primary-200 text-sm mt-1">
          {selectedLand.area.toLocaleString()}㎡ (약 {Math.round(selectedLand.area / 3.3058)}평)
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white sticky top-14 z-30 border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* 기본정보 */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">토지 기본 정보</span>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { label: '소재지', value: selectedLand.address },
                  { label: '지목', value: `${selectedLand.type} (농지)` },
                  { label: '면적', value: `${selectedLand.area.toLocaleString()}㎡ (약 ${Math.round(selectedLand.area / 3.3058)}평)` },
                  { label: '용도지역', value: '농림지역' },
                  { label: '개발제한구역', value: '해당 없음' },
                  { label: '농업진흥구역', value: '농업진흥지역 내' },
                ].map((row) => (
                  <div key={row.label} className="flex px-4 py-3 gap-4">
                    <span className="text-sm text-gray-500 w-24 shrink-0">{row.label}</span>
                    <span className="text-sm font-medium text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                <span className="text-sm font-bold text-gray-700">농지 판별 결과</span>
              </div>
              <div className="px-4 py-4 space-y-3">
                {[
                  { label: '농지 여부', value: '✅ 농지 (「농지법」상 농지)', color: 'text-green-600' },
                  { label: '자경 의무', value: '⚠️ 자경 또는 임대 필요', color: 'text-orange-600' },
                  { label: '농취증 필요', value: '✅ 취득 시 필요', color: 'text-blue-600' },
                  { label: '신탁 가능', value: '✅ 농지신탁 가능', color: 'text-green-600' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('consult')}
              className="w-full bg-earth-600 text-white py-4 rounded-xl font-semibold text-sm hover:bg-earth-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>🏛️</span>
              농지신탁 무료 상담 신청
            </button>
          </div>
        )}

        {/* 가격정보 */}
        {activeTab === 'price' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">개별 공시지가</p>
                <p className="text-xl font-bold text-gray-900">{selectedLand.officialPrice.toLocaleString()}</p>
                <p className="text-xs text-gray-400">원/㎡</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">
                  총 {formatPrice(selectedLand.officialPrice * selectedLand.area)}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-primary-200 shadow-sm p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">인근 실거래가</p>
                <p className="text-xl font-bold text-primary-700">{selectedLand.dealPrice.toLocaleString()}</p>
                <p className="text-xs text-gray-400">원/㎡</p>
                <p className="text-sm text-primary-600 mt-1 font-medium">
                  공시가 대비 {ratio}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-gray-700">공시가 대비 실거래 비율</span>
                <span className={`text-sm font-bold ${Number(ratio) > 150 ? 'text-red-500' : 'text-primary-600'}`}>
                  {ratio}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
                <div
                  className="h-2.5 rounded-full bg-primary-500 transition-all"
                  style={{ width: `${Math.min(Number(ratio), 200) / 2}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                공시가의 {ratio}% 수준 — {Number(ratio) > 150 ? '고평가 구간' : Number(ratio) > 100 ? '적정 수준' : '저평가 가능성'}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-700 mb-1">최근 실거래 내역</p>
              <p className="text-xs text-gray-400 mb-3">인근 500m 이내 · 최근 3건</p>
              <div className="space-y-2">
                {[
                  { date: '2026-02', price: 92000, area: 2640, type: '전' },
                  { date: '2025-11', price: 88000, area: 1980, type: '전' },
                  { date: '2025-08', price: 85000, area: 3300, type: '답' },
                ].map((deal, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded mr-1">{deal.type}</span>
                      <span className="text-xs text-gray-500">{deal.date} · {deal.area.toLocaleString()}㎡</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{deal.price.toLocaleString()}원/㎡</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-700">가격 추이 (최근 4년)</p>
              <PriceChart data={priceHistory} />
            </div>
          </div>
        )}

        {/* 분석 */}
        {activeTab === 'analysis' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-700 mb-4">농지 리스크 스코어</p>
              <RiskBar score={selectedLand.riskScore} />
              <div className="mt-4 space-y-2">
                {[
                  { label: '자경 이력', status: selectedLand.riskScore >= 50 ? '없음' : '있음', ok: selectedLand.riskScore < 50 },
                  { label: '농업경영계획서', status: '제출 필요', ok: false },
                  { label: '임대차 계약', status: '미체결', ok: false },
                  { label: '처분 의무 통보', status: '해당 없음', ok: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{item.label}</span>
                    <span className={`text-xs font-medium ${item.ok ? 'text-green-600' : 'text-red-500'}`}>
                      {item.ok ? '✅' : '⚠️'} {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-700 mb-1">축사 검색 결과</p>
              <p className="text-xs text-gray-400 mb-4">키워드: 축사·돈사·계사·우사·양계장·양돈장·한우</p>
              <div className="space-y-3">
                {nearbyLivestock.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                    <span className="text-2xl">{livestockIcons[item.type] || '🏠'}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type} · {item.distance}m</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.distance <= 300 ? 'bg-red-100 text-red-700' :
                      item.distance <= 500 ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.distance <= 300 ? '위험' : item.distance <= 500 ? '주의' : '참고'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                <p className="text-xs text-red-700 font-medium">
                  ⚠️ 300m 이내 돈사(양돈장)가 있습니다. 악취·민원 가능성을 확인하세요.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <p className="text-sm font-bold text-gray-700 mb-3">주변 환경 분석</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '공장', count: 0, ok: true },
                  { label: '묘지', count: 1, ok: false },
                  { label: '송전탑', count: 0, ok: true },
                  { label: '군사시설', count: 0, ok: true },
                  { label: '도로 접면', count: 1, ok: true },
                  { label: '수원 접근', count: 1, ok: true },
                ].map((env) => (
                  <div key={env.label} className={`p-3 rounded-xl border text-center ${
                    env.ok ? 'border-green-100 bg-green-50' : 'border-orange-100 bg-orange-50'
                  }`}>
                    <span className="text-lg">{env.ok ? '✅' : '⚠️'}</span>
                    <p className="text-xs font-medium text-gray-700 mt-1">{env.label}</p>
                    <p className={`text-xs ${env.ok ? 'text-green-600' : 'text-orange-600'}`}>
                      {env.count > 0 ? `${env.count}건` : '없음'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-4 text-white">
              <p className="font-bold mb-1">🏛️ 농지신탁 안내</p>
              <p className="text-sm text-primary-100 mb-3">
                이 토지는 농지신탁 적용 가능합니다. 자경 의무 없이 합법적으로 보유하세요.
              </p>
              <button
                onClick={() => onNavigate('consult')}
                className="w-full bg-white text-primary-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                무료 상담 신청하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
