import React, { useState, useMemo } from 'react';
import { calcMonthly, calcDSR, calcDTI, fmtShort } from '../utils/dsrCalculator';

function DSRCalculator({ loanAmount = 0 }) {
  const [form, setForm] = useState({
    income: '',
    loanAmt: loanAmount ? Math.round(loanAmount / 10000).toString() : '',
    rate: '4.5',
    years: '20',
    otherDebt: '',
  });
  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const result = useMemo(() => {
    const income = parseInt(form.income.replace(/,/g, ''), 10) * 10000;
    const loan = parseInt(form.loanAmt.replace(/,/g, ''), 10) * 10000;
    const rate = parseFloat(form.rate);
    const years = parseInt(form.years, 10);
    const other = parseInt(form.otherDebt.replace(/,/g, '') || '0', 10) * 10000;
    if (!income || !loan || !rate || !years) return null;
    const monthly = calcMonthly(loan, rate, years);
    const dsr = calcDSR(income, monthly);
    const dti = calcDTI(income, monthly, other);
    return { monthly, dsr, dti, income, loan };
  }, [form]);

  const statusColor = (val, limit) => {
    if (val <= limit * 0.7) return 'text-green-600';
    if (val <= limit) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
      <h2 className="text-lg font-bold text-green-800 mb-5">📊 DSR·DTI 계산</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {[
          { key: 'income', label: '연소득 (만원)', ph: '예: 5,000' },
          { key: 'loanAmt', label: '대출금액 (만원)', ph: '예: 30,000' },
          { key: 'rate', label: '금리 (%)', ph: '예: 4.5' },
          { key: 'years', label: '대출기간 (년)', ph: '예: 20' },
          { key: 'otherDebt', label: '기타대출 연상환액 (만원)', ph: '없으면 0' },
        ].map(({ key, label, ph }) => (
          <div key={key}>
            <label className="text-xs text-gray-500 block mb-1">{label}</label>
            <input type="text" value={form[key]} onChange={(e) => up(key, e.target.value)}
              placeholder={ph}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-green-400" />
          </div>
        ))}
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
            <div className="text-xs text-gray-500 mb-1">월 상환액</div>
            <div className="text-xl font-bold text-blue-700">{fmtShort(result.monthly)}</div>
            <div className="text-xs text-gray-400">원/월</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
            <div className="text-xs text-gray-500 mb-1">DSR</div>
            <div className={`text-xl font-bold ${statusColor(result.dsr, 40)}`}>{result.dsr}%</div>
            <div className="text-xs text-gray-400">기준 40%</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
            <div className="text-xs text-gray-500 mb-1">DTI</div>
            <div className={`text-xl font-bold ${statusColor(result.dti, 60)}`}>{result.dti}%</div>
            <div className="text-xs text-gray-400">기준 60%</div>
          </div>
          {result.dsr > 40 && (
            <div className="col-span-3 bg-red-50 rounded-xl p-3 text-sm text-red-600 border border-red-100">
              ⚠️ DSR {result.dsr}%로 금융규제 기준(40%)을 초과합니다. 대출 한도 조정이 필요할 수 있습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DSRCalculator;
