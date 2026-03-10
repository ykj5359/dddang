import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AUCTIONS = [
  { id: 1, caseNo: '2024타경12345', court: '수원지방법원', address: '경기도 용인시 처인구 양지면', type: '임야', area: '661㎡', appraisalPrice: 95000000, minBid: 66500000, bidDate: '2025-03-15', round: 1, status: '진행중', lat: 37.41, lng: 127.26 },
  { id: 2, caseNo: '2024타경98765', court: '서울중앙지방법원', address: '서울시 강남구 역삼동', type: '대지', area: '330㎡', appraisalPrice: 1050000000, minBid: 735000000, bidDate: '2025-03-22', round: 1, status: '진행중', lat: 37.50, lng: 127.03 },
  { id: 3, caseNo: '2024타경54321', court: '대전지방법원', address: '충청남도 공주시 탄천면', type: '농지', area: '1980㎡', appraisalPrice: 45000000, minBid: 31500000, bidDate: '2025-03-10', round: 2, status: '진행중', lat: 36.45, lng: 127.11 },
  { id: 4, caseNo: '2024타경11111', court: '부산지방법원', address: '부산시 기장군 기장읍', type: '대지', area: '760㎡', appraisalPrice: 310000000, minBid: 217000000, bidDate: '2025-03-28', round: 1, status: '진행중', lat: 35.24, lng: 129.21 },
  { id: 5, caseNo: '2024타경22222', court: '제주지방법원', address: '제주도 서귀포시 안덕면', type: '임야', area: '2640㎡', appraisalPrice: 180000000, minBid: 126000000, bidDate: '2025-04-05', round: 1, status: '진행중', lat: 33.30, lng: 126.43 },
  { id: 6, caseNo: '2023타경99999', court: '광주지방법원', address: '전라남도 순천시 조례동', type: '대지', area: '430㎡', appraisalPrice: 95000000, minBid: 47500000, bidDate: '2025-02-20', round: 3, status: '유찰', lat: 34.95, lng: 127.49 },
];

const STATUS_COLOR = {
  '진행중': 'bg-green-100 text-green-700',
  '낙찰': 'bg-blue-100 text-blue-700',
  '유찰': 'bg-red-100 text-red-700',
};

const TYPE_COLOR = {
  대지: 'bg-blue-100 text-blue-700',
  임야: 'bg-green-100 text-green-700',
  농지: 'bg-yellow-100 text-yellow-700',
  공장: 'bg-gray-100 text-gray-700',
};

function Auction() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('전체');
  const [filterStatus, setFilterStatus] = useState('전체');
  const [sortBy, setSortBy] = useState('입찰일순');

  const filtered = AUCTIONS
    .filter((a) => filterType === '전체' || a.type === filterType)
    .filter((a) => filterStatus === '전체' || a.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === '낙찰률순') return (a.minBid / a.appraisalPrice) - (b.minBid / b.appraisalPrice);
      if (sortBy === '감정가순') return b.appraisalPrice - a.appraisalPrice;
      return new Date(a.bidDate) - new Date(b.bidDate);
    });

  const fmt = (n) => {
    if (n >= 100000000) return `${Math.floor(n / 100000000)}억 ${Math.floor((n % 100000000) / 10000)}만`;
    return `${Math.floor(n / 10000).toLocaleString()}만원`;
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      <main className="pt-20 max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-800">⚖️ 토지 경매 정보</h1>
          <p className="text-sm text-gray-500 mt-1">대법원 경매정보 기반 전국 토지 경매물건 조회</p>
        </div>

        {/* 통계 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: '전체 경매', value: `${AUCTIONS.length}건`, icon: '📋' },
            { label: '진행중', value: `${AUCTIONS.filter((a) => a.status === '진행중').length}건`, icon: '🟢' },
            { label: '평균 낙찰률', value: '72%', icon: '📊' },
            { label: '이번달 입찰', value: `${AUCTIONS.filter((a) => a.bidDate.startsWith('2025-03')).length}건`, icon: '📅' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-green-100">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-lg font-bold text-green-700">{item.value}</div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 필터 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1">
            {['전체', '대지', '임야', '농지'].map((t) => (
              <button key={t} type="button" onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterType === t ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {['전체', '진행중', '유찰'].map((s) => (
              <button key={s} type="button" onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${filterStatus === s ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-400'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="ml-auto">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none">
              {['입찰일순', '낙찰률순', '감정가순'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length}건</p>

        {/* 경매 목록 */}
        <div className="space-y-4">
          {filtered.map((a) => {
            const bidRate = Math.round((a.minBid / a.appraisalPrice) * 100);
            return (
              <div key={a.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all cursor-pointer"
                onClick={() => navigate(`/land/${a.id}`, { state: { address: a.address, price: a.minBid, area: a.area, type: a.type } })}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLOR[a.status]}`}>{a.status}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${TYPE_COLOR[a.type]}`}>{a.type}</span>
                    {a.round > 1 && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">{a.round}회 유찰</span>}
                  </div>
                  <span className="text-xs text-gray-400">입찰: {a.bidDate}</span>
                </div>

                <h3 className="text-sm font-bold text-gray-800 mb-1">📍 {a.address}</h3>
                <p className="text-xs text-gray-400 mb-3">{a.caseNo} | {a.court} | {a.area}</p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-400 mb-0.5">감정가</div>
                    <div className="text-sm font-bold text-gray-700">{fmt(a.appraisalPrice)}</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <div className="text-xs text-gray-400 mb-0.5">최저입찰가</div>
                    <div className="text-sm font-bold text-orange-600">{fmt(a.minBid)}</div>
                  </div>
                  <div className={`rounded-xl p-3 text-center ${bidRate <= 70 ? 'bg-green-50' : 'bg-blue-50'}`}>
                    <div className="text-xs text-gray-400 mb-0.5">낙찰기준율</div>
                    <div className={`text-sm font-bold ${bidRate <= 70 ? 'text-green-600' : 'text-blue-600'}`}>{bidRate}%</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={(e) => { e.stopPropagation(); navigate('/loan', { state: { price: a.minBid, type: a.type, address: a.address } }); }}
                    className="flex-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 py-2 rounded-lg font-medium">🏦 대출 계산</button>
                  <button type="button" onClick={(e) => { e.stopPropagation(); navigate('/consultation', { state: { address: a.address } }); }}
                    className="flex-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg font-medium">📞 상담 신청</button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 text-center mt-8">※ 본 경매 정보는 대법원 경매정보 기반 샘플 데이터입니다. 실제 입찰 전 반드시 대법원경매정보(www.courtauction.go.kr)에서 확인하세요.</p>
      </main>
      <Footer />
    </div>
  );
}

export default Auction;
