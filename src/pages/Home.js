import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MapView from '../components/MapView';
import SearchBar from '../components/SearchBar';

const TYPE_STYLE = {
  대지: { badge: 'bg-blue-50 text-blue-700 border-blue-200', bar: 'bg-blue-500' },
  임야: { badge: 'bg-green-50 text-green-700 border-green-200', bar: 'bg-green-600' },
  농지: { badge: 'bg-amber-50 text-amber-700 border-amber-200', bar: 'bg-amber-500' },
  공장: { badge: 'bg-slate-100 text-slate-600 border-slate-200', bar: 'bg-slate-400' },
};

function fmtPrice(p) {
  const n = parseInt(String(p).replace(/,/g, ''), 10);
  if (n >= 100000000) {
    const eok = Math.floor(n / 100000000);
    const man = Math.floor((n % 100000000) / 10000);
    return man > 0 ? `${eok}억 ${man.toLocaleString()}만원` : `${eok}억원`;
  }
  return `${Math.floor(n / 10000).toLocaleString()}만원`;
}

function fmtArea(area) {
  const m2 = parseFloat(String(area).replace(/[^0-9.]/g, ''));
  const pyeong = m2 ? (m2 / 3.3058).toFixed(0) : 0;
  return { m2: `${m2.toLocaleString()}㎡`, pyeong: `약 ${Number(pyeong).toLocaleString()}평` };
}

function LandPanel({ land, onClose, navigate }) {
  const [tab, setTab] = useState('overview');
  const ts = TYPE_STYLE[land.type] || TYPE_STYLE['대지'];
  const area = fmtArea(land.area);
  const pricePerM2 = Math.floor(parseInt(land.price, 10) / parseFloat(String(land.area).replace(/[^0-9.]/g, '')));

  const DETAILS = [
    { label: '용도지역', value: land.zoning || '제2종일반주거지역' },
    { label: '건폐율', value: `${land.coverage || 60}%` },
    { label: '용적률', value: `${land.far || 200}%` },
    { label: '도로접면', value: land.road || '8m 이상' },
    { label: '토지형상', value: land.shape || '정방형' },
    { label: '지세', value: land.slope || '평지' },
    { label: '거래일', value: land.date || '-' },
    { label: '지목', value: land.type },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 패널 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`text-xs px-2 py-0.5 rounded border font-medium shrink-0 ${ts.badge}`}>{land.type}</span>
          <span className="text-xs text-slate-400 truncate">{land.date}</span>
        </div>
        <button type="button" onClick={onClose}
          className="ml-2 shrink-0 w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* 주소 */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <p className="text-sm font-semibold text-slate-900 leading-snug">{land.address}</p>
      </div>

      {/* 핵심 지표 */}
      <div className="px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-0.5">거래금액</p>
            <p className="text-sm font-bold text-green-700">{fmtPrice(land.price)}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-0.5">면적</p>
            <p className="text-sm font-bold text-slate-800">{area.m2}</p>
            <p className="text-[10px] text-slate-400">{area.pyeong}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-0.5">㎡당 단가</p>
            <p className="text-sm font-bold text-slate-800">{pricePerM2.toLocaleString()}원</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <p className="text-[10px] text-slate-400 mb-0.5">평당 단가</p>
            <p className="text-sm font-bold text-slate-800">{Math.floor(pricePerM2 * 3.3058).toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-slate-200 shrink-0">
        {[{ key: 'overview', label: '토지 정보' }, { key: 'nearby', label: '인근 거래' }].map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-xs font-medium border-b-2 transition-all -mb-px ${
              tab === t.key ? 'border-green-700 text-green-700' : 'border-transparent text-slate-500'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto">
        {tab === 'overview' && (
          <div className="p-4">
            <div className="space-y-0 divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {DETAILS.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-3 py-2.5">
                  <span className="text-xs text-slate-400 w-20 shrink-0">{item.label}</span>
                  <span className="text-xs font-medium text-slate-700 text-right">{item.value}</span>
                </div>
              ))}
            </div>

            {/* LTV 안내 */}
            <div className="mt-4 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <p className="text-xs font-semibold text-slate-600 mb-2">대출 가능 한도 (참고)</p>
              <div className="space-y-1.5">
                {[
                  { bank: '1금융권', ltv: land.type === '대지' ? 70 : land.type === '농지' ? 60 : 50 },
                  { bank: '2금융권', ltv: land.type === '대지' ? 80 : land.type === '농지' ? 70 : 60 },
                ].map((b) => {
                  const amt = Math.floor(parseInt(land.price, 10) * b.ltv / 100);
                  return (
                    <div key={b.bank} className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 w-14 shrink-0">{b.bank}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${ts.bar}`} style={{ width: `${b.ltv}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600 w-20 text-right shrink-0">{fmtPrice(amt)} ({b.ltv}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === 'nearby' && (
          <div className="p-4">
            <p className="text-xs text-slate-400 mb-3">인근 유사 토지 거래 사례</p>
            <div className="space-y-2">
              {[
                { addr: '인근 동일 지목 토지 A', area: '520㎡', price: parseInt(land.price, 10) * 0.85, date: '2024-10' },
                { addr: '인근 동일 지목 토지 B', area: '480㎡', price: parseInt(land.price, 10) * 1.05, date: '2024-09' },
                { addr: '인근 동일 지목 토지 C', area: '610㎡', price: parseInt(land.price, 10) * 0.92, date: '2024-08' },
              ].map((item, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3">
                  <p className="text-xs font-medium text-slate-700 mb-1.5">{land.address.split(' ').slice(0, -1).join(' ')} 일대</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{item.area}</span>
                    <span className="font-semibold text-green-700">{fmtPrice(item.price)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 하단 액션 버튼 */}
      <div className="p-3 border-t border-slate-200 shrink-0 bg-white space-y-2">
        <button type="button"
          onClick={() => navigate(`/land/${land.id}`, { state: land })}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg text-xs font-semibold transition-colors">
          상세 정보 보기
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button type="button"
            onClick={() => navigate('/loan', { state: { price: land.price, type: land.type, address: land.address } })}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-medium transition-colors">
            대출 계산
          </button>
          <button type="button"
            onClick={() => navigate('/consultation', { state: { address: land.address } })}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-medium transition-colors">
            상담 신청
          </button>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [searchAddress, setSearchAddress] = useState('');
  const [selectedLand, setSelectedLand] = useState(null);
  const navigate = useNavigate();

  const handleMarkerClick = (land) => {
    setSelectedLand(land);
  };

  const handleClose = () => {
    setSelectedLand(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <main className="pt-14 flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 3.5rem)' }}>

        {/* 지도 영역 (패널 열리면 70%, 닫히면 100%) */}
        <div className="relative flex-1 min-w-0 transition-all duration-300">
          <MapView
            searchAddress={searchAddress}
            onMarkerClick={handleMarkerClick}
            panelOpen={!!selectedLand}
            height="100%"
          />

          {/* 검색바 오버레이 */}
          <div className={`absolute top-3 z-20 transition-all duration-300 pointer-events-none ${selectedLand ? 'left-1/2 -translate-x-1/2 w-[55%]' : 'left-1/2 -translate-x-1/2 w-[55%] max-w-xl'}`}>
            <div className="pointer-events-auto">
              <SearchBar onSearch={(addr) => setSearchAddress(addr)} />
              {searchAddress && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-white bg-opacity-95 px-3 py-1.5 rounded-md text-xs text-green-700 shadow-sm border border-green-200">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{searchAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* 패널 닫혀있을 때 힌트 */}
          {!selectedLand && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-slate-500 shadow-sm border border-slate-200 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                </svg>
                지도의 마커를 클릭하면 토지 정보를 확인할 수 있습니다
              </div>
            </div>
          )}
        </div>

        {/* 우측 상세 패널 (30%) */}
        <div
          className={`shrink-0 border-l border-slate-200 overflow-hidden transition-all duration-300 ease-in-out ${
            selectedLand ? 'w-[360px] xl:w-[400px]' : 'w-0'
          }`}
        >
          {selectedLand && (
            <LandPanel
              land={selectedLand}
              onClose={handleClose}
              navigate={navigate}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
