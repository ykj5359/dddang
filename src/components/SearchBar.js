import React, { useState } from 'react';

function SearchBar({ onSearch, placeholder = '주소를 입력하세요 (예: 서울시 강남구)' }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-white rounded-lg shadow-lg border border-slate-200 p-1.5">
      <div className="flex items-center gap-2 flex-1 px-3">
        <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 py-1.5 text-sm outline-none bg-transparent text-slate-700 placeholder-slate-400"
        />
      </div>
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
      >
        검색
      </button>
    </form>
  );
}

export default SearchBar;
