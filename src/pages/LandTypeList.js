import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandCard from '../components/LandCard';
import LandFilter from '../components/LandFilter';
import { useFilteredTrades } from '../hooks/useFilteredTrades';

const ALL_TRADES = [
  { id: 1, address: '경기도 용인시 처인구 양지면', area: '661', price: '85000000', date: '2024-11', type: '임야' },
  { id: 2, address: '충청남도 천안시 동남구 광덕면 매당리', area: '1322', price: '120000000', date: '2024-11', type: '대지' },
  { id: 3, address: '전라북도 전주시 완산구 효자동', area: '330', price: '210000000', date: '2024-10', type: '대지' },
  { id: 4, address: '강원도 춘천시 남산면 강촌리', area: '3305', price: '45000000', date: '2024-10', type: '임야' },
  { id: 5, address: '경상남도 창원시 의창구 북면 외감리', area: '992', price: '175000000', date: '2024-09', type: '공장' },
  { id: 6, address: '서울시 강남구 역삼동', area: '165', price: '980000000', date: '2024-11', type: '대지' },
  { id: 7, address: '제주도 서귀포시 중문동', area: '2640', price: '180000000', date: '2024-10', type: '임야' },
  { id: 8, address: '경기도 화성시 봉담읍 덕리', area: '800', price: '145000000', date: '2024-11', type: '농지' },
  { id: 9, address: '충청북도 청주시 흥덕구 강서동', area: '550', price: '230000000', date: '2024-10', type: '대지' },
  { id: 10, address: '전라남도 순천시 조례동', area: '430', price: '95000000', date: '2024-09', type: '대지' },
  { id: 11, address: '경상북도 포항시 남구 오천읍', area: '1100', price: '62000000', date: '2024-11', type: '임야' },
  { id: 12, address: '부산시 기장군 기장읍 대라리', area: '760', price: '310000000', date: '2024-10', type: '대지' },
  { id: 13, address: '경기도 파주시 탄현면 성동리', area: '1650', price: '55000000', date: '2024-11', type: '농지' },
  { id: 14, address: '인천시 서구 검단동', area: '495', price: '195000000', date: '2024-10', type: '대지' },
  { id: 15, address: '경기도 안성시 미양면', area: '2200', price: '88000000', date: '2024-09', type: '공장' },
  { id: 16, address: '강원도 홍천군 서면 반곡리', area: '4950', price: '35000000', date: '2024-11', type: '임야' },
  { id: 17, address: '충청남도 당진시 합덕읍 성동리', area: '1980', price: '72000000', date: '2024-10', type: '농지' },
  { id: 18, address: '경기도 평택시 포승읍 원정리', area: '3300', price: '420000000', date: '2024-11', type: '공장' },
  { id: 19, address: '전라남도 해남군 화산면', area: '6600', price: '28000000', date: '2024-09', type: '농지' },
  { id: 20, address: '경기도 이천시 마장면 표교리', area: '1200', price: '165000000', date: '2024-10', type: '대지' },
];

function LandTypeList() {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initRegion = location.state?.region || '전체';

  const [filters, setFilters] = useState({
    type: type && type !== '전체' ? type : '전체',
    sortBy: '최신순',
    region: initRegion,
    priceMin: '', priceMax: '', areaMin: '', areaMax: '',
  });

  const filtered = useFilteredTrades(ALL_TRADES, filters);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        {/* 페이지 헤더 */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-5">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => navigate('/land-category')}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-green-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                유형 선택
              </button>
              <span className="text-slate-300">/</span>
              <h1 className="text-lg font-bold text-slate-900">
                {filters.type === '전체' ? '전체 매물' : `${filters.type} 매물`}
              </h1>
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-medium">{filtered.length}건</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="mb-5">
            <LandFilter filters={filters} onChange={setFilters} />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">조건에 맞는 매물이 없습니다</p>
              <p className="text-slate-400 text-xs mb-4">필터 조건을 변경해 보세요</p>
              <button type="button"
                onClick={() => setFilters({ type: '전체', sortBy: '최신순', region: '전체', priceMin: '', priceMax: '', areaMin: '', areaMax: '' })}
                className="text-sm text-green-700 border border-green-200 px-4 py-2 rounded-md hover:bg-green-50 transition-colors">
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((land) => <LandCard key={land.id} land={land} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandTypeList;
