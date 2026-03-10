import React, { useEffect, useRef, useState } from 'react';

const LAND_DATA = [
  { id: 1,  lat: 37.5665, lng: 126.9780, address: '서울시 중구 명동',        price: '850000000',  area: '330㎡',  type: '대지', date: '2024-11', zoning: '일반상업지역',  coverage: 60, far: 800, road: '광대로',  shape: '정방형',  slope: '평지'   },
  { id: 2,  lat: 37.5512, lng: 126.9882, address: '서울시 용산구 이태원동',   price: '620000000',  area: '495㎡',  type: '대지', date: '2024-11', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '사다리형', slope: '평지'   },
  { id: 3,  lat: 37.4979, lng: 127.0276, address: '서울시 강남구 역삼동',     price: '1200000000', area: '661㎡',  type: '대지', date: '2024-10', zoning: '준주거지역',    coverage: 60, far: 400, road: '광대로',  shape: '정방형',  slope: '평지'   },
  { id: 4,  lat: 37.5172, lng: 127.0473, address: '서울시 송파구 잠실동',     price: '980000000',  area: '528㎡',  type: '대지', date: '2024-10', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '정방형',  slope: '평지'   },
  { id: 5,  lat: 37.6176, lng: 126.9227, address: '서울시 은평구 진관동',     price: '320000000',  area: '826㎡',  type: '임야', date: '2024-09', zoning: '자연녹지지역',  coverage: 20, far: 80,  road: '6m 미만', shape: '부정형',  slope: '완경사' },
  { id: 6,  lat: 37.4833, lng: 126.8956, address: '서울시 금천구 시흥동',     price: '540000000',  area: '430㎡',  type: '대지', date: '2024-11', zoning: '제1종일반주거', coverage: 60, far: 150, road: '6m 이상', shape: '정방형',  slope: '평지'   },
  { id: 7,  lat: 37.6393, lng: 127.0270, address: '서울시 노원구 월계동',     price: '410000000',  area: '370㎡',  type: '대지', date: '2024-10', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '정방형',  slope: '평지'   },
  { id: 8,  lat: 37.5326, lng: 126.8397, address: '경기도 부천시 원미구',     price: '280000000',  area: '560㎡',  type: '농지', date: '2024-11', zoning: '생산녹지지역',  coverage: 20, far: 80,  road: '6m 이상', shape: '장방형',  slope: '평지'   },
  { id: 9,  lat: 37.2750, lng: 127.0094, address: '경기도 수원시 권선구',     price: '195000000',  area: '990㎡',  type: '임야', date: '2024-10', zoning: '자연녹지지역',  coverage: 20, far: 80,  road: '소로',    shape: '부정형',  slope: '완경사' },
  { id: 10, lat: 37.4138, lng: 127.2566, address: '경기도 용인시 처인구',     price: '85000000',   area: '1322㎡', type: '임야', date: '2024-09', zoning: '자연녹지지역',  coverage: 20, far: 80,  road: '소로',    shape: '부정형',  slope: '급경사' },
  { id: 11, lat: 36.3504, lng: 127.3845, address: '대전시 유성구 봉명동',     price: '320000000',  area: '450㎡',  type: '대지', date: '2024-11', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '정방형',  slope: '평지'   },
  { id: 12, lat: 35.1796, lng: 129.0756, address: '부산시 해운대구 우동',     price: '760000000',  area: '380㎡',  type: '대지', date: '2024-10', zoning: '일반상업지역',  coverage: 60, far: 800, road: '광대로',  shape: '정방형',  slope: '평지'   },
  { id: 13, lat: 35.8714, lng: 128.6014, address: '대구시 수성구 범어동',     price: '510000000',  area: '420㎡',  type: '대지', date: '2024-11', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '정방형',  slope: '평지'   },
  { id: 14, lat: 33.4996, lng: 126.5312, address: '제주도 제주시 연동',       price: '420000000',  area: '660㎡',  type: '대지', date: '2024-09', zoning: '제2종일반주거', coverage: 60, far: 200, road: '8m 이상', shape: '장방형',  slope: '평지'   },
  { id: 15, lat: 33.2541, lng: 126.5600, address: '제주도 서귀포시 중문동',   price: '180000000',  area: '2640㎡', type: '임야', date: '2024-10', zoning: '자연녹지지역',  coverage: 20, far: 80,  road: '소로',    shape: '부정형',  slope: '완경사' },
  { id: 16, lat: 37.8813, lng: 127.7298, address: '강원도 춘천시 남산면',     price: '45000000',   area: '3305㎡', type: '임야', date: '2024-10', zoning: '보전관리지역',  coverage: 20, far: 80,  road: '소로',    shape: '부정형',  slope: '급경사' },
  { id: 17, lat: 36.7750, lng: 126.4507, address: '충청남도 홍성군 홍북읍',   price: '72000000',   area: '1980㎡', type: '농지', date: '2024-11', zoning: '농림지역',      coverage: 20, far: 80,  road: '소로',    shape: '장방형',  slope: '평지'   },
  { id: 18, lat: 35.4606, lng: 128.2132, address: '경상남도 창원시 의창구',   price: '175000000',  area: '992㎡',  type: '공장', date: '2024-09', zoning: '준공업지역',    coverage: 70, far: 300, road: '8m 이상', shape: '장방형',  slope: '평지'   },
];

const TYPE_COLOR = { '대지': '#1E6B3C', '임야': '#40916C', '농지': '#D97706', '공장': '#6B7280' };
const FILTERS = ['전체', '대지', '임야', '농지', '공장'];

function fmtPrice(price) {
  const p = parseInt(price, 10);
  if (p >= 100000000) return (p / 100000000).toFixed(1) + '억';
  return Math.floor(p / 10000).toLocaleString() + '만';
}

function MapView({ searchAddress, onMarkerClick, panelOpen, height = 520 }) {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const overlaysRef  = useRef([]);
  const searchPinRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [markerCount,  setMarkerCount]  = useState(LAND_DATA.length);
  const resolvedHeight = typeof height === 'number' ? height + 'px' : height;

  const drawMarkers = (map, filter) => {
    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = [];
    const data = filter === '전체' ? LAND_DATA : LAND_DATA.filter((d) => d.type === filter);
    setMarkerCount(data.length);
    data.forEach((land) => {
      const color = TYPE_COLOR[land.type] || '#1E6B3C';
      const el = document.createElement('div');
      el.style.cssText = 'background:' + color + ';color:#fff;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;white-space:nowrap;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.28);border:1.5px solid rgba(255,255,255,0.5);position:relative;letter-spacing:-0.3px;transform:translateX(-50%);font-family:-apple-system,sans-serif;';
      el.textContent = fmtPrice(land.price);
      const arrow = document.createElement('div');
      arrow.style.cssText = 'position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid ' + color + ';';
      el.appendChild(arrow);
      el.addEventListener('click', () => { map.setCenter(new window.kakao.maps.LatLng(land.lat, land.lng)); if (onMarkerClick) onMarkerClick(land); });
      const overlay = new window.kakao.maps.CustomOverlay({ position: new window.kakao.maps.LatLng(land.lat, land.lng), content: el, yAnchor: 1 });
      overlay.setMap(map);
      overlaysRef.current.push(overlay);
    });
  };

  useEffect(() => {
    if (mapRef.current) return;

    let timer;

    const tryInit = () => {
      if (!window.kakao) {
        // kakao SDK 스크립트 아직 로딩 중 → 재시도
        timer = setTimeout(tryInit, 150);
        return;
      }
      // kakao는 있지만 maps API는 load() 호출 필요
      window.kakao.maps.load(() => {
        if (mapRef.current || !mapContainer.current) return;
        const map = new window.kakao.maps.Map(mapContainer.current, {
          center: new window.kakao.maps.LatLng(36.5, 127.5),
          level: 13,
        });
        mapRef.current = map;
        drawMarkers(map, '전체');
      });
    };

    tryInit();

    return () => { clearTimeout(timer); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    drawMarkers(mapRef.current, activeFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  useEffect(() => {
    if (!mapRef.current) return;
    const t = setTimeout(() => mapRef.current.relayout(), 320);
    return () => clearTimeout(t);
  }, [panelOpen]);

  const showSearchPin = (coords, label) => {
    const map = mapRef.current;
    if (!map) return;
    map.setCenter(coords);
    map.setLevel(4);
    if (searchPinRef.current) { searchPinRef.current.setMap(null); searchPinRef.current = null; }
    const el = document.createElement('div');
    el.style.cssText = 'background:#DC2626;color:#fff;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);position:relative;transform:translateX(-50%);font-family:-apple-system,sans-serif;';
    el.textContent = label;
    const arr = document.createElement('div');
    arr.style.cssText = 'position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid #DC2626;';
    el.appendChild(arr);
    const pin = new window.kakao.maps.CustomOverlay({ position: coords, content: el, yAnchor: 1 });
    pin.setMap(map);
    searchPinRef.current = pin;
    setTimeout(() => { if (searchPinRef.current) { searchPinRef.current.setMap(null); searchPinRef.current = null; } }, 4000);
  };

  useEffect(() => {
    if (!searchAddress || !mapRef.current || !window.kakao || !window.kakao.maps) return;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchAddress, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) { showSearchPin(new window.kakao.maps.LatLng(result[0].y, result[0].x), searchAddress); return; }
      const places = new window.kakao.maps.services.Places();
      places.keywordSearch(searchAddress, (res, st) => { if (st === window.kakao.maps.services.Status.OK) showSearchPin(new window.kakao.maps.LatLng(res[0].y, res[0].x), searchAddress); });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchAddress]);

  const zBt = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, cursor: 'pointer', color: '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' };

  return (
    <div style={{ position: 'relative', width: '100%', height: resolvedHeight }}>
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button key={f} type="button" onClick={() => setActiveFilter(f)} style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: '-apple-system,sans-serif', border: activeFilter === f ? '1px solid #15803d' : '1px solid #e2e8f0', background: activeFilter === f ? '#15803d' : '#fff', color: activeFilter === f ? '#fff' : '#475569', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>{f}</button>
        ))}
        <span style={{ padding: '6px 12px', borderRadius: 20, fontSize: 12, background: '#fff', color: '#64748b', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', fontFamily: '-apple-system,sans-serif' }}>{markerCount}건</span>
      </div>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: 56, right: 12, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button type="button" style={zBt} onClick={() => mapRef.current && mapRef.current.setLevel(mapRef.current.getLevel() - 1)}>+</button>
        <button type="button" style={zBt} onClick={() => mapRef.current && mapRef.current.setLevel(mapRef.current.getLevel() + 1)}>-</button>
      </div>
      <button type="button" onClick={() => navigator.geolocation?.getCurrentPosition((pos) => { if (!mapRef.current) return; mapRef.current.setCenter(new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude)); mapRef.current.setLevel(4); })} style={{ position: 'absolute', bottom: 12, right: 12, zIndex: 10, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 6, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}>
        <svg width="16" height="16" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </button>
      <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 10, background: '#fff', borderRadius: 8, padding: '6px 12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', display: 'flex', gap: 12, alignItems: 'center', fontFamily: '-apple-system,sans-serif' }}>
        {[{ l: '대지', c: '#1E6B3C' }, { l: '임야', c: '#40916C' }, { l: '농지', c: '#D97706' }, { l: '공장', c: '#6B7280' }].map((item) => (
          <span key={item.l} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.c, display: 'inline-block' }} />{item.l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MapView;
