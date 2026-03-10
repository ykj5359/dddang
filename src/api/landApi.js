import axios from 'axios';

const API_KEY = process.env.REACT_APP_LAND_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/1611000/nsdi/LandTrade/getLandTradeList';

export const SIDO_CODES = {
  '서울특별시': '11', '부산광역시': '26', '대구광역시': '27',
  '인천광역시': '28', '광주광역시': '29', '대전광역시': '30',
  '울산광역시': '31', '세종특별자치시': '36', '경기도': '41',
  '강원도': '42', '충청북도': '43', '충청남도': '44',
  '전라북도': '45', '전라남도': '46', '경상북도': '47',
  '경상남도': '48', '제주특별자치도': '50',
};

const getYearMonth = (monthsAgo = 0) => {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
};

export const fetchLandTrades = async ({
  sidoCode,
  sigunguCode = '',
  dealYmd = '',
  numOfRows = 20,
  pageNo = 1,
} = {}) => {
  try {
    const params = {
      serviceKey: API_KEY,
      numOfRows,
      pageNo,
      type: 'json',
      sidoCode: sidoCode || '11',
      sigunguCode,
      dealYmd: dealYmd || getYearMonth(1),
    };
    const res = await axios.get(BASE_URL, { params });
    const data = res.data;
    if (data?.LandTrade?.[1]?.row) {
      return {
        success: true,
        data: data.LandTrade[1].row,
        totalCount: data.LandTrade[0]?.head?.[0]?.totalCount || 0,
      };
    }
    return { success: true, data: [], totalCount: 0 };
  } catch (error) {
    console.error('토지 실거래가 API 오류:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const getSidoCodeFromAddress = (address) => {
  for (const [sido, code] of Object.entries(SIDO_CODES)) {
    if (address.includes(sido) || address.includes(sido.replace('특별시','').replace('광역시','').replace('특별자치시','').replace('특별자치도',''))) {
      return code;
    }
  }
  return '11';
};

export const formatPrice = (price) => {
  const raw = parseInt(String(price).replace(/,/g, ''), 10);
  if (!Number.isFinite(raw)) return '-';
  const won = raw >= 1000000 ? raw : raw * 10000;
  if (won >= 100000000) {
    const uk = Math.floor(won / 100000000);
    const man = Math.floor((won % 100000000) / 10000);
    return man > 0 ? `${uk}억 ${man.toLocaleString()}만원` : `${uk}억원`;
  }
  return (won / 10000).toLocaleString() + '만원';
};

export const formatArea = (area) => {
  const a = parseFloat(area);
  if (!a) return '-';
  return `${a.toFixed(0)}㎡ (약 ${(a / 3.3058).toFixed(1)}평)`;
};
