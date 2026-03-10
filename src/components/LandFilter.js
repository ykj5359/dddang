import React, { useState } from 'react';

const TYPES = ['전체', '대지', '임야', '농지', '공장부지'];
const REGIONS = ['전체', '서울', '경기', '인천', '강원', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '부산', '대구', '대전', '광주', '울산', '제주'];
const SORT_OPTIONS = ['최신순', '고가순', '저가순', '면적큰순', '면적작은순'];

function LandFilter({ filters, onChange }) {
  const [open, setOpen] = useState(false);

  const update = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1.5 flex-wrap">
          {TYPES.map((t) => (
            <button key={t} type="button" onClick={() => update('type', t)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                filters.type === t
                  ? 'bg-green-700 text-white border-green-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-green-400 hover:text-green-700'
              }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <select value={filters.sortBy || '최신순'} onChange={(e) => update('sortBy', e.target.value)}
            className="text-xs border border-slate-200 rounded-md px-3 py-1.5 outline-none text-slate-600 bg-white">
            {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
          <button type="button" onClick={() => setOpen(!open)}
            className="text-xs text-slate-500 hover:text-green-700 border border-slate-200 px-3 py-1.5 rounded-md flex items-center gap-1 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            상세 필터
            <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1.5">지역</label>
            <select value={filters.region || '전체'} onChange={(e) => update('region', e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-md px-3 py-2 outline-none bg-white text-slate-700">
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1.5">가격 (만원)</label>
            <div className="flex gap-1.5 items-center">
              <input type="number" placeholder="최소" value={filters.priceMin || ''} onChange={(e) => update('priceMin', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-md px-2.5 py-2 outline-none focus:border-green-400" />
              <span className="text-slate-300 text-sm">–</span>
              <input type="number" placeholder="최대" value={filters.priceMax || ''} onChange={(e) => update('priceMax', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-md px-2.5 py-2 outline-none focus:border-green-400" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-500 font-medium block mb-1.5">면적 (㎡)</label>
            <div className="flex gap-1.5 items-center">
              <input type="number" placeholder="최소" value={filters.areaMin || ''} onChange={(e) => update('areaMin', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-md px-2.5 py-2 outline-none focus:border-green-400" />
              <span className="text-slate-300 text-sm">–</span>
              <input type="number" placeholder="최대" value={filters.areaMax || ''} onChange={(e) => update('areaMax', e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-md px-2.5 py-2 outline-none focus:border-green-400" />
            </div>
          </div>
          <div className="md:col-span-3 flex justify-end">
            <button type="button"
              onClick={() => onChange({ type: '전체', sortBy: '최신순', region: '전체', priceMin: '', priceMax: '', areaMin: '', areaMax: '' })}
              className="text-xs text-slate-400 hover:text-red-500 border border-slate-200 px-3 py-1.5 rounded-md transition-colors">
              초기화
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandFilter;
