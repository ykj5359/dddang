import { useState } from 'react';
import { farmingGuide } from '../data/dummyData';

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-900">{item.title}</span>
        <span className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-sm text-gray-700 leading-relaxed">{item.content}</p>
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
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="text-5xl mb-4 block">📞</span>
        <p className="font-bold text-gray-900 mb-2">상담 신청이 완료되었습니다</p>
        <p className="text-sm text-gray-500 mb-1">영업일 기준 1~2일 내 연락드립니다</p>
        <p className="text-sm font-medium text-primary-600">{form.phone}</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 border border-gray-300 text-gray-600 px-5 py-2.5 rounded-xl text-sm hover:bg-gray-50">
          다시 신청
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">성함 *</label>
        <input
          required
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="홍길동"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">연락처 *</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="010-0000-0000"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">상담 유형</label>
        <select
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 bg-white"
        >
          <option value="처분의무">농지 처분 의무 해소</option>
          <option value="신탁">농지신탁 문의</option>
          <option value="임대">농지 임대 방법</option>
          <option value="귀농">귀농 준비 상담</option>
          <option value="매매">농지 매매 상담</option>
          <option value="기타">기타</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1.5">문의 내용</label>
        <textarea
          value={form.memo}
          onChange={(e) => setForm({ ...form, memo: e.target.value })}
          placeholder="보유 토지 위치, 면적, 문의 사항 등을 적어주세요"
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-400 resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
      >
        무료 상담 신청하기
      </button>
      <p className="text-xs text-gray-400 text-center">
        개인정보는 상담 목적으로만 활용되며 제3자에게 제공되지 않습니다
      </p>
    </form>
  );
}

export default function ConsultPage() {
  const [activeTab, setActiveTab] = useState('consult');

  const tabs = [
    { id: 'consult', label: '상담 신청' },
    { id: 'guide', label: '농지법 가이드' },
    { id: 'info', label: '귀농 정보' },
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-earth-600 to-earth-800 px-4 py-6">
        <p className="text-earth-200 text-sm mb-1">전문가 무료 상담</p>
        <h2 className="text-white text-xl font-bold mb-2">농지 고민, 지금 해결하세요</h2>
        <p className="text-earth-200 text-sm">농지처분 의무 · 신탁 · 귀농 전문 컨설팅</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-30">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 mt-4">
        {activeTab === 'consult' && (
          <div className="space-y-4">
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '⚡', label: '빠른 응답', desc: '1~2일 이내' },
                { icon: '🔒', label: '100% 무료', desc: '초기 상담' },
                { icon: '👨‍💼', label: '전문가 상담', desc: '농지 전문' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-3 text-center shadow-sm">
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-bold text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* What we help with */}
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
              <p className="text-sm font-bold text-primary-800 mb-2">이런 분들께 도움드립니다</p>
              <ul className="space-y-1.5">
                {[
                  '농지 처분 의무 통보를 받으셨나요?',
                  '타지 거주자인데 농지를 보유 중이신가요?',
                  '귀농하려는데 적합한 농지를 찾고 계신가요?',
                  '농지신탁 절차가 궁금하신가요?',
                  '농지 매각 또는 임대를 원하시나요?',
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2 text-xs text-primary-700">
                    <span className="text-primary-500 mt-0.5">✓</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <ConsultForm />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">농지 취득·보유·처분에 관한 핵심 정보</p>
            {farmingGuide.map((item) => (
              <AccordionItem key={item.id} item={item} />
            ))}

            <div className="mt-4 bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-sm font-bold text-red-800 mb-1">⚠️ 주의사항</p>
              <p className="text-xs text-red-700 leading-relaxed">
                본 가이드는 일반적인 참고 정보이며 법적 효력이 없습니다.
                구체적인 상담은 전문가에게 문의하세요.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">귀농·귀촌 준비에 필요한 정보</p>

            {[
              {
                icon: '🌾',
                title: '귀농귀촌종합센터',
                desc: '귀농·귀촌 교육, 컨설팅, 지원사업 안내',
                badge: '공식',
                badgeColor: 'bg-green-100 text-green-700',
              },
              {
                icon: '💰',
                title: '귀농인 주택구입 대출',
                desc: '최대 7,500만원 저금리 대출 지원',
                badge: '금융',
                badgeColor: 'bg-blue-100 text-blue-700',
              },
              {
                icon: '📚',
                title: '귀농귀촌 교육 과정',
                desc: '농업 기초부터 전문 기술까지 무료 교육',
                badge: '교육',
                badgeColor: 'bg-purple-100 text-purple-700',
              },
              {
                icon: '🏠',
                title: '농촌 빈집 활용 지원',
                desc: '빈집 정보 제공 및 리모델링 지원',
                badge: '주거',
                badgeColor: 'bg-yellow-100 text-yellow-700',
              },
              {
                icon: '🌱',
                title: '스마트팜 청년 창업',
                desc: '스마트팜 기술 교육 및 창업 지원',
                badge: '창업',
                badgeColor: 'bg-teal-100 text-teal-700',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${item.badgeColor}`}>{item.badge}</span>
                    </div>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                  <span className="text-gray-300 text-sm">→</span>
                </div>
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 mt-2">
              <p className="text-sm font-bold text-primary-800 mb-1">🌱 귀농 준비 체크리스트</p>
              <div className="space-y-2 mt-2">
                {[
                  '귀농 교육 이수 (농업경영교육)',
                  '농업경영계획서 작성',
                  '농지취득자격증명 신청',
                  '귀농 지원 사업 신청',
                  '주거지 및 농지 확보',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded border border-primary-300 flex items-center justify-center">
                      <span className="text-xs text-primary-500">✓</span>
                    </div>
                    <span className="text-xs text-primary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
