import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LTVCalculator from '../components/LTVCalculator';
import DSRCalculator from '../components/DSRCalculator';
import RateCompareTable from '../components/RateCompareTable';

const SECTIONS = [
  { key: 'ltv', label: 'LTV 계산' },
  { key: 'dsr', label: 'DSR·DTI 계산' },
  { key: 'bank', label: '금리 비교' },
];

function LoanCalculator() {
  const location = useLocation();
  const navigate = useNavigate();
  const [ltvResult, setLtvResult] = useState(null);
  const [activeSection, setActiveSection] = useState('ltv');

  const rawPrice = location.state?.price;
  const initialPrice = rawPrice
    ? Math.round(parseInt(String(rawPrice).replace(/,/g, ''), 10) / 10000).toString()
    : '';
  const initialType = location.state?.type || '대지';
  const address = location.state?.address || '';

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-14">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <button type="button" onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-green-700 transition-colors mb-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              뒤로
            </button>
            <h1 className="text-xl font-bold text-slate-900">토지 대출 계산기</h1>
            <p className="text-sm text-slate-500 mt-0.5">LTV·DSR·DTI 계산 및 금융사별 금리 비교</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {address && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-5 text-sm text-green-700 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span><strong>{address}</strong> 기준으로 계산합니다</span>
            </div>
          )}

          {/* 탭 */}
          <div className="flex border-b border-slate-200 mb-6">
            {SECTIONS.map((s) => (
              <button key={s.key} type="button" onClick={() => setActiveSection(s.key)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-all -mb-px ${
                  activeSection === s.key
                    ? 'border-green-700 text-green-700'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}>
                {s.label}
              </button>
            ))}
          </div>

          {activeSection === 'ltv' && (
            <LTVCalculator
              initialPrice={initialPrice}
              initialType={initialType}
              onResult={(r) => setLtvResult(r)}
            />
          )}

          {activeSection === 'dsr' && (
            <DSRCalculator loanAmount={ltvResult?.loanAmt || 0} />
          )}

          {activeSection === 'bank' && (
            <RateCompareTable loanAmount={ltvResult?.loanAmt || 300000000} />
          )}

          {ltvResult && (
            <div className="mt-6">
              <button type="button"
                onClick={() => navigate('/loan/result', {
                  state: { ltvResult, address, price: rawPrice, type: initialType }
                })}
                className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-medium text-sm transition-colors">
                상세 대출 결과 보기
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LoanCalculator;
