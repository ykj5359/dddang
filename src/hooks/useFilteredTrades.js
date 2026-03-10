import { useMemo } from 'react';

function toNumber(str, fallback = 0) {
  const n = parseInt(String(str).replace(/,/g, ''), 10);
  return Number.isFinite(n) ? n : fallback;
}

function toAreaNumber(str, fallback = 0) {
  const n = parseFloat(String(str).replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : fallback;
}

export function useFilteredTrades(trades = [], filters = {}) {
  return useMemo(() => {
    let result = [...trades];

    if (filters.type && filters.type !== '전체') {
      result = result.filter((t) => {
        if (filters.type === '공장부지') return t.type === '공장' || t.type === '공장부지';
        return t.type === filters.type;
      });
    }

    if (filters.priceMin) {
      const minWon = toNumber(filters.priceMin) * 10000;
      result = result.filter((t) => toNumber(t.price) >= minWon);
    }
    if (filters.priceMax) {
      const maxWon = toNumber(filters.priceMax) * 10000;
      result = result.filter((t) => toNumber(t.price) <= maxWon);
    }

    if (filters.areaMin) {
      const minArea = toAreaNumber(filters.areaMin);
      result = result.filter((t) => toAreaNumber(t.area) >= minArea);
    }
    if (filters.areaMax) {
      const maxArea = toAreaNumber(filters.areaMax);
      result = result.filter((t) => toAreaNumber(t.area) <= maxArea);
    }

    if (filters.region && filters.region !== '전체') {
      result = result.filter((t) => String(t.address).includes(filters.region));
    }

    switch (filters.sortBy) {
      case '고가순': result.sort((a, b) => toNumber(b.price) - toNumber(a.price)); break;
      case '저가순': result.sort((a, b) => toNumber(a.price) - toNumber(b.price)); break;
      case '면적큰순': result.sort((a, b) => toAreaNumber(b.area) - toAreaNumber(a.area)); break;
      case '면적작은순': result.sort((a, b) => toAreaNumber(a.area) - toAreaNumber(b.area)); break;
      default: result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [trades, filters]);
}
