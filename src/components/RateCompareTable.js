import React from 'react';
import { calcMonthly, fmtShort } from '../utils/dsrCalculator';

const BANKS = [
  { name: 'KB국민은행', rate: 4.2, years: 20, type: '시중은행' },
  { name: '신한은행', rate: 4.35, years: 20, type: '시중은행' },
  { name: '우리은행', rate: 4.5, years: 20, type: '시중은행' },
  { name: 'NH농협은행', rate: 4.1, years: 20, type: '시중은행' },
  { name: 'IBK기업은행', rate: 4.0, years: 20, type: '정책금융' },
  { name: 'KDB산업은행', rate: 3.9, years: 25, type: '정책금융' },
  { name: 'SBI저축은행', rate: 6.5, years: 15, type: '저축은행' },
  { name: 'OK저축은행', rate: 7.0, years: 15, type: '저축은행' },
];

const TYPE_COLOR = {
  '시중은행': 'bg-blue-50 text-blue-700',
  '정책금융': 'bg-green-50 text-green-700',
  '저축은행': 'bg-orange-50 text-orange-700',
};

function RateCompareTable({ loanAmount = 300000000 }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
      <h2 className="text-lg font-bold text-green-800 mb-2">🏦 금리 비교</h2>
      <p className="text-xs text-gray-400 mb-5">대출금액: {fmtShort(loanAmount)} 기준 (2025년 참고용)</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-700 text-white">
              <th className="px-4 py-3 text-left rounded-l-xl">은행</th>
              <th className="px-4 py-3 text-center">구분</th>
              <th className="px-4 py-3 text-center">금리</th>
              <th className="px-4 py-3 text-center">기간</th>
              <th className="px-4 py-3 text-right rounded-r-xl">월 상환액</th>
            </tr>
          </thead>
          <tbody>
            {BANKS.map((bank, i) => {
              const monthly = calcMonthly(loanAmount, bank.rate, bank.years);
              return (
                <tr key={i} className={`border-b border-gray-50 hover:bg-green-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-4 py-3 font-medium text-gray-700">{bank.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${TYPE_COLOR[bank.type]}`}>{bank.type}</span>
                  </td>
                  <td className="px-4 py-3 text-center font-bold text-green-700">{bank.rate}%</td>
                  <td className="px-4 py-3 text-center text-gray-600">{bank.years}년</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-800">{fmtShort(monthly)}/월</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-3">※ 실제 금리는 신용등급, 담보물 등에 따라 다를 수 있습니다.</p>
    </div>
  );
}

export default RateCompareTable;
