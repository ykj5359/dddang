import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatWon } from '../utils/ltvCalculator';
import { calcMonthly, calcTotalInterest, fmtShort } from '../utils/dsrCalculator';

const SCENARIOS = [
  { label: '20년 / 4.5%', years: 20, rate: 4.5 },
  { label: '25년 / 4.0%', years: 25, rate: 4.0 },
  { label: '30년 / 3.8%', years: 30, rate: 3.8 },
];

const COLORS = ['#1E6B3C', '#86efac', '#d1fae5'];

function LoanResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ltvResult, address, price, type } = location.state || {};

  if (!ltvResult) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="pt-24 text-center">
          <p className="text-slate-500">대출 계산 결과가 없습니다.</p>
          <button type="button" onClick={() => navigate('/loan')} className="mt-4 text-green-700 border border-green-200 px-4 py-2 rounded-lg text-sm">계산기로 이동</button>
        </div>
        <Footer />
      </div>
    );
  }

  const loanAmt = ltvResult.loanAmt || 0;
  const landPrice = parseInt(String(price || '0').replace(/,/g, ''), 10);
  const selfFund = landPrice - loanAmt;

  const pieData = [
    { name: '대출금', value: loanAmt },
    { name: '자기자금', value: selfFund > 0 ? selfFund : 0 },
  ];

  const barData = SCENARIOS.map((s) => {
    const monthly = calcMonthly(loanAmt, s.rate, s.years);
    const totalInterest = calcTotalInterest(loanAmt, monthly, s.years);
    return { name: s.label, monthly, totalInterest, loanAmt };
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 max-w-4xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-3 mb-6 no-print">
          <button type="button" onClick={() => navigate(-1)} className="text-slate-500 hover:text-slate-700 text-sm font-medium">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            뒤로
          </button>
          <h1 className="text-xl font-bold text-slate-900">대출 결과</h1>
          <button type="button" onClick={() => window.print()} className="ml-auto text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50">
            인쇄
          </button>
        </div>

        {address && (
          <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 mb-5 text-sm text-slate-600 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {address} | 지목: {type}
          </div>
        )}

        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: '대출 가능액', value: formatWon(loanAmt), cls: 'text-green-700 bg-green-50 border-green-200' },
            { label: 'LTV', value: `${ltvResult.finalLtv}%`, cls: 'text-blue-700 bg-blue-50 border-blue-200' },
            { label: '자기자금', value: formatWon(selfFund > 0 ? selfFund : 0), cls: 'text-amber-700 bg-amber-50 border-amber-200' },
            { label: '토지 매매가', value: fmtShort(landPrice), cls: 'text-slate-700 bg-slate-50 border-slate-200' },
          ].map((item) => (
            <div key={item.label} className={`rounded-xl p-4 text-center border ${item.cls}`}>
              <div className="text-xs text-slate-500 mb-1">{item.label}</div>
              <div className="text-base font-bold">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* 파이 차트 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <h2 className="font-semibold text-slate-700 mb-4 text-sm">자금 구성</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`} labelLine={false}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => [fmtShort(v), '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 시나리오 월 상환액 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <h2 className="font-semibold text-slate-700 mb-4 text-sm">상환 시나리오</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => fmtShort(v)} />
                <Tooltip formatter={(v) => [fmtShort(v), '월 상환액']} />
                <Bar dataKey="monthly" name="월 상환액" fill="#1E6B3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 상세 시나리오 테이블 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 mb-5">
          <h2 className="font-semibold text-slate-700 mb-4 text-sm">상환 시나리오 상세</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="px-4 py-3 text-left rounded-l-lg">조건</th>
                  <th className="px-4 py-3 text-right">월 상환액</th>
                  <th className="px-4 py-3 text-right">총 이자</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">총 상환액</th>
                </tr>
              </thead>
              <tbody>
                {barData.map((row, i) => {
                  const total = row.monthly * parseInt(SCENARIOS[i].years) * 12;
                  return (
                    <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="px-4 py-3 font-medium text-slate-700">{row.name}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{fmtShort(row.monthly)}/월</td>
                      <td className="px-4 py-3 text-right text-amber-600">{fmtShort(row.totalInterest)}</td>
                      <td className="px-4 py-3 text-right text-slate-700">{fmtShort(total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 no-print">
          <button type="button" onClick={() => navigate('/consultation')}
            className="bg-white hover:bg-slate-50 text-green-700 py-3.5 rounded-lg font-semibold text-sm border border-green-200 transition-colors">
            전문가 상담
          </button>
          <button type="button" onClick={() => navigate('/')}
            className="bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold text-sm transition-colors">
            지도로 돌아가기
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6 text-center">※ 본 계산 결과는 참고용이며, 실제 대출 조건은 금융기관에 따라 다를 수 있습니다.</p>
      </main>
      <Footer />
    </div>
  );
}

export default LoanResult;
