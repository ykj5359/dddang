import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';

const TRUST_LANDS = [
  {
    id: 1,
    address: '충청남도 공주시 탄천면 화봉리 245',
    area: '2640㎡',
    areaP: '약 798평',
    type: '논(답)',
    region: '충남',
    rent: '월 15만원',
    period: '3년 이상',
    crop: '벼농사',
    features: ['관정 있음', '농로 포장', '인근 창고 임대 가능'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
  {
    id: 2,
    address: '전라북도 완주군 소양면 신촌리 88',
    area: '4950㎡',
    areaP: '약 1,497평',
    type: '밭(전)',
    region: '전북',
    rent: '월 22만원',
    period: '5년 이상',
    crop: '고추·콩 등 밭작물',
    features: ['비닐하우스 설치 가능', '지하수 개발 허가', '마을 인근'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
  {
    id: 3,
    address: '강원도 홍천군 남면 양덕원리 321',
    area: '6600㎡',
    areaP: '약 1,996평',
    type: '임야(귀농부지)',
    region: '강원',
    rent: '월 20만원',
    period: '3년 이상',
    crop: '산나물·약초·블루베리',
    features: ['계곡 인접', '전원주택 신축 가능', '전기 수도 인입'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
  {
    id: 4,
    address: '경상남도 함양군 마천면 추성리 190',
    area: '3300㎡',
    areaP: '약 998평',
    type: '논(답)',
    region: '경남',
    rent: '월 18만원',
    period: '3년 이상',
    crop: '벼·연꽃·수생식물',
    features: ['친환경 가능', '지리산 인근', '귀농센터 지원 지역'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
  {
    id: 5,
    address: '제주특별자치도 서귀포시 안덕면 서광리',
    area: '1980㎡',
    areaP: '약 599평',
    type: '과수원',
    region: '제주',
    rent: '월 35만원',
    period: '5년 이상',
    crop: '감귤·한라봉',
    features: ['기존 감귤나무 식재', '농기구 창고', '출하 루트 제공'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
  {
    id: 6,
    address: '충청북도 보은군 내북면 법주리 67',
    area: '8250㎡',
    areaP: '약 2,496평',
    type: '밭(전)+임야',
    region: '충북',
    rent: '월 25만원',
    period: '5년 이상',
    crop: '인삼·산양삼·약초',
    features: ['속리산 인근', '산림복합경영 가능', '임도 완비'],
    owner: '신탁관리중',
    status: '임차인 모집중',
  },
];

const FARMING_SEEKERS = [
  { id: 1, region: '충남·전북 선호', crop: '벼농사·채소', experience: '귀농교육 이수', family: '2인', budget: '보증금 없음' },
  { id: 2, region: '강원·경기 선호', crop: '산나물·약초', experience: '5년 부업 경작', family: '3인', budget: '보증금 100만원' },
  { id: 3, region: '제주 선호', crop: '감귤·과수', experience: '귀농학교 졸업', family: '4인', budget: '보증금 200만원' },
];

const REGIONS = ['전체', '서울·경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

function FarmlandMatching() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('농지 목록');
  const [filterRegion, setFilterRegion] = useState('전체');
  const [selectedLand, setSelectedLand] = useState(null);
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', intro: '', experience: '', family: '' });
  const [applySubmitted, setApplySubmitted] = useState(false);

  const filtered = TRUST_LANDS.filter((land) => {
    if (filterRegion !== '전체' && !land.region.includes(filterRegion.split('·')[0]) && !filterRegion.split('·').some(r => land.region.includes(r))) return false;
    return true;
  });

  const handleApply = (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setApplySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Header />

      <div className="pt-16 bg-green-700 text-white px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs bg-green-600 inline-block px-2 py-0.5 rounded mb-2">농지신탁 × 귀농매칭</p>
          <h1 className="text-2xl font-bold mb-1">귀농매칭 플랫폼</h1>
          <p className="text-sm text-green-100">농지신탁 위탁 농지와 귀농 희망자를 연결합니다</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* 통계 요약 */}
        <div className="grid grid-cols-3 gap-3 py-4">
          {[
            { label: '신탁 농지', value: `${TRUST_LANDS.length}건` },
            { label: '귀농 희망자', value: '38명' },
            { label: '매칭 완료', value: '127건' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-slate-200">
              <div className="text-lg font-bold text-green-700">{item.value}</div>
              <div className="text-xs text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 탭 */}
        <div className="flex bg-white border-b border-slate-200 sticky top-16 z-30">
          {['농지 목록', '귀농 희망자', '매칭 신청'].map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab ? 'border-green-600 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 농지 목록 탭 */}
        {activeTab === '농지 목록' && (
          <div className="py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
              {REGIONS.map((r) => (
                <button key={r} type="button" onClick={() => setFilterRegion(r)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    filterRegion === r ? 'bg-green-700 text-white border-green-700' : 'bg-white text-slate-600 border-slate-200 hover:border-green-400'
                  }`}>
                  {r}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filtered.map((land) => (
                <div key={land.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-green-200 transition-all">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">{land.type}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">{land.status}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">{land.rent}</span>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 mb-1">{land.address}</p>
                    <p className="text-xs text-slate-500 mb-3">{land.area} ({land.areaP}) · 임대기간 {land.period}</p>

                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-slate-400 mb-1">추천 작목</p>
                      <p className="text-sm font-medium text-green-700">{land.crop}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {land.features.map((f) => (
                        <span key={f} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{f}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => { setSelectedLand(land); setActiveTab('매칭 신청'); }}
                        className="bg-green-700 hover:bg-green-800 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                        임차 신청하기
                      </button>
                      <button type="button" onClick={() => navigate('/farmland-consult')}
                        className="bg-white hover:bg-green-50 text-green-700 py-2.5 rounded-lg text-sm font-semibold border border-green-200 transition-colors">
                        상담 문의
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="font-semibold text-amber-800 mb-1 text-sm">농지신탁 위탁 농지 등록</p>
              <p className="text-sm text-amber-700 mb-3">직접 경작이 어려운 농지를 신탁 등록하면 귀농인에게 임대하고 수익을 받을 수 있습니다.</p>
              <button type="button" onClick={() => navigate('/my-land')}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                내 농지 신탁 등록하기
              </button>
            </div>
          </div>
        )}

        {/* 귀농 희망자 탭 */}
        {activeTab === '귀농 희망자' && (
          <div className="py-4 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-700">
              귀농 희망자 프로필 목록입니다. 농지 소유자는 직접 연락하여 임대차 협의를 진행할 수 있습니다.
            </div>
            {FARMING_SEEKERS.map((seeker) => (
              <div key={seeker.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">귀농 희망자 #{seeker.id}</p>
                    <p className="text-xs text-slate-500">{seeker.region}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: '희망 작목', value: seeker.crop },
                    { label: '영농 경험', value: seeker.experience },
                    { label: '가족 구성', value: seeker.family },
                    { label: '임차 조건', value: seeker.budget },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-lg p-2">
                      <div className="text-slate-400 mb-0.5">{item.label}</div>
                      <div className="font-medium text-slate-700">{item.value}</div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => navigate('/farmland-consult')}
                  className="w-full mt-3 text-sm text-green-700 border border-green-200 py-2.5 rounded-lg hover:bg-green-50 font-medium transition-colors">
                  연결 문의하기
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setActiveTab('매칭 신청')}
              className="w-full bg-green-700 text-white py-3.5 rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors">
              귀농 희망자로 등록하기
            </button>
          </div>
        )}

        {/* 매칭 신청 탭 */}
        {activeTab === '매칭 신청' && (
          <div className="py-4">
            {selectedLand && (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4">
                <p className="text-sm font-semibold text-green-800">{selectedLand.address}</p>
                <p className="text-xs text-green-600 mt-0.5">{selectedLand.area} · {selectedLand.rent}</p>
              </div>
            )}

            {applySubmitted ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-green-800 mb-2">매칭 신청 완료!</h2>
                <p className="text-sm text-slate-500">담당자가 검토 후 1~2일 내 연락드립니다.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-semibold text-slate-800 text-sm">귀농 매칭 신청서</h2>
                {[
                  { key: 'name', label: '성함 *', ph: '홍길동', type: 'text' },
                  { key: 'phone', label: '연락처 *', ph: '010-0000-0000', type: 'tel' },
                  { key: 'experience', label: '영농 경험', ph: '예: 귀농교육 이수, 5년 주말 농장 운영 등', type: 'text' },
                  { key: 'family', label: '가족 구성', ph: '예: 부부 2인, 자녀 2명', type: 'text' },
                ].map(({ key, label, ph, type }) => (
                  <div key={key}>
                    <label className="text-xs text-slate-500 block mb-1">{label}</label>
                    <input type={type} value={applyForm[key]} onChange={(e) => setApplyForm((p) => ({ ...p, [key]: e.target.value }))}
                      placeholder={ph} required={label.includes('*')}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-slate-500 block mb-1">자기 소개 및 귀농 계획</label>
                  <textarea value={applyForm.intro} onChange={(e) => setApplyForm((p) => ({ ...p, intro: e.target.value }))} rows={3}
                    placeholder="귀농 이유, 희망 작목, 임차 희망 지역 등을 자유롭게 적어주세요"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
                  {user ? '매칭 신청하기' : '로그인 후 신청하기'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default FarmlandMatching;
