// LTV 기준표 (지목별 × 지역별)
export const LTV_TABLE = {
  대지:    { 수도권: 70, 광역시: 65, 기타: 60 },
  임야:    { 수도권: 50, 광역시: 45, 기타: 40 },
  농지:    { 수도권: 60, 광역시: 55, 기타: 50 },
  공장:    { 수도권: 65, 광역시: 60, 기타: 55 },
  '공장부지': { 수도권: 65, 광역시: 60, 기타: 55 },
};

// 용도지역 보정
export const ZONING_ADJUST = {
  '제1종전용주거': +5, '제2종전용주거': +5,
  '제1종일반주거': +3, '제2종일반주거': +3, '제3종일반주거': +3,
  '준주거': +2, '상업': +5, '근린상업': +3,
  '준공업': +2, '공업': 0, '자연녹지': -5, '생산녹지': -7, '보전녹지': -10,
  '관리': -5, '농림': -8, '자연환경보전': -15,
};

// 도로 접면 보정
export const ROAD_ADJUST = {
  '광로(25m+)': +5, '대로(15~25m)': +3, '중로(8~15m)': +1,
  '소로(4~8m)': 0, '세로(4m 미만)': -5, '맹지': -15,
};

// 형상 보정
export const SHAPE_ADJUST = {
  '정방형': +2, '장방형': +1, '사다리형': 0, '삼각형': -3, '불규칙형': -5,
};

// 지세 보정
export const SLOPE_ADJUST = {
  '평지': +3, '완경사': +1, '급경사': -5, '구릉지': -3,
};

export const formatWon = (won) => {
  if (!won || !Number.isFinite(won)) return '-';
  if (won >= 100000000) {
    const uk = Math.floor(won / 100000000);
    const man = Math.floor((won % 100000000) / 10000);
    return man > 0 ? `${uk}억 ${man.toLocaleString()}만원` : `${uk}억원`;
  }
  if (won >= 10000) return `${Math.floor(won / 10000).toLocaleString()}만원`;
  return `${won.toLocaleString()}원`;
};

export const calculateLTV = ({ landPrice, landType, region, zoning, road, shape, slope }) => {
  const base = LTV_TABLE[landType]?.[region] ?? 50;
  const adj =
    (ZONING_ADJUST[zoning] ?? 0) +
    (ROAD_ADJUST[road] ?? 0) +
    (SHAPE_ADJUST[shape] ?? 0) +
    (SLOPE_ADJUST[slope] ?? 0);
  const finalLtv = Math.max(10, Math.min(80, base + adj));
  const loanAmt = Math.round((landPrice * finalLtv) / 100);
  return { base, adj, finalLtv, loanAmt };
};

export const calculateAllBankLTV = (params) => {
  const { landPrice } = params;
  const bank = calculateLTV(params);
  const saving = { ...bank, finalLtv: Math.min(80, bank.finalLtv + 5), loanAmt: Math.round((landPrice * Math.min(80, bank.finalLtv + 5)) / 100) };
  const policy = { ...bank, finalLtv: Math.max(10, bank.finalLtv - 5), loanAmt: Math.round((landPrice * Math.max(10, bank.finalLtv - 5)) / 100) };
  return { bank, saving, policy };
};
