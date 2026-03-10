import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MONTHLY_TRADES = [
  { month: '2024.01', 대지: 1820, 임야: 2340, 농지: 1560, 공장: 430 },
  { month: '2024.02', 대지: 1650, 임야: 2100, 농지: 1420, 공장: 390 },
  { month: '2024.03', 대지: 2100, 임야: 2780, 농지: 1880, 공장: 510 },
  { month: '2024.04', 대지: 2350, 임야: 3020, 농지: 2050, 공장: 580 },
  { month: '2024.05', 대지: 2580, 임야: 3250, 농지: 2240, 공장: 620 },
  { month: '2024.06', 대지: 2420, 임야: 3100, 농지: 2080, 공장: 590 },
  { month: '2024.07', 대지: 2680, 임야: 3380, 농지: 2310, 공장: 640 },
  { month: '2024.08', 대지: 2820, 임야: 3520, 농지: 2450, 공장: 680 },
  { month: '2024.09', 대지: 2750, 임야: 3420, 농지: 2380, 공장: 660 },
  { month: '2024.10', 대지: 2950, 임야: 3680, 농지: 2560, 공장: 710 },
  { month: '2024.11', 대지: 3150, 임야: 3900, 농지: 2720, 공장: 750 },
  { month: '2024.12', 대지: 2880, 임야: 3600, 농지: 2490, 공장: 690 },
];

const REGION_PRICES = [
  { region: '서울', avgPrice: 380, count: 3450 },
  { region: '경기', avgPrice: 85, count: 12800 },
  { region: '인천', avgPrice: 72, count: 4200 },
  { region: '부산', avgPrice: 95, count: 5600 },
  { region: '대구', avgPrice: 68, count: 3800 },
  { region: '대전', avgPrice: 62, count: 2900 },
  { region: '광주', avgPrice: 58, count: 2400 },
  { region: '강원', avgPrice: 12, count: 8900 },
  { region: '충북', avgPrice: 18, count: 6200 },
  { region: '충남', avgPrice: 22, count: 7800 },
  { region: '전북', avgPrice: 16, count: 5400 },
  { region: '전남', avgPrice: 14, count: 6100 },
  { region: '경북', avgPrice: 15, count: 7200 },
  { region: '경남', avgPrice: 25, count: 6800 },
  { region: '제주', avgPrice: 45, count: 2100 },
];

const TYPE_SHARE = [
  { name: '임야', value: 38, color: '#40916C' },
  { name: '대지', value: 28, color: '#1E6B3C' },
  { name: '농지', value: 24, color: '#F4A261' },
  { name: '공장부지', value: 10, color: '#6B7280' },
];

const PRICE_INDEX = [
  { year: '2020', index: 100 },
  { year: '2021', index: 112 },
  { year: '2022', index: 128 },
  { year: '2023', index: 118 },
  { year: '2024', index: 135 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs">
        <p className="font-semibold text-slate-700 mb-1">{label}</p>
        {payload.map((e, i) => <p key={i} style={{ color: e.color }}>{e.name}: {e.value.toLocaleString()}</p>)}
      </div>
    );
  }
  return null;
};

function Statistics() {
  const [activeType, setActiveType] = useState('전체');

  const totalTrades = MONTHLY_TRADES.reduce((sum, m) => sum + m.대지 + m.임야 + m.농지 + m.공장, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-20 max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">전국 토지 거래 통계</h1>
          <p className="text-sm text-slate-500 mt-1">국토교통부 토지 실거래가 기반 통계 (2024년)</p>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: '2024 총 거래량', value: `${(totalTrades / 10000).toFixed(1)}만건`, color: 'text-green-700' },
            { label: '전년 대비', value: '+8.2%', color: 'text-red-500' },
            { label: '전국 평균 ㎡당가', value: '58만원', color: 'text-blue-700' },
            { label: '가격지수', value: '135.2', color: 'text-amber-600' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 text-center">
              <div className={`text-xl font-bold mb-1 ${item.color}`}>{item.value}</div>
              <div className="text-xs text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* 월별 거래량 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-700 text-sm">월별 거래량</h2>
              <div className="flex gap-1">
                {['전체', '대지', '임야', '농지'].map((t) => (
                  <button key={t} type="button" onClick={() => setActiveType(t)}
                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${activeType === t ? 'bg-green-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_TRADES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 9 }} interval={2} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                {activeType === '전체' ? (
                  <>
                    <Bar dataKey="대지" stackId="a" fill="#1E6B3C" />
                    <Bar dataKey="임야" stackId="a" fill="#40916C" />
                    <Bar dataKey="농지" stackId="a" fill="#F4A261" />
                    <Bar dataKey="공장" stackId="a" fill="#6B7280" radius={[4, 4, 0, 0]} />
                  </>
                ) : (
                  <Bar dataKey={activeType} fill="#1E6B3C" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 지목별 비중 */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <h2 className="font-semibold text-slate-700 mb-4 text-sm">지목별 거래 비중</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie data={TYPE_SHARE} cx="50%" cy="50%" outerRadius={75} dataKey="value" label={({ value }) => `${value}%`} labelLine={false}>
                    {TYPE_SHARE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {TYPE_SHARE.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className="text-xs text-slate-600">{item.name} {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 가격 지수 추이 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 mb-4">
          <h2 className="font-semibold text-slate-700 mb-4 text-sm">전국 토지 가격지수 추이 (2020=100)</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={PRICE_INDEX}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis domain={[90, 150]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="index" name="가격지수" stroke="#1E6B3C" strokeWidth={3} dot={{ fill: '#1E6B3C', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 지역별 평균 가격 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <h2 className="font-semibold text-slate-700 mb-4 text-sm">지역별 평균 ㎡당 가격</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="px-4 py-3 text-left rounded-l-lg">지역</th>
                  <th className="px-4 py-3 text-right">평균 ㎡당가</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">거래건수</th>
                </tr>
              </thead>
              <tbody>
                {REGION_PRICES.sort((a, b) => b.avgPrice - a.avgPrice).map((r, i) => (
                  <tr key={r.region} className={`border-b border-slate-50 hover:bg-green-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                    <td className="px-4 py-3 font-medium text-slate-700">{r.region}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="bg-green-200 h-1.5 rounded-full" style={{ width: `${(r.avgPrice / 380) * 80}px`, minWidth: '4px' }} />
                        <span className="font-bold text-green-700">{r.avgPrice}만원</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-500">{r.count.toLocaleString()}건</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">※ 샘플 통계 데이터입니다. 실제 데이터는 국토교통부 API 연동 후 반영됩니다.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Statistics;
