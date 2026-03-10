import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Consultation() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: '', phone: '', address: location.state?.address || '',
    budget: '', type: '대지', inquiry: '', agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.agree) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="pt-14 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <div className="bg-white rounded-lg p-10 border border-slate-200 text-center max-w-md mx-4 shadow-sm">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">상담 신청 완료</h2>
            <p className="text-slate-500 text-sm mb-4">영업일 기준 1~2일 내에 전문 상담사가 연락드립니다.</p>
            <p className="text-xs text-slate-400">신청자: {form.name} ({form.phone})</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const inputClass = "w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-2xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">무료 대출 상담 신청</h1>
            <p className="text-sm text-slate-500">토지 담보대출 전문 상담사가 최적의 조건을 찾아드립니다</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { title: '최저금리 비교', desc: '20개 이상 금융사 비교' },
              { title: '신속 처리', desc: '영업일 1~2일 내 연락' },
              { title: '무료 서비스', desc: '수수료 일절 없음' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-4 text-center border border-slate-200">
                <div className="text-xs font-semibold text-slate-700 mb-0.5">{item.title}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">이름 <span className="text-red-400">*</span></label>
                <input type="text" value={form.name} onChange={(e) => up('name', e.target.value)} required
                  placeholder="홍길동" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">연락처 <span className="text-red-400">*</span></label>
                <input type="tel" value={form.phone} onChange={(e) => up('phone', e.target.value)} required
                  placeholder="010-0000-0000" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">토지 주소</label>
                <input type="text" value={form.address} onChange={(e) => up('address', e.target.value)}
                  placeholder="예: 경기도 용인시 처인구" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">대출 희망 금액</label>
                <input type="text" value={form.budget} onChange={(e) => up('budget', e.target.value)}
                  placeholder="예: 1억원" className={inputClass} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500 block mb-1.5">지목</label>
                <select value={form.type} onChange={(e) => up('type', e.target.value)} className={inputClass}>
                  {['대지', '임야', '농지', '공장부지'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label className="text-xs font-medium text-slate-500 block mb-1.5">문의 내용</label>
              <textarea value={form.inquiry} onChange={(e) => up('inquiry', e.target.value)} rows={4}
                placeholder="대출 목적, 현재 상황, 궁금한 사항 등을 자유롭게 적어주세요"
                className={`${inputClass} resize-none`} />
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-500 mb-5 cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={(e) => up('agree', e.target.checked)}
                className="rounded border-slate-300" />
              개인정보 수집·이용에 동의합니다 (필수)
            </label>
            <button type="submit" disabled={!form.agree}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-slate-200 disabled:text-slate-400 text-white py-3 rounded-lg font-medium text-sm transition-colors">
              무료 상담 신청하기
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Consultation;
