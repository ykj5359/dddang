import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

// webpack에서 leaflet 기본 마커 아이콘 경로 수정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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

const TYPE_COLOR = { 대지: '#1E6B3C', 임야: '#40916C', 농지: '#D97706', 공장: '#6B7280' };
const FILTERS = ['전체', '대지', '임야', '농지', '공장'];

function fmtPrice(price) {
  const p = parseInt(price, 10);
  if (p >= 100000000) return (p / 100000000).toFixed(1) + '억';
  return Math.floor(p / 10000).toLocaleString() + '만';
}

function MapView({ searchAddress, onMarkerClick, panelOpen, height = 520 }) {
  const mapContainer = useRef(null);
  const mapRef       = useRef(null);
  const markersRef   = useRef([]);
  const searchPinRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [markerCount, setMarkerCount]   = useState(LAND_DATA.length);

  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  /* ── 마커 렌더링 ── */
  const drawMarkers = (map, filter) => {
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    const data = filter === '전체' ? LAND_DATA : LAND_DATA.filter((d) => d.type === filter);
    setMarkerCount(data.length);

    data.forEach((land) => {
      const color = TYPE_COLOR[land.type] || '#1E6B3C';
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          background:${color};color:#fff;
          padding:4px 10px;border-radius:12px;
          font-size:11px;font-weight:700;
          white-space:nowrap;cursor:pointer;
          box-shadow:0 2px 8px rgba(0,0,0,0.28);
          border:1.5px solid rgba(255,255,255,0.5);
          position:relative;letter-spacing:-0.3px;
          transform:translateX(-50%);">
          ${fmtPrice(land.price)}
          <div style="
            position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);
            width:0;height:0;
            border-left:4px solid transparent;
            border-right:4px solid transparent;
            border-top:5px solid ${color};"></div>
        </div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 28],
      });

      const marker = L.marker([land.lat, land.lng], { icon })
        .addTo(map)
        .on('click', () => {
          map.panTo([land.lat, land.lng]);
          if (onMarkerClick) onMarkerClick(land);
        });

      markersRef.current.push(marker);
    });
  };

  /* ── 지도 초기화 (한 번만) ── */
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainer.current, {
      center: [36.5, 127.5],
      zoom: 7,
      zoomControl: false,
    });

    // 국내 지도에 최적화된 한국어 타일 (Vworld 위성/일반 무료)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    drawMarkers(map, '전체');

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── 필터 변경 ── */
  useEffect(() => {
    if (!mapRef.current) return;
    drawMarkers(mapRef.current, activeFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  /* ── 패널 열림/닫힘 → 지도 크기 재계산 ── */
  useEffect(() => {
    if (!mapRef.current) return;
    const t = setTimeout(() => mapRef.current.invalidateSize(), 320);
    return () => clearTimeout(t);
  }, [panelOpen]);

  /* ── 주소 검색 (Nominatim 무료 지오코딩) ── */
  useEffect(() => {
    if (!searchAddress || !mapRef.current) return;
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&countrycodes=kr&limit=1`,
      { headers: { 'Accept-Language': 'ko' } }
    )
      .then((r) => r.json())
      .then((res) => {
        if (!res.length) return;
        const { lat, lon } = res[0];
        const latlng = [parseFloat(lat), parseFloat(lon)];
        mapRef.current.setView(latlng, 13);

        if (searchPinRef.current) mapRef.current.removeLayer(searchPinRef.current);
        const pin = L.marker(latlng)
          .addTo(mapRef.current)
          .bindPopup(
            `<div style="font-size:12px;font-weight:600;color:#166534;padding:2px 4px;">${searchAddress}</div>`,
            { closeButton: false }
          )
          .openPopup();
        searchPinRef.current = pin;
        setTimeout(() => pin.closePopup(), 3000);
      })
      .catch(() => {});
  }, [searchAddress]);

  return (
    <div className="relative w-full" style={{ height: resolvedHeight }}>

      {/* 지목 필터 */}
      <div className="absolute top-3 left-3 z-[1000] flex gap-1 flex-wrap">
        {FILTERS.map((f) => (
          <button key={f} type="button" onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all border ${
              activeFilter === f
                ? 'bg-green-700 text-white border-green-700 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:border-green-400'
            }`}>
            {f}
          </button>
        ))}
        <span className="bg-white text-slate-500 text-xs px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
          {markerCount}건
        </span>
      </div>

      {/* 지도 */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* 줌 컨트롤 */}
      <div className="absolute bottom-14 right-3 flex flex-col gap-1 z-[1000]">
        <button type="button" onClick={() => mapRef.current?.zoomIn()}
          className="bg-white shadow-sm w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-50 border border-slate-200 font-bold text-slate-600 text-base">+</button>
        <button type="button" onClick={() => mapRef.current?.zoomOut()}
          className="bg-white shadow-sm w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-50 border border-slate-200 font-bold text-slate-600 text-base">−</button>
      </div>

      {/* 현위치 버튼 */}
      <button type="button"
        onClick={() => navigator.geolocation?.getCurrentPosition((pos) => {
          mapRef.current?.setView([pos.coords.latitude, pos.coords.longitude], 13);
        })}
        className="absolute bottom-3 right-3 bg-white shadow-sm w-8 h-8 rounded-md flex items-center justify-center hover:bg-slate-50 border border-slate-200 z-[1000]">
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* 범례 */}
      <div className="absolute bottom-3 left-3 bg-white rounded-lg shadow-sm px-3 py-2 text-xs border border-slate-200 z-[1000]">
        <div className="flex gap-3 items-center">
          {[
            { l: '대지', c: '#1E6B3C' },
            { l: '임야', c: '#40916C' },
            { l: '농지', c: '#D97706' },
            { l: '공장', c: '#6B7280' },
          ].map((item) => (
            <span key={item.l} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.c }} />
              <span className="text-slate-500">{item.l}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MapView;
