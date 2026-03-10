import axios from 'axios';

const VWORLD_KEY = process.env.REACT_APP_VWORLD_API_KEY;
const BASE_URL = 'https://api.vworld.kr/ned/data/getIndividualPblntfPriceAttr';

export const fetchPblntfPrice = async ({ pnu }) => {
  try {
    if (!VWORLD_KEY) {
      return { success: false, data: null, error: 'VWorld API 키가 설정되지 않았습니다.' };
    }
    const res = await axios.get(BASE_URL, {
      params: { key: VWORLD_KEY, pnu, format: 'json', numOfRows: 10, pageNo: 1 },
    });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

export const getPnuFromAddress = async (address) => {
  try {
    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) return null;
    const geocoder = new window.kakao.maps.services.Geocoder();
    return await new Promise((resolve) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
          const { x, y } = result[0];
          geocoder.coord2RegionCode(x, y, (r2, s2) => {
            if (s2 === window.kakao.maps.services.Status.OK && Array.isArray(r2)) {
              const region = r2.find((r) => r.region_type === 'B');
              resolve(region ? region.code : null);
            } else {
              resolve(null);
            }
          });
        } else {
          resolve(null);
        }
      });
    });
  } catch {
    return null;
  }
};

export const getSamplePblntfData = (basePrice = 0) => {
  const base = basePrice > 0 ? basePrice / 10000 : 5200;
  return [
    { stdrYear: '2024', pblntfPclnd: Math.round(base * 1.00), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2023', pblntfPclnd: Math.round(base * 0.93), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2022', pblntfPclnd: Math.round(base * 0.85), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2021', pblntfPclnd: Math.round(base * 0.76), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2020', pblntfPclnd: Math.round(base * 0.68), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2019', pblntfPclnd: Math.round(base * 0.61), jijgcd: '대', jijgcdNm: '대지' },
    { stdrYear: '2018', pblntfPclnd: Math.round(base * 0.55), jijgcd: '대', jijgcdNm: '대지' },
  ];
};

const vworldApi = { fetchPblntfPrice, getPnuFromAddress, getSamplePblntfData };
export default vworldApi;
