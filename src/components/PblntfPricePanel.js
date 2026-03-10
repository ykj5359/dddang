import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSamplePblntfData } from '../api/vworldApi';

function PblntfPricePanel({ address, area, currentPrice }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(getSamplePblntfData(parseInt(String(currentPrice).replace(/,/g, ''), 10)));
      setLoading(false);
    }, 600);
  }, [currentPrice]);

  const latestYear = data[0];
  const prevYear = data[1];
  const changeRate = latestYear && prevYear && prevYear.pblntfPclnd > 0
    ? Math.round(((latestYear.pblntfPclnd - prevYear.pblntfPclnd) / prevYear.pblntfPclnd) * 1000) / 10
    : 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
      <h2 className="text-lg font-bold text-green-800 mb-5">🏛️ 개별공시지가 추이</h2>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">2024 공시지가</div>
              <div className="text-sm font-bold text-green-700">{latestYear?.pblntfPclnd?.toLocaleString()}만원</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">전년 대비</div>
              <div className={`text-sm font-bold ${changeRate >= 0 ? 'text-red-500' : 'text-blue-500'}`}>
                {changeRate >= 0 ? '+' : ''}{changeRate}%
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">면적</div>
              <div className="text-sm font-bold text-gray-700">{area}</div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={[...data].reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stdrYear" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${Math.round(v / 100) / 10}천`} />
              <Tooltip formatter={(v) => [`${v?.toLocaleString()}만원`, '공시지가']} />
              <Bar dataKey="pblntfPclnd" name="공시지가" fill="#40916C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <p className="text-xs text-gray-400 mt-3">※ 샘플 데이터입니다. VWorld API 연동 시 실제 공시지가가 표시됩니다.</p>
        </>
      )}
    </div>
  );
}

export default PblntfPricePanel;
