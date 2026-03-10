import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LandFilter from '../components/LandFilter';
import { useFilteredTrades } from '../hooks/useFilteredTrades';
import { useAuth } from '../context/AuthContext';

const DIRECT_LISTINGS = [
  { id: 101, address: '경기도 양평군 강하면 전수리', area: '1650', price: '42000000', date: '2025-01', type: '임야', seller: '홍*동', direct: true, desc: '계곡 인근, 도로 접면, 전원주택 부지로 최적' },
  { id: 102, address: '충청남도 공주시 탄천면 화봉리', area: '990', price: '35000000', date: '2025-01', type: '농지', seller: '김*수', direct: true, desc: '비닐하우스 가능, 도로변, 즉시 매매 가능' },
  { id: 103, address: '전라북도 완주군 소양면 신촌리', area: '825', price: '28000000', date: '2025-01', type: '농지', seller: '이*영', direct: true, desc: '경작 중인 답, 물 공급 원활, 귀농 희망자 우대' },
  { id: 104, address: '강원도 홍천군 남면 양덕원리', area: '5280', price: '65000000', date: '2025-01', type: '임야', seller: '박*현', direct: true, desc: '산림경영 목적, 진입로 있음, 태양광 가능 검토' },
  { id: 105, address: '경상북도 청도군 각남면 신당리', area: '495', price: '22000000', date: '2025-01', type: '대지', seller: '최*준', direct: true, desc: '마을 내 주택 신축 가능 대지, 전기·수도 공급 가능' },
  { id: 106, address: '제주도 서귀포시 안덕면 사계리', area: '1320', price: '180000000', date: '2025-01', type: '임야', seller: '오*미', direct: true, desc: '산방산 인근, 경관 우수, 개발 가능성 높음' },
  { id: 107, address: '충청북도 보은군 내북면 법주리', area: '2640', price: '38000000', date: '2024-12', type: '임야', seller: '한*서', direct: true, desc: '속리산 인근, 개발제한 없음, 귀촌 추천' },
  { id: 108, address: '경기도 가평군 북면 백둔리', area: '3300', price: '85000000', date: '2024-12', type: '임야', seller: '정*아', direct: true, desc: '계곡 수변 토지, 펜션 부지 적합, 진입로 완비' },
];

const TYPE_BADGE = {
  임야: 'bg-green-50 text-green-700 border-green-200',
  농지: 'bg-amber-50 text-amber-700 border-amber-200',
  대지: 'bg-blue-50 text-blue-700 border-blue-200',
  공장: 'bg-slate-100 text-slate-600 border-slate-200',
};

function DirectTrade() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ type: '전체', sortBy: '최신순', region: '전체', priceMin: '', priceMax: '', areaMin: '', areaMax: '' });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ address: '', area: '', price: '', type: '대지', desc: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const filtered = useFilteredTrades(DIRECT_LISTINGS, filters);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setSubmitted(true);
    setShowForm(false);
  };

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const formatPrice = (price) => {
    const p = parseInt(price, 10);
    if (p >= 100000000) return `${Math.floor(p / 100000000)}억 ${Math.floor((p % 100000000) / 10000)}만원`;
    return `${Math.floor(p / 10000).toLocaleString()}만원`;
  };

  const inputClass = "w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900">직거래 매물</h1>
                <p className="text-sm text-slate-500 mt-0.5">중개사 없이 토지 소유자와 직접 거래하세요</p>
              </div>
              <button type="button" onClick={() => user ? setShowForm(true) : navigate('/login')}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors">
                내 토지 등록
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { title: '수수료 절약', desc: '중개 수수료 없이 직거래' },
              { title: '직접 협상', desc: '소유자와 직접 가격 협의' },
              { title: '신속 처리', desc: '중간 단계 없이 빠른 거래' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-4 text-center border border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-0.5">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-5 text-sm text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              매물이 등록 신청되었습니다. 검토 후 1~2일 내 등록됩니다.
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-slate-800">직거래 매물 등록</h2>
                <button type="button" onClick={() => setShowForm(false)}
                  className="text-slate-400 hover:text-slate-600 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleRegister}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">토지 주소 <span className="text-red-400">*</span></label>
                    <input type="text" value={form.address} onChange={(e) => up('address', e.target.value)} required
                      placeholder="예: 충청남도 공주시 탄천면" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">면적 (㎡) <span className="text-red-400">*</span></label>
                    <input type="number" value={form.area} onChange={(e) => up('area', e.target.value)} required
                      placeholder="예: 1000" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">희망 매매가 (원) <span className="text-red-400">*</span></label>
                    <input type="number" value={form.price} onChange={(e) => up('price', e.target.value)} required
                      placeholder="예: 50000000" className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">지목 <span className="text-red-400">*</span></label>
                    <select value={form.type} onChange={(e) => up('type', e.target.value)} className={inputClass}>
                      {['대지', '임야', '농지', '공장'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">연락처 <span className="text-red-400">*</span></label>
                    <input type="tel" value={form.phone} onChange={(e) => up('phone', e.target.value)} required
                      placeholder="010-0000-0000" className={inputClass} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-500 block mb-1.5">토지 설명</label>
                    <textarea value={form.desc} onChange={(e) => up('desc', e.target.value)} rows={3}
                      placeholder="토지 특징, 접도 여부, 개발 가능성 등을 자유롭게 적어주세요"
                      className={`${inputClass} resize-none`} />
                  </div>
                </div>
                <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium text-sm transition-colors">
                  매물 등록 신청
                </button>
              </form>
            </div>
          )}

          <div className="mb-5">
            <LandFilter filters={filters} onChange={setFilters} />
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-500">총 <strong className="text-slate-800">{filtered.length}건</strong>의 직거래 매물</p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
              <p className="text-slate-400 text-sm">조건에 맞는 직거래 매물이 없습니다</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((land) => (
                <div key={land.id}
                  className="bg-white rounded-lg border border-slate-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/land/${land.id}`, { state: land })}>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1.5">
                        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TYPE_BADGE[land.type] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>{land.type}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded font-medium">직거래</span>
                      </div>
                      <span className="text-xs text-slate-400">{land.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-1.5">{land.address}</p>
                    {land.desc && <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{land.desc}</p>}
                    <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">희망가</span>
                        <span className="font-semibold text-green-700">{formatPrice(land.price)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">면적</span>
                        <span className="text-slate-600">{land.area}㎡ (약 {(parseInt(land.area, 10) / 3.3058).toFixed(0)}평)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">판매자</span>
                        <span className="text-slate-600">{land.seller}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button type="button"
                      onClick={(e) => { e.stopPropagation(); navigate('/consultation', { state: { address: land.address } }); }}
                      className="w-full bg-slate-50 hover:bg-green-50 hover:text-green-700 text-slate-600 py-2 rounded-md text-xs font-medium transition-colors border border-slate-200">
                      판매자 연락하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default DirectTrade;
