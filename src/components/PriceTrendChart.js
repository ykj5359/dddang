import React, { useMemo, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-green-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-bold text-green-800 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }} className="font-medium">
            {entry.name}: {parseInt(entry.value, 10).toLocaleString()}만원
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function PriceTrendChart({ address = '', landType = '대지', currentPrice = 0 }) {
  const [chartType, setChartType] = useState('line');
  const [period, setPeriod] = useState('1년');

  const periodMap = { '6개월': 6, '1년': 12, '2년': 24, '3년': 36 };

  const chartData = useMemo(() => {
    const months = periodMap[period];
    const base = currentPrice > 0 ? Number(currentPrice) / 10000 : 9800;
    const data = [];
    const now = new Date();
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      const label = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
      const fluctuation = (Math.random() - 0.48) * (base * 0.06);
      const price = Math.max(base * 0.7, base + (fluctuation * (months - i)) / months);
      data.push({
        month: label,
        price: Math.round(price),
        avgPrice: Math.round(price * (0.92 + Math.random() * 0.08)),
        count: Math.floor(Math.random() * 8) + 2,
      });
    }
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrice, period]);

  const latestPrice = chartData[chartData.length - 1]?.price || 0;
  const firstPrice = chartData[0]?.price || 0;
  const changeRate = firstPrice > 0 ? Math.round(((latestPrice - firstPrice) / firstPrice) * 1000) / 10 : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-green-800">📈 가격 트렌드</h2>
        <div className="flex gap-1">
          {Object.keys(periodMap).map((p) => (
            <button key={p} type="button" onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-medium ${period === p ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* 요약 */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-green-50 rounded-xl p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">현재가</div>
          <div className="text-sm font-bold text-green-700">{latestPrice.toLocaleString()}만</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">변동률</div>
          <div className={`text-sm font-bold ${changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
            {changeRate >= 0 ? '+' : ''}{changeRate}%
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xs text-gray-500 mb-1">지목</div>
          <div className="text-sm font-bold text-gray-700">{landType}</div>
        </div>
      </div>

      {/* 차트 타입 토글 */}
      <div className="flex gap-2 mb-4">
        {['line', 'bar'].map((t) => (
          <button key={t} type="button" onClick={() => setChartType(t)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border ${chartType === t ? 'bg-green-700 text-white border-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'}`}>
            {t === 'line' ? '📈 라인' : '📊 바'}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={Math.floor(chartData.length / 6)} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 100) / 10}천`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine y={firstPrice} stroke="#94a3b8" strokeDasharray="4 4" />
            <Line type="monotone" dataKey="price" name="실거래가" stroke="#1E6B3C" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="avgPrice" name="주변평균" stroke="#40916C" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 10 }} interval={Math.floor(chartData.length / 6)} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 100) / 10}천`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="price" name="실거래가" fill="#1E6B3C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="avgPrice" name="주변평균" fill="#86efac" radius={[4, 4, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>

      <p className="text-xs text-gray-400 mt-3">※ 샘플 데이터입니다. 실제 데이터는 API 연동 후 반영됩니다.</p>
    </div>
  );
}

export default PriceTrendChart;
