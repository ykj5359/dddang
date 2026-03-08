import { useState } from 'react';
import { farmingGuide, returnFarmingInfo } from '../data/dummyData';

const TABS = [
  { id: 'consult', label: '상담 신청' },
  { id: 'guide',   label: '농지법 가이드' },
  { id: 'info',    label: '귀농 정보' },
];

const TRUST_BADGES = [
  { icon: '⚡', label: '빠른 응답', desc: '1~2일 이내', color: 'bg-amber-50 border-amber-200' },
  { icon: '🔒', label: '100% 무료', desc: '초기 상담',  color: 'bg-emerald-50 border-emerald-200' },
  { icon: '👨‍💼', label: '전문가 상담', desc: '농지 전문', color: 'bg-sky-50 border-sky-200' },
];

const HELP_LIST = [
  '농지 처분 의무 통보를 받으셨나요?',
  '타지 거주자인데 농지를 보유 중이신가요?',
  '귀농하려는데 적합한 농지를 찾고 계신가요?',
  '농지신탁 절차가 궁금하신가요?',
  '농지 매각 또는 임대를 원하시나요?',
];

const CHECKLIST = [
  '귀농 교육 이수 (농업경영교육)',
  '농업경영계획서 작성',
  '농지취득자격증명 신청',
  '귀농 지원 사업 신청',
  '주거지 및 농지 확보',
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`card overflow-hidden transition-all ${open ? 'border-primary-200' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left -m-4 p-4"
      >
        <span className="text-sm font-semibold text-slate-800 pr-4">{item.title}</span>
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="-mx-4 -mb-4 mt-3 px-4 py-4 bg-slate-50 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">{item.content}</p>
        </div>
      )}
    </div>
  );
}

function ConsultForm() {
  const [form, setForm] = useState({ name: '', phone: '', issue: '처분의무', memo: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mb-5">
          <span className="text-4xl">📞</span>
        </div>
        <p className="font-bold text-slate-900 text-lg mb-1">상담 신청 완료</p>
        <p className="text-sm text-slate-500 mb-0.5">영업일 기준 1~2일 내 연락드립니다</p>
        <p className="text-sm font-bold text-primary-600">{form.phone}</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 btn-ghost border border-slate-200"
        >
          다시 신청
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">성함 *</label>
          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="홍길동" className="input-field" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">연락처 *</label>
          <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="010-0000-0000" className="input-field" />
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">상담 유형</label>
        <select value={form.issue} onChange={(e) => setForm({ ...form, issue: e.target.value })} className="input-field">
          <option value="처분의무">농지 처분 의무 해소</option>
          <option value="신탁">농지신탁 문의</option>
          <option value="임대">농지 임대 방법</option>
          <option value="귀농">귀농 준비 상담</option>
          <option value="매매">농지 매매 상담</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">문의 내용</label>
        <textarea value={form.memo} onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="보유 토지 위치, 면적, 문의 사항 등을 적어주세요" rows={4}
          className="input-field resize-none" />
      </div>
      <button type="submit" className="w-full btn-primary py-4 text-sm">무료 상담 신청하기</button>
      <p className="text-xs text-slate-400 text-center">
        개인정보는 상담 목적으로만 활용되며 제3자에게 제공되지 않습니다
      </p>
    </form>
  );
}

export default function ConsultPage() {
  const [activeTab, setActiveTab] = useState('consult');
  const [checkList, setCheckList] = useState([]);

  const toggleCheck = (item) =>
    setCheckList((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);

  return (
    <div>
      {/* ── Page hero ── */}
      <div
        className="px-4 py-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #643e18 0%, #9e631a 100%)' }}
      >
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-white/5 pointer-events-none" />
        <p className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">전문가 무료 상담</p>
        <h2 className="text-white text-xl font-black mb-1">농지 고민, 지금 해결하세요</h2>
        <p className="text-amber-200 text-sm">농지처분 의무 · 신탁 · 귀농 전문 컨설팅</p>
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

      <div className="px-4 py-4">

        {/* ── 상담 신청 ── */}
        {activeTab === 'consult' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {TRUST_BADGES.map((item) => (
                <div key={item.label} className={`rounded-2xl border p-3 text-center ${item.color}`}>
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4">
              <p className="text-sm font-bold text-primary-800 mb-2.5">이런 분들께 도움드립니다</p>
              <ul className="space-y-2">
                {HELP_LIST.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-xs text-primary-700">
                    <svg className="w-3.5 h-3.5 text-primary-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <ConsultForm />
          </div>
        )}

        {/* ── 농지법 가이드 ── */}
        {activeTab === 'guide' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-1 font-medium">농지 취득·보유·처분에 관한 핵심 정보</p>
            {farmingGuide.map((item) => <AccordionItem key={item.id} item={item} />)}
            <div className="mt-2 bg-red-50 border border-red-100 rounded-2xl p-4">
              <p className="text-sm font-bold text-red-800 mb-1">⚠️ 주의사항</p>
              <p className="text-xs text-red-600 leading-relaxed">
                본 가이드는 일반적인 참고 정보이며 법적 효력이 없습니다. 구체적인 상담은 전문가에게 문의하세요.
              </p>
            </div>
          </div>
        )}

        {/* ── 귀농 정보 ── */}
        {activeTab === 'info' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 font-medium mb-1">귀농·귀촌 준비에 필요한 정보</p>

            {returnFarmingInfo.map((item) => (
              <div key={item.title} className="card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-slate-800">{item.title}</span>
                      <span className={`badge ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}

            <div className="card border-primary-100 bg-primary-50">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🌱</span>
                <p className="text-sm font-bold text-primary-800">귀농 준비 체크리스트</p>
                <span className="ml-auto text-xs text-primary-600 font-semibold">{checkList.length}/{CHECKLIST.length}</span>
              </div>
              <div className="space-y-2.5">
                {CHECKLIST.map((item) => {
                  const checked = checkList.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleCheck(item)}
                      className="w-full flex items-center gap-2.5 text-left"
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        checked ? 'bg-primary-600 border-primary-600' : 'border-primary-300'
                      }`}>
                        {checked && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs font-semibold ${checked ? 'text-primary-700 line-through' : 'text-primary-700'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
