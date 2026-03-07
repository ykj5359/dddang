const LAND_TRADE_KEY = import.meta.env.VITE_LAND_TRADE_KEY;
const VWORLD_KEY = import.meta.env.VITE_VWORLD_KEY;

// 개발: Vite 프록시 사용 / 프로덕션: 직접 호출 (CORS 허용 여부에 따라 fallback)
const LAND_TRADE_URL = import.meta.env.PROD
  ? 'https://apis.data.go.kr/1613000/RTMSDataSvcLandTrade/getRTMSDataSvcLandTrade'
  : '/api/land-trade';

const VWORLD_URL = import.meta.env.PROD
  ? 'https://api.vworld.kr'
  : '/api/vworld';

/** 토지 실거래가 조회 (XML 응답)
 * @param {string} lawdCd  지역코드 5자리 (e.g. '41670' 여주시)
 * @param {string} dealYmd 거래년월 YYYYMM (e.g. '202603')
 */
export async function fetchLandTrades(lawdCd, dealYmd) {
  const params = new URLSearchParams({
    serviceKey: LAND_TRADE_KEY,
    LAWD_CD: lawdCd,
    DEAL_YMD: dealYmd,
    numOfRows: '50',
    pageNo: '1',
  });

  const res = await fetch(`${LAND_TRADE_URL}?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const text = await res.text();
  return parseLandTradeXml(text);
}

function parseLandTradeXml(xml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const items = Array.from(doc.querySelectorAll('item'));

  return items.map((el) => ({
    dealYear:   el.querySelector('dealYear')?.textContent?.trim(),
    dealMonth:  el.querySelector('dealMonth')?.textContent?.trim(),
    dealDay:    el.querySelector('dealDay')?.textContent?.trim(),
    roadAddr:   el.querySelector('roadAddr')?.textContent?.trim(),
    jibun:      el.querySelector('jibun')?.textContent?.trim(),
    umdNm:      el.querySelector('umdNm')?.textContent?.trim(),
    landType:   el.querySelector('landCd')?.textContent?.trim(),
    area:       parseFloat(el.querySelector('excluUseAr')?.textContent || '0'),
    dealAmount: parseInt((el.querySelector('dealAmount')?.textContent || '0').replace(/,/g, ''), 10),
  }));
}

/** 개별공시지가 조회 (V-World WFS)
 * @param {string} pnu 토지 PNU 19자리 (법정동코드10 + 산여부1 + 지번8)
 */
export async function fetchOfficialPrice(pnu) {
  const params = new URLSearchParams({
    service: 'data',
    request: 'getfeature',
    data: 'LP_PA_CBND_BUBUN',
    key: VWORLD_KEY,
    format: 'json',
    attrFilter: `pnu:=:${pnu}`,
    geometry: 'false',
    attribute: 'true',
  });

  const res = await fetch(`${VWORLD_URL}/req/data?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const features = json?.response?.result?.featureCollection?.features || [];
  if (!features.length) return null;

  const props = features[0].properties;
  return {
    pnu: props.pnu,
    pricePerSqm: parseInt(props.pblntfPc || '0', 10),  // 공시지가 (원/㎡)
    baseYear: props.stdrYear,                            // 기준연도
    landType: props.lndcgrCodeNm,                       // 지목
    area: parseFloat(props.lndpclAr || '0'),            // 면적
  };
}

/** 카카오 지오코더 - 주소 → 좌표
 * @param {string} address 검색할 주소
 * @returns {Promise<{lat: number, lng: number, address: string}>}
 */
export function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    if (!window.kakao?.maps?.services) {
      reject(new Error('Kakao Maps SDK not loaded'));
      return;
    }
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        resolve({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
          address: result[0].address_name,
        });
      } else {
        reject(new Error('주소를 찾을 수 없습니다'));
      }
    });
  });
}
