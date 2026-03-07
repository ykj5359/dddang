import { useState } from 'react';
import { myLands, savedLands } from '../data/dummyData';
import { formatPrice, formatArea, LAND_TYPE_COLORS } from '../utils/format';

export default function MyLandPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('my');

  const totalValue = myLands.reduce((acc, l) => acc + l.totalValue, 0);
  const totalPyeong = Math.round(myLands.reduce((acc, l) => acc + l.area, 0) / 3.3058);

  return (
    <div className="pb-4">
      {/* 보유 현황 요약 */}
      <div className="bg-gradient-to-br from-primary-700 to-primary-900 px-4 py-6">
        <p className="text-primary-200 text-sm mb-1">보유 농지 현황</p>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-bold text-white">{myLands.length}</span>
          <span className="text-primary-200 mb-1">필지</span>
          <span className="text-primary-300 mb-1 mx-1">·</span>
          <span className="text-3xl font-bold text-white">{totalPyeong.toLocaleString()}</span>
          <span className="text-primary-200 mb-1">평</span>
        </div>
        <div className="bg-primary-800/50 rounded-xl p-3">
          <p className="text-xs text-primary-300 mb-0.5">공시지가 합산 추정액</p>
          <p className="text-xl font-bold text-white">{formatPrice(totalValue)}</p>
          <p className="text-xs text-primary-300 mt-0.5">※ 개별 공시지가 기준 · 실거래가와 다를 수 있음</p>
        </div>
      </div>

      {/* 탭 */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="flex">
          {[
            { id: 'my', label: `내 토지 (${myLands.length})` },
            { id: 'saved', label: `관심 필지 (${savedLands.length})` },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {activeTab === 'my' && (
          <>
            {myLands.map((land) => (
              <button key={land.id} onClick={() => onNavigate('detail', land)}
                className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:border-primary-200 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[land.type] || 'bg-gray-100 text-gray-700'}`}>
                      {land.type}
                    </span>
                    <p className="text-sm font-medium text-gray-900 leading-tight mt-1">{land.address}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatArea(land.area)}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-primary-700">{formatPrice(land.totalValue)}</p>
                    <p className="text-xs text-gray-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-100">공시지가 조회</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-100">실거래가 조회</span>
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-lg border border-orange-100">리스크 분석</span>
                </div>
              </button>
            ))}
            <button onClick={() => onNavigate('home')}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl py-5 text-sm text-gray-400 hover:border-primary-300 hover:text-primary-500 transition-colors font-medium">
              + 토지 추가하기
            </button>
          </>
        )}

        {activeTab === 'saved' && (
          <>
            {savedLands.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <span className="text-4xl block mb-3">🔖</span>
                <p className="text-sm">관심 필지가 없습니다</p>
                <p className="text-xs mt-1">토지 상세 페이지에서 북마크하세요</p>
              </div>
            ) : (
              savedLands.map((land) => (
                <button key={land.id} onClick={() => onNavigate('detail', land)}
                  className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[land.type] || 'bg-gray-100 text-gray-700'}`}>
                          {land.type}
                        </span>
                        <span className="text-xs text-gray-400">관심 등록</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{land.address}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatArea(land.area)}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-sm font-bold text-gray-700">{formatPrice(land.totalValue)}</p>
                      <p className="text-xs text-gray-400">공시 {land.officialPrice.toLocaleString()}원/㎡</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </>
        )}
      </div>

      {/* CTA */}
      <div className="px-4 mt-5">
        <div className="bg-earth-50 border border-earth-200 rounded-xl p-4">
          <p className="font-bold text-earth-800 text-sm mb-1">보유 농지 종합 분석 리포트</p>
          <p className="text-xs text-earth-600 mb-3">공시지가 합산, 리스크 스코어, 신탁 가능 여부를 한눈에</p>
          <button onClick={() => onNavigate('consult')}
            className="w-full bg-earth-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-earth-700 transition-colors">
            무료 상담 신청
          </button>
        </div>
      </div>
    </div>
  );
}
