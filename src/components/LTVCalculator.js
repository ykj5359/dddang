import React, { useState, useMemo, useEffect } from 'react';
import { calculateAllBankLTV, formatWon, LTV_TABLE, ZONING_ADJUST, ROAD_ADJUST, SHAPE_ADJUST, SLOPE_ADJUST } from '../utils/ltvCalculator';

function LTVCalculator({ initialPrice = '', initialType = '대지', onResult }) {
  const [form, setForm] = useState({
    landPrice: initialPrice,
    landType: initialType,
    region: '수도권',
    zoning: '',
    road: '',
    shape: '',
    slope: '',
  });
  const [showDetail, setShowDetail] = useState(false);
  const up = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const allResult = useMemo(() => {
    if (!form.landPrice) return null;
    const raw = form.landPrice.replace(/,/g, '');
    const price = parseInt(raw, 10) * 10000;
    if (!price) return null;
    return calculateAllBankLTV({ ...form, landPrice: price });
  }, [form]);

  useEffect(() => {
    if (onResult && allResult?.bank) onResult(allResult.bank);
  }, [allResult, onResult]);

  const bankLabels = {
    bank: { label: '시중은행', icon: '🏦', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    saving: { label: '저축은행', icon: '💳', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    policy: { label: '정책금융', icon: '🏛️', color: 'bg-green-50 border-green-200 text-green-700' },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
      <h2 className="text-lg font-bold text-green-800 mb-5">📌 LTV 대출한도 계산</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">토지 매매가 (만원)</label>
          <input type="text" value={form.landPrice} onChange={(e) => up('landPrice', e.target.value.replace(/[^0-9,]/g, ''))}
            placeholder="예: 50,000"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">지목</label>
          <select value={form.landType} onChange={(e) => up('landType', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400">
            {Object.keys(LTV_TABLE).map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">지역</label>
          <select value={form.region} onChange={(e) => up('region', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400">
            {['수도권', '광역시', '기타'].map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <button type="button" onClick={() => setShowDetail(!showDetail)}
            className="w-full mt-5 text-xs text-green-700 border border-green-200 rounded-xl py-2.5 hover:bg-green-50">
            {showDetail ? '▲ 상세 보정 숨기기' : '▼ 상세 보정 입력 (선택)'}
          </button>
        </div>
      </div>

      {showDetail && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-4 bg-gray-50 rounded-xl">
          {[
            { key: 'zoning', label: '용도지역', opts: Object.keys(ZONING_ADJUST) },
            { key: 'road', label: '도로 접면', opts: Object.keys(ROAD_ADJUST) },
            { key: 'shape', label: '토지 형상', opts: Object.keys(SHAPE_ADJUST) },
            { key: 'slope', label: '지세', opts: Object.keys(SLOPE_ADJUST) },
          ].map(({ key, label, opts }) => (
            <div key={key}>
              <label className="text-xs text-gray-500 block mb-1">{label}</label>
              <select value={form[key]} onChange={(e) => up(key, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none">
                <option value="">선택</option>
                {opts.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {allResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          {Object.entries(bankLabels).map(([key, info]) => {
            const r = allResult[key];
            return (
              <div key={key} className={`rounded-xl p-4 border ${info.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span>{info.icon}</span>
                  <span className="font-bold text-sm">{info.label}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{r.finalLtv}%</div>
                <div className="text-xs opacity-75 mb-2">기준 {r.base}% {r.adj !== 0 ? `(보정 ${r.adj > 0 ? '+' : ''}${r.adj}%)` : ''}</div>
                <div className="font-bold text-base">{formatWon(r.loanAmt)}</div>
                <div className="text-xs opacity-60">대출 가능 금액</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LTVCalculator;
