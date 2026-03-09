import { useState, useEffect, useRef, useCallback } from 'react';
import { listings } from '../data/dummyData';
import { formatPrice, LAND_TYPE_COLORS } from '../utils/format';
import { geocodeAddress } from '../services/landApi';

const DEAL_TYPES = ['전체', '매매', '임대'];
const LAND_TYPES = ['전체', '전', '답', '임야', '대지'];

const LAYER_BUTTONS = [
  { id: '지도',    label: '지도' },
  { id: '지적',    label: '지적' },
  { id: '실거래가', label: '실거래가' },
  { id: '매물',    label: '매물' },
  { id: '경매임박', label: '경매임박' },
  { id: '토지분양', label: '토지분양' },
  { id: '공매',    label: '공매',    isNew: true },
  { id: '건축허가', label: '건축허가', isNew: true },
  { id: '개발공사', label: '개발공사', isNew: true },
];

const TYPE_COLORS = {
  전: { bg: '#d97706', text: '#fff' },
  답: { bg: '#2563eb', text: '#fff' },
  임야: { bg: '#16a34a', text: '#fff' },
  대지: { bg: '#6b7280', text: '#fff' },
};

function createOverlayHTML(listing, selected) {
  const price =
    listing.dealType === '매매'
      ? formatPrice(listing.price)
      : `월 ${formatPrice(listing.rentPrice)}`;
  const { bg } = TYPE_COLORS[listing.type] || { bg: '#6b7280' };
  const border = selected ? `3px solid ${bg}` : `2px solid ${bg}`;
  const shadow = selected ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.18)';
  const transform = selected ? 'scale(1.15)' : 'scale(1)';

  return `<div
    onclick="window.__dddang_markerClick(${listing.id})"
    style="display:inline-flex;align-items:center;gap:4px;background:white;border:${border};border-radius:8px;padding:4px 8px;cursor:pointer;white-space:nowrap;box-shadow:${shadow};transform:${transform};font-family:-apple-system,sans-serif;"
  >
    <span style="background:${bg};color:#fff;padding:1px 5px;border-radius:4px;font-size:9px;font-weight:700;">${listing.type}</span>
    <span style="font-size:11px;font-weight:700;color:#1a1a1a;">${price}</span>
  </div>`;
}

export default function MapSearchPage({ onNavigate }) {
  const mapContainerRef = useRef(null);
  const kakaoMapRef = useRef(null);
  const overlaysRef = useRef([]);
  const clickHandlerRef = useRef(null);

  const [selectedListing, setSelectedListing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [dealFilter, setDealFilter] = useState('전체');
  const [landFilter, setLandFilter] = useState('전체');
  const [showPanel, setShowPanel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [mapReady, setMapReady] = useState(false);
  const [activeLayer, setActiveLayer] = useState('지도');

  // 항상 최신 상태 참조
  const setSelectedListingRef = useRef(null);
  setSelectedListingRef.current = (listing) => {
    setSelectedListing(listing);
    setShowDetail(true);
    setShowPanel(false);
  };

  clickHandlerRef.current = useCallback((id) => {
    const listing = listings.find((l) => l.id === id);
    if (listing) setSelectedListingRef.current(listing);
  }, []);

  // ── 카카오 지도 초기화 ──
  useEffect(() => {
    window.__dddang_markerClick = (id) => clickHandlerRef.current(id);

    const initMap = () => {
      if (!window.kakao?.maps || !mapContainerRef.current) return;
      const map = new window.kakao.maps.Map(mapContainerRef.current, {
        center: new window.kakao.maps.LatLng(36.5, 127.5),
        level: 10,
      });
      kakaoMapRef.current = map;
      setMapReady(true);
    };

    if (window.kakao?.maps) {
      initMap();
    } else {
      const t = setTimeout(initMap, 600);
      return () => clearTimeout(t);
    }

    return () => { delete window.__dddang_markerClick; };
  }, []);

  // ── 필터 변경 시 오버레이 재생성 ──
  useEffect(() => {
    if (!mapReady || !kakaoMapRef.current) return;

    overlaysRef.current.forEach((ov) => ov.setMap(null));
    overlaysRef.current = [];

    listings
      .filter((l) => {
        if (!l.lat || !l.lng) return false;
        if (dealFilter !== '전체' && l.dealType !== dealFilter) return false;
        if (landFilter !== '전체' && l.type !== landFilter) return false;
        return true;
      })
      .forEach((listing) => {
        const isSelected = selectedListing?.id === listing.id;
        const overlay = new window.kakao.maps.CustomOverlay({
          position: new window.kakao.maps.LatLng(listing.lat, listing.lng),
          content: createOverlayHTML(listing, isSelected),
          yAnchor: 1.4,
          zIndex: isSelected ? 10 : 1,
        });
        overlay.setMap(kakaoMapRef.current);
        overlaysRef.current.push(overlay);
      });
  }, [mapReady, dealFilter, landFilter, selectedListing]);

  const filteredListings = listings.filter((l) => {
    if (dealFilter !== '전체' && l.dealType !== dealFilter) return false;
    if (landFilter !== '전체' && l.type !== landFilter) return false;
    return true;
  });

  // ── 주소 검색 ──
  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setSearchError('');
    try {
      const { lat, lng } = await geocodeAddress(searchInput.trim());
      kakaoMapRef.current?.setCenter(new window.kakao.maps.LatLng(lat, lng));
      kakaoMapRef.current?.setLevel(7);
    } catch {
      setSearchError('주소를 찾을 수 없습니다');
    }
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setShowDetail(true);
    setShowPanel(false);
    if (listing.lat && listing.lng && kakaoMapRef.current) {
      kakaoMapRef.current.setCenter(new window.kakao.maps.LatLng(listing.lat, listing.lng));
      kakaoMapRef.current.setLevel(7);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-200">

      {/* 카카오 지도 */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* 상단 검색 + 필터 */}
      <div className="absolute top-3 left-3 right-3 z-20">
        <div className="bg-white rounded-2xl shadow-xl flex items-center px-3 py-2.5 gap-2 border border-slate-100">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value); setSearchError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="지역, 주소 검색 (예: 경기도 여주시)"
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <button
            onClick={handleSearch}
            className="bg-primary-600 text-white text-xs px-3 py-1.5 rounded-xl font-bold flex-shrink-0 hover:bg-primary-700 transition-colors"
          >
            검색
          </button>
        </div>

        {searchError && (
          <p className="mt-1 text-xs text-red-600 bg-white/90 rounded-lg px-3 py-1.5 shadow">
            {searchError}
          </p>
        )}

        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {DEAL_TYPES.map((t) => (
            <button key={t} onClick={() => setDealFilter(t)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all shadow-sm ${
                dealFilter === t ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >{t}</button>
          ))}
          <div className="w-px bg-gray-300 mx-0.5 self-stretch flex-shrink-0" />
          {LAND_TYPES.map((t) => (
            <button key={t} onClick={() => setLandFilter(t)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all shadow-sm ${
                landFilter === t ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200'
              }`}
            >{t}</button>
          ))}
        </div>
      </div>

      {/* 매물 목록 토글 버튼 */}
      <button
        onClick={() => { setShowPanel(!showPanel); if (showDetail) setShowDetail(false); }}
        className="absolute z-20 bg-white rounded-xl shadow-md flex items-center gap-1.5 px-3 py-2 hover:bg-gray-50 transition-colors"
        style={{ top: '130px', left: '12px' }}
      >
        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
        <span className="text-xs font-bold text-primary-600">{filteredListings.length}건</span>
      </button>

      {/* 줌 컨트롤 (왼쪽 하단) */}
      <div className="absolute z-20 flex flex-col gap-2" style={{ bottom: '120px', left: '12px' }}>
        <button onClick={() => kakaoMapRef.current?.setLevel(kakaoMapRef.current.getLevel() - 1)}
          className="bg-white rounded-xl shadow-md w-9 h-9 flex items-center justify-center text-gray-600 font-bold text-xl hover:bg-gray-50 leading-none">+</button>
        <button onClick={() => kakaoMapRef.current?.setLevel(kakaoMapRef.current.getLevel() + 1)}
          className="bg-white rounded-xl shadow-md w-9 h-9 flex items-center justify-center text-gray-600 font-bold text-xl hover:bg-gray-50 leading-none">−</button>
      </div>

      {/* 오른쪽 레이어 버튼 패널 */}
      <div className="absolute z-20 flex flex-col gap-1.5" style={{ top: '130px', right: '12px' }}>
        {/* 현재 위치 버튼 */}
        <button
          onClick={() => navigator.geolocation?.getCurrentPosition(
            ({ coords }) => {
              kakaoMapRef.current?.setCenter(new window.kakao.maps.LatLng(coords.latitude, coords.longitude));
              kakaoMapRef.current?.setLevel(6);
            }
          )}
          className="bg-white rounded-xl shadow-md w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
          title="현재 위치"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="7" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" strokeWidth="2" fill="currentColor" />
            <line x1="12" y1="2" x2="12" y2="5" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="12" y2="22" strokeWidth="2" strokeLinecap="round" />
            <line x1="2" y1="12" x2="5" y2="12" strokeWidth="2" strokeLinecap="round" />
            <line x1="19" y1="12" x2="22" y2="12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* 레이어 선택 버튼 목록 */}
        <div className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
          {LAYER_BUTTONS.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveLayer(btn.id)}
              className={`relative px-3 py-2 text-xs font-bold border-b border-gray-100 last:border-0 transition-colors min-w-[52px] text-center ${
                activeLayer === btn.id
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {btn.label}
              {btn.isNew && (
                <span className="absolute top-0.5 right-0.5 bg-red-500 text-white font-bold rounded-full flex items-center justify-center leading-none"
                  style={{ fontSize: '8px', width: '13px', height: '13px' }}>
                  N
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 매물 목록 패널 */}
      <div className={`absolute left-0 right-0 bottom-0 z-30 transition-transform duration-300 ${showPanel ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col" style={{ maxHeight: '60vh' }}>
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-sm">매물 목록</span>
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-semibold">{filteredListings.length}건</span>
            </div>
            <button onClick={() => setShowPanel(false)} className="text-gray-400 hover:text-gray-600 p-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <span className="text-3xl mb-2">🔍</span>
                <p className="text-sm">조건에 맞는 매물이 없습니다</p>
              </div>
            ) : filteredListings.map((listing) => (
              <button key={listing.id} onClick={() => handleListingClick(listing)}
                className={`w-full text-left px-4 py-3.5 border-b border-slate-50 hover:bg-primary-50 transition-colors ${
                  selectedListing?.id === listing.id ? 'bg-primary-50 border-l-4 border-l-primary-600' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1.5 mb-1.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`}>{listing.type}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${listing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{listing.dealType}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-800 truncate mb-0.5">{listing.address}</p>
                    <p className="text-xs text-gray-500">{listing.area.toLocaleString()}㎡ · 약 {Math.round(listing.area / 3.3)}평</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-primary-700">
                      {listing.dealType === '매매' ? formatPrice(listing.price) : `월 ${formatPrice(listing.rentPrice)}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{listing.createdAt}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 매물 상세 바텀시트 */}
      {showDetail && selectedListing && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-100">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="px-4 pb-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${LAND_TYPE_COLORS[selectedListing.type] || 'bg-gray-100 text-gray-700'}`}>{selectedListing.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${selectedListing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{selectedListing.dealType}</span>
                </div>
                <button onClick={() => { setShowDetail(false); setSelectedListing(null); }} className="text-gray-400 hover:text-gray-600 p-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm font-bold text-gray-900 mb-0.5">{selectedListing.address}</p>
              <p className="text-xs text-gray-500 mb-3">{selectedListing.area.toLocaleString()}㎡ · 약 {Math.round(selectedListing.area / 3.3)}평</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{selectedListing.dealType === '매매' ? '매매가' : '월 임대료'}</p>
                  <p className="text-2xl font-bold text-primary-700">
                    {selectedListing.dealType === '매매' ? formatPrice(selectedListing.price) : `월 ${formatPrice(selectedListing.rentPrice)}`}
                  </p>
                  {selectedListing.description && (
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-52">{selectedListing.description}</p>
                  )}
                </div>
                <button
                  onClick={() => { onNavigate('detail', selectedListing); setShowDetail(false); }}
                  className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-primary-700 active:scale-95 transition-all flex-shrink-0"
                >
                  상세보기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
