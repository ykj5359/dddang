import React from 'react';
import { useNavigate } from 'react-router-dom';

const TYPE_STYLE = {
  대지: 'bg-blue-50 text-blue-700 border-blue-200',
  임야: 'bg-green-50 text-green-700 border-green-200',
  농지: 'bg-amber-50 text-amber-700 border-amber-200',
  공장: 'bg-slate-100 text-slate-600 border-slate-200',
  '공장부지': 'bg-slate-100 text-slate-600 border-slate-200',
};

function LandCard({ land }) {
  const navigate = useNavigate();
  const price = parseInt(String(land.price).replace(/,/g, ''), 10);
  const priceStr = price >= 100000000
    ? `${Math.floor(price / 100000000)}억 ${Math.floor((price % 100000000) / 10000).toLocaleString()}만원`
    : `${Math.floor(price / 10000).toLocaleString()}만원`;

  const area = parseFloat(String(land.area).replace(/[^0-9.]/g, ''));
  const pyeong = area ? `약 ${(area / 3.3058).toFixed(0)}평` : '';

  return (
    <div
      onClick={() => navigate(`/land/${land.id}`, { state: land })}
      className="bg-white rounded-lg p-4 border border-slate-200 hover:border-green-300 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${TYPE_STYLE[land.type] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
          {land.type}
        </span>
        <span className="text-xs text-slate-400">{land.date}</span>
      </div>
      <p className="text-sm font-medium text-slate-800 mb-3 line-clamp-2 leading-relaxed">{land.address}</p>
      <div className="space-y-1.5 text-xs border-t border-slate-100 pt-3">
        <div className="flex justify-between">
          <span className="text-slate-400">거래금액</span>
          <span className="font-semibold text-green-700">{priceStr}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">면적</span>
          <span className="text-slate-600">{land.area} {pyeong && <span className="text-slate-400">({pyeong})</span>}</span>
        </div>
        {land.pricePerPyeong && (
          <div className="flex justify-between">
            <span className="text-slate-400">평당가</span>
            <span className="text-slate-600">{land.pricePerPyeong}</span>
          </div>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100">
        <span className="text-xs text-green-700 font-medium">상세 보기 →</span>
      </div>
    </div>
  );
}

export default LandCard;
