import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const LAW_GUIDES = [
  {
    title: '경자유전(耕者有田)의 원칙',
    badge: '핵심 원칙',
    badgeColor: 'bg-red-100 text-red-700',
    content: `농지는 농업인 또는 농업법인만 소유할 수 있다는 헌법상 원칙입니다.\n\n2025년부터 정부가 실거주 의무 미이행자에 대해 과태료를 본격 부과하겠다고 발표했습니다. 타지 거주자가 농지를 소유한 경우 처분 의무가 발생할 수 있습니다.`,
    subItems: [
      '비농업인이 농지를 취득하려면 농업경영계획서 제출 필요',
      '취득 후 1년 내 농업경영 미착수 시 처분 의무 발생',
      '위반 시 해당 농지 공시지가의 25% 이내 이행강제금 부과',
    ],
  },
  {
    title: '농지처분 의무 통보',
    badge: '2025 강화',
    badgeColor: 'bg-orange-100 text-orange-700',
    content: `시·군·구청장은 농지 소유자가 정당한 사유 없이 농지를 직접 경작하지 않는 경우 처분 의무를 통보할 수 있습니다.`,
    subItems: [
      '처분 의무 통보 후 1년 이내 처분하지 않으면 이행강제금 부과',
      '연 1회 이상 반복 부과 가능',
      '공시지가 25% 이내 → 2025년부터 실질적 집행 예정',
      '투기성 농지 소유로 판단 시 즉각 처분 권고',
    ],
  },
  {
    title: '농지신탁이란?',
    badge: '합법적 해결책',
    badgeColor: 'bg-green-100 text-green-700',
    content: `농지신탁은 농지 소유자(위탁자)가 신탁회사(수탁자)에게 농지의 관리·운용을 맡기는 제도입니다.\n\n농지를 직접 경작하기 어려운 경우, 신탁을 통해 합법적으로 농지 소유를 유지하면서 귀농인에게 임대하여 경작케 할 수 있습니다.`,
    subItems: [
      '신탁 기간 동안 처분 의무 면제 (적법한 임대 경우)',
      '귀농·귀촌 희망자에게 임대 수익 창출',
      '신탁회사가 농지 관리·임차인 모집·수익 배분 대행',
      '향후 처분 시 절세 효과 기대 가능',
    ],
  },
  {
    title: '농지 임대 가능 요건',
    badge: '예외 규정',
    badgeColor: 'bg-blue-100 text-blue-700',
    content: `일반적으로 농지 임대는 금지되나, 다음의 경우 합법적으로 임대가 가능합니다.`,
    subItems: [
      '농지은행을 통한 임대(8년 이상)',
      '60세 이상 고령 농업인',
      '농업법인 소유 농지',
      '신탁회사에 신탁한 농지',
      '귀농·귀촌 교육 이수 후 임대 특례 적용',
      '상속·이농 등 부득이한 사유',
    ],
  },
];

const FARMING_INFO = [
  {
    title: '귀농·귀촌 지원 제도',
    items: [
      { label: '귀농창업 지원', desc: '농림부 귀농창업 지원금 최대 3억원 (이자 2%)' },
      { label: '주택 구입 지원', desc: '귀농인 주택 구입·수리 자금 최대 7,500만원' },
      { label: '영농정착 지원금', desc: '초기 3년간 월 최대 100만원 지원' },
      { label: '귀농 교육', desc: '농식품부 인정 귀농학교 교육비 전액 지원' },
    ],
  },
  {
    title: '농지신탁 임대 매칭 절차',
    steps: [
      { step: '1', label: '신탁 등록', desc: '내토지 메뉴에서 농지신탁 신청' },
      { step: '2', label: '매칭 요청', desc: '귀농매칭 페이지에서 임차 신청' },
      { step: '3', label: '조건 협의', desc: '임대 기간·금액·경작 방식 협의' },
      { step: '4', label: '계약 체결', desc: '농지임대차 계약 체결 및 등기' },
      { step: '5', label: '경작 시작', desc: '귀농인 입주 및 영농 활동 시작' },
    ],
  },
  {
    title: '지역별 귀농 지원센터',
    centers: [
      { region: '경기', phone: '031-120', note: '도농 복합 지역 특화 상담' },
      { region: '강원', phone: '033-249-2000', note: '청정 자연환경 귀농 특화' },
      { region: '충남', phone: '041-635-6000', note: '근거리 귀농 인기 지역' },
      { region: '전북', phone: '063-713-2000', note: '논농사·과수 전문 상담' },
      { region: '경남', phone: '055-211-2000', note: '시설원예·특용작물 특화' },
      { region: '제주', phone: '064-710-6000', note: '감귤·한라봉 전문 상담' },
    ],
  },
];

const CONSULT_TYPES = [
  '농지처분 의무 통보 받음',
  '타지 거주 중 농지 보유',
  '농지신탁 절차 문의',
  '귀농·귀촌 희망 (임차)',
  '농지 매각·임대 희망',
  '농지 상속·증여 문의',
  '기타',
];

function FarmlandConsult() {
  const [activeTab, setActiveTab] = useState('상담신청');
  const [form, setForm] = useState({ name: '', phone: '', type: '', address: '', detail: '', agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [openGuide, setOpenGuide] = useState(null);

  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.agree) return;
    setSubmitted(true);
  };

  const TABS = ['상담신청', '농지법 가이드', '귀농 정보'];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Header />

      {/* 히어로 배너 */}
      <div className="pt-16 bg-amber-700 text-white px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-medium bg-amber-600 inline-block px-2 py-0.5 rounded mb-2">
            전문가 무료 상담
          </p>
          <h1 className="text-2xl font-bold mb-1">농지 고민, 지금 해결하세요</h1>
          <p className="text-sm text-amber-100">농지처분 의무 · 신탁 · 귀농 전문 컨설팅</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* 탭 */}
        <div className="flex bg-white border-b border-slate-200 sticky top-16 z-30">
          {TABS.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 상담 신청 탭 */}
        {activeTab === '상담신청' && (
          <div className="py-5">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { title: '빠른 응답', desc: '1~2일 이내' },
                { title: '100% 무료', desc: '초기 상담' },
                { title: '전문가 상담', desc: '농지 전문' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-4 text-center shadow-sm border border-slate-200">
                  <div className="text-xs font-semibold text-slate-700 mb-0.5">{item.title}</div>
                  <div className="text-xs text-slate-400">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
              <p className="font-semibold text-green-800 text-sm mb-3">이런 분들께 도움드립니다</p>
              <ul className="space-y-2">
                {[
                  '농지 처분 의무 통보를 받으셨나요?',
                  '타지 거주자인데 농지를 보유 중이신가요?',
                  '귀농하려는데 적합한 농지를 찾고 계신가요?',
                  '농지신탁 절차가 궁금하신가요?',
                  '농지 매각 또는 임대를 원하시나요?',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm font-semibold text-red-700 mb-0.5">2025년 농지처분 의무 집행 강화</p>
              <p className="text-xs text-red-600">정부가 경자유전 원칙에 따라 비경작 농지에 대한 이행강제금을 본격 부과할 예정입니다. 지금 바로 상담받으세요.</p>
            </div>

            {submitted ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-green-800 mb-2">상담 신청 완료!</h2>
                <p className="text-sm text-slate-500">영업일 기준 1~2일 내 전문 상담사가 연락드립니다.</p>
                <p className="text-xs text-slate-400 mt-2">{form.name} ({form.phone})</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
                <h2 className="font-semibold text-slate-800 mb-4 text-sm">상담 신청서</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">성함 *</label>
                      <input type="text" value={form.name} onChange={(e) => up('name', e.target.value)} required placeholder="홍길동"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-1">연락처 *</label>
                      <input type="tel" value={form.phone} onChange={(e) => up('phone', e.target.value)} required placeholder="010-0000-0000"
                        className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">상담 유형</label>
                    <select value={form.type} onChange={(e) => up('type', e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500">
                      <option value="">선택해주세요</option>
                      {CONSULT_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">농지 소재지</label>
                    <input type="text" value={form.address} onChange={(e) => up('address', e.target.value)} placeholder="예: 충청남도 공주시 탄천면"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">상세 문의 내용</label>
                    <textarea value={form.detail} onChange={(e) => up('detail', e.target.value)} rows={3}
                      placeholder="농지 현황, 고민 사항, 궁금한 점을 자유롭게 적어주세요"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 resize-none" />
                  </div>
                  <label className="flex items-start gap-2 text-xs text-slate-500 cursor-pointer">
                    <input type="checkbox" checked={form.agree} onChange={(e) => up('agree', e.target.checked)} className="mt-0.5 rounded" />
                    <span>개인정보 수집·이용에 동의합니다 (필수)</span>
                  </label>
                  <button type="submit" disabled={!form.agree}
                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
                    무료 상담 신청하기
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 농지법 가이드 탭 */}
        {activeTab === '농지법 가이드' && (
          <div className="py-5 space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
              <p className="text-sm text-amber-700"><strong>2025년 집행 강화:</strong> 비경작 농지 소유자에 대한 이행강제금 부과가 본격화됩니다. 아래 가이드를 꼭 확인하세요.</p>
            </div>

            {LAW_GUIDES.map((guide, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button type="button" onClick={() => setOpenGuide(openGuide === i ? null : i)}
                  className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">{guide.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${guide.badgeColor}`}>{guide.badge}</span>
                    </div>
                  </div>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${openGuide === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openGuide === i && (
                  <div className="px-4 pb-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600 my-3 leading-relaxed whitespace-pre-line">{guide.content}</p>
                    <ul className="space-y-2">
                      {guide.subItems.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-green-500 mt-0.5 flex-shrink-0">·</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-2">
              <p className="text-sm font-semibold text-green-800 mb-1">농지신탁으로 해결하세요</p>
              <p className="text-xs text-green-700">직접 경작이 어려운 농지를 신탁하면 귀농인에게 합법적으로 임대하고 수익도 받을 수 있습니다.</p>
              <button type="button" onClick={() => setActiveTab('상담신청')}
                className="mt-3 w-full bg-green-700 text-white text-xs py-2.5 rounded-lg font-medium hover:bg-green-800">
                농지신탁 무료 상담받기
              </button>
            </div>
          </div>
        )}

        {/* 귀농 정보 탭 */}
        {activeTab === '귀농 정보' && (
          <div className="py-5 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-4 text-sm">{FARMING_INFO[0].title}</h2>
              <div className="space-y-3">
                {FARMING_INFO[0].items.map((item) => (
                  <div key={item.label} className="flex gap-3 p-3 bg-green-50 rounded-lg">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-4 text-sm">{FARMING_INFO[1].title}</h2>
              <div className="space-y-2">
                {FARMING_INFO[1].steps.map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {s.step}
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-sm font-semibold text-slate-700">{s.label}</span>
                      <span className="text-xs text-slate-400 ml-2">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-4 text-sm">{FARMING_INFO[2].title}</h2>
              <div className="grid grid-cols-2 gap-2">
                {FARMING_INFO[2].centers.map((c) => (
                  <div key={c.region} className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-700">{c.region}</p>
                    <p className="text-xs text-blue-600">{c.phone}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => setActiveTab('상담신청')}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-xl font-semibold text-sm transition-colors">
              귀농·농지신탁 무료 상담 신청
            </button>
          </div>
        )}
      </div>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default FarmlandConsult;
