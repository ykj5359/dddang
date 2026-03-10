import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';

const DISPOSAL_CHECKS = [
  { id: 1, question: '취득 후 1년 이내에 직접 농업경영을 시작했나요?', type: 'yn' },
  { id: 2, question: '현재 해당 농지 소재지에 거주하고 계신가요?', type: 'yn' },
  { id: 3, question: '연간 90일 이상 직접 농업에 종사하고 있나요?', type: 'yn' },
  { id: 4, question: '해당 농지에서 발생하는 농산물 판매액이 연 120만원 이상인가요?', type: 'yn' },
  { id: 5, question: '농지처분 의무 통보를 받은 적이 있나요?', type: 'yn' },
];

const MY_LANDS_SAMPLE = [
  {
    id: 1,
    address: '충청남도 공주시 탄천면 화봉리 245',
    area: '2640㎡',
    type: '논(답)',
    pnu: '4412510200100020000',
    acquired: '2019-03-15',
    status: 'warning',
    statusLabel: '처분의무 검토 필요',
    trust: false,
  },
  {
    id: 2,
    address: '전라북도 완주군 소양면 신촌리 88',
    area: '1650㎡',
    type: '밭(전)',
    pnu: '4511325300100080000',
    acquired: '2021-08-20',
    status: 'ok',
    statusLabel: '신탁 관리중',
    trust: true,
    trustExpiry: '2027-08-20',
  },
];

const STATUS_INFO = {
  ok:      { color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  warning: { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  danger:  { color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
};

function MyLand() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('내 농지');
  const [checkAnswers, setCheckAnswers] = useState({});
  const [checkResult, setCheckResult] = useState(null);
  const [trustForm, setTrustForm] = useState({ address: '', area: '', type: '논(답)', phone: '', detail: '' });
  const [trustSubmitted, setTrustSubmitted] = useState(false);
  const [registerForm, setRegisterForm] = useState({ address: '', area: '', type: '논(답)', acquired: '' });

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
        <Header />
        <main className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-slate-500 mb-4">로그인이 필요합니다</p>
            <button type="button" onClick={() => navigate('/login')}
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-sm">로그인하기</button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const runDisposalCheck = () => {
    const answered = Object.keys(checkAnswers).length;
    if (answered < DISPOSAL_CHECKS.length) {
      alert('모든 항목에 답변해주세요.');
      return;
    }
    const noticeReceived = checkAnswers['5'] === 'yes';
    const noCount = Object.entries(checkAnswers).filter(([k, v]) => k !== '5' && v === 'no').length;
    if (noticeReceived || noCount >= 3) {
      setCheckResult('danger');
    } else if (noCount >= 1) {
      setCheckResult('warning');
    } else {
      setCheckResult('safe');
    }
  };

  const handleTrustSubmit = (e) => {
    e.preventDefault();
    setTrustSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
      <Header />

      <div className="pt-16 bg-green-800 text-white px-4 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-bold mb-0.5">내 토지 관리</h1>
          <p className="text-sm text-green-200">농지 현황 조회 · 처분의무 체크 · 농지신탁 신청</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* 탭 */}
        <div className="flex bg-white border-b border-slate-200 sticky top-16 z-30">
          {['내 농지', '처분의무 체크', '신탁 신청'].map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab ? 'border-green-600 text-green-700' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 내 농지 탭 */}
        {activeTab === '내 농지' && (
          <div className="py-4 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm font-semibold text-red-700">2025년 경자유전 집행 강화</p>
              <p className="text-xs text-red-600 mt-0.5">비경작 농지 보유자에게 이행강제금이 부과됩니다. 아래 내 농지 현황을 확인하세요.</p>
            </div>

            {MY_LANDS_SAMPLE.map((land) => {
              const si = STATUS_INFO[land.status];
              return (
                <div key={land.id} className={`bg-white rounded-xl p-5 shadow-sm border-2 ${si.border}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">{land.type}</span>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${si.bg} ${si.color}`}>
                          {land.statusLabel}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{land.address}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{land.area} · 취득일: {land.acquired}</p>
                    </div>
                  </div>

                  {land.trust && (
                    <div className="bg-green-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-green-700 font-medium">농지신탁 관리중 (만료: {land.trustExpiry})</p>
                      <p className="text-xs text-green-600 mt-0.5">귀농인 임대차 진행 중 · 합법적 처분의무 면제</p>
                    </div>
                  )}

                  {land.status === 'warning' && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-3">
                      <p className="text-xs text-orange-700 font-medium">처분의무 체크가 필요한 농지입니다.</p>
                      <p className="text-xs text-orange-600 mt-0.5">농지신탁을 통해 합법적으로 관리하거나 귀농인에게 임대하세요.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setActiveTab('처분의무 체크')}
                      className="text-xs border border-orange-200 text-orange-700 py-2 rounded-lg hover:bg-orange-50 font-medium transition-colors">
                      처분의무 체크
                    </button>
                    <button type="button" onClick={() => setActiveTab('신탁 신청')}
                      className="text-xs bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 font-medium transition-colors">
                      신탁 신청하기
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">농지 등록</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="col-span-2">
                  <label className="text-xs text-slate-500 block mb-1">주소</label>
                  <input type="text" value={registerForm.address} onChange={(e) => setRegisterForm((p) => ({ ...p, address: e.target.value }))}
                    placeholder="예: 충청남도 공주시 탄천면"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">면적(㎡)</label>
                  <input type="number" value={registerForm.area} onChange={(e) => setRegisterForm((p) => ({ ...p, area: e.target.value }))}
                    placeholder="예: 2000"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">지목</label>
                  <select value={registerForm.type} onChange={(e) => setRegisterForm((p) => ({ ...p, type: e.target.value }))}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-500">
                    {['논(답)', '밭(전)', '과수원', '임야', '대지'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <button type="button" onClick={() => alert('내 농지가 등록되었습니다.')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium transition-colors">
                등록하기
              </button>
            </div>
          </div>
        )}

        {/* 처분의무 체크 탭 */}
        {activeTab === '처분의무 체크' && (
          <div className="py-4 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-1 text-sm">농지처분 의무 자가진단</h2>
              <p className="text-xs text-slate-400 mb-5">아래 질문에 답변하면 처분의무 해당 여부를 즉시 확인할 수 있습니다.</p>

              <div className="space-y-4">
                {DISPOSAL_CHECKS.map((check) => (
                  <div key={check.id} className="border border-slate-100 rounded-xl p-4">
                    <p className="text-sm text-slate-700 mb-3 font-medium">Q{check.id}. {check.question}</p>
                    <div className="flex gap-3">
                      {[{ val: 'yes', label: '예' }, { val: 'no', label: '아니오' }].map(({ val, label }) => (
                        <button key={val} type="button"
                          onClick={() => setCheckAnswers((p) => ({ ...p, [check.id]: val }))}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                            checkAnswers[check.id] === val
                              ? val === 'yes' ? 'bg-green-700 text-white border-green-700' : 'bg-red-500 text-white border-red-500'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" onClick={runDisposalCheck}
                className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
                진단 결과 확인
              </button>
            </div>

            {checkResult && (
              <div className={`rounded-xl p-5 border-2 ${
                checkResult === 'safe' ? 'bg-green-50 border-green-300' :
                checkResult === 'warning' ? 'bg-orange-50 border-orange-300' :
                'bg-red-50 border-red-300'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                  checkResult === 'safe' ? 'bg-green-200' : checkResult === 'warning' ? 'bg-orange-200' : 'bg-red-200'
                }`}>
                  {checkResult === 'safe' ? (
                    <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className={`w-5 h-5 ${checkResult === 'warning' ? 'text-orange-700' : 'text-red-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <h3 className={`font-bold text-base mb-2 ${
                  checkResult === 'safe' ? 'text-green-800' :
                  checkResult === 'warning' ? 'text-orange-800' : 'text-red-800'
                }`}>
                  {checkResult === 'safe' ? '현재는 처분의무 해당 없음' :
                   checkResult === 'warning' ? '일부 요건 미충족 — 주의 필요' :
                   '처분의무 해당 가능성 높음 — 즉시 조치 필요'}
                </h3>
                <p className={`text-sm mb-4 ${
                  checkResult === 'safe' ? 'text-green-700' :
                  checkResult === 'warning' ? 'text-orange-700' : 'text-red-700'
                }`}>
                  {checkResult === 'safe'
                    ? '현재 요건을 충족하고 있습니다. 계속해서 직접 경작 요건을 유지하세요.'
                    : checkResult === 'warning'
                    ? '일부 요건이 충족되지 않았습니다. 농지신탁이나 합법적 임대를 통해 처분의무를 피하는 방법을 검토하세요.'
                    : '처분의무 통보 또는 비경작 요건 미충족으로 이행강제금 부과 대상이 될 수 있습니다. 지금 바로 전문가 상담을 받으세요.'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setActiveTab('신탁 신청')}
                    className="bg-green-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors">
                    농지신탁 신청
                  </button>
                  <button type="button" onClick={() => navigate('/farmland-consult')}
                    className="bg-white text-green-700 py-2.5 rounded-lg text-sm font-semibold border border-green-200 hover:bg-green-50 transition-colors">
                    전문가 상담
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 신탁 신청 탭 */}
        {activeTab === '신탁 신청' && (
          <div className="py-4 space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-3 text-sm">농지신탁이란?</h2>
              <div className="space-y-2">
                {[
                  '직접 경작 어려운 농지를 신탁회사에 위탁 관리',
                  '신탁 기간 중 처분 의무 면제 (합법적 임대 가능)',
                  '귀농·귀촌 희망자에게 임대해 수익 창출',
                  '신탁회사가 임차인 모집·계약·수익 배분 대행',
                  '향후 직접 경작 희망 시 신탁 해지 가능',
                ].map((text) => (
                  <div key={text} className="flex gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h2 className="font-semibold text-slate-800 mb-4 text-sm">신탁 진행 절차</h2>
              <div className="space-y-3">
                {[
                  { step: '1', title: '신청서 제출', desc: '아래 양식 작성 후 제출' },
                  { step: '2', title: '농지 실사', desc: '담당자 현장 방문 및 서류 검토 (3~5일)' },
                  { step: '3', title: '신탁 계약', desc: '신탁 계약서 작성 및 등기 (1~2주)' },
                  { step: '4', title: '임차인 모집', desc: '귀농 희망자 매칭 및 임대차 계약 (2~4주)' },
                  { step: '5', title: '수익 배분', desc: '매월 임대료 수익 정산 및 입금' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3 items-start">
                    <div className="w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</div>
                    <div className="flex-1 bg-slate-50 rounded-lg px-3 py-2">
                      <span className="text-sm font-semibold text-slate-700">{s.title}</span>
                      <span className="text-xs text-slate-400 ml-2">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {trustSubmitted ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-green-800 mb-2">신탁 신청 완료!</h2>
                <p className="text-sm text-slate-500">담당자가 3~5일 내 연락드려 현장 실사 일정을 안내합니다.</p>
              </div>
            ) : (
              <form onSubmit={handleTrustSubmit} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-semibold text-slate-800 text-sm">농지신탁 신청서</h2>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">농지 주소 *</label>
                  <input type="text" value={trustForm.address} onChange={(e) => setTrustForm((p) => ({ ...p, address: e.target.value }))} required
                    placeholder="예: 충청남도 공주시 탄천면 화봉리"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">면적(㎡) *</label>
                    <input type="number" value={trustForm.area} onChange={(e) => setTrustForm((p) => ({ ...p, area: e.target.value }))} required
                      placeholder="예: 3300"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 block mb-1">지목 *</label>
                    <select value={trustForm.type} onChange={(e) => setTrustForm((p) => ({ ...p, type: e.target.value }))}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500">
                      {['논(답)', '밭(전)', '과수원', '임야'].map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-slate-500 block mb-1">연락처 *</label>
                    <input type="tel" value={trustForm.phone} onChange={(e) => setTrustForm((p) => ({ ...p, phone: e.target.value }))} required
                      placeholder="010-0000-0000"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500 block mb-1">현황 및 요청사항</label>
                  <textarea value={trustForm.detail} onChange={(e) => setTrustForm((p) => ({ ...p, detail: e.target.value }))} rows={3}
                    placeholder="현재 경작 현황, 신탁 희망 기간, 기타 요청사항"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-500 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
                  농지신탁 신청하기
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

export default MyLand;
