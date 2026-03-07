import { useState } from 'react';
import { listings } from '../data/dummyData';
import { formatPrice, LAND_TYPE_COLORS } from '../utils/format';

const DEAL_TYPES = ['전체', '매매', '임대'];
const LAND_TYPES = ['전체', '전', '답', '임야', '대지'];

// SVG 좌표 기반 가격 마커 (viewBox 0 0 400 680)
const PRICE_MARKERS = [
  { id: 1, cx: 112, cy: 148, label: '8,500만', type: '전', listingId: 1 },
  { id: 2, cx: 265, cy: 290, label: '1.2억', type: '답', listingId: 2 },
  { id: 3, cx: 310, cy: 130, label: '9,500만', type: '전', listingId: 3 },
  { id: 4, cx: 170, cy: 420, label: '1.5억', type: '전', listingId: 4 },
  { id: 5, cx: 58,  cy: 310, label: '3,200만', type: '임야' },
  { id: 6, cx: 340, cy: 460, label: '6,800만', type: '답' },
  { id: 7, cx: 230, cy: 75,  label: '2.1억', type: '대' },
  { id: 8, cx: 140, cy: 560, label: '4,500만', type: '전' },
  { id: 9, cx: 295, cy: 540, label: '7,300만', type: '전' },
  { id: 10, cx: 75,  cy: 200, label: '5,100만', type: '답' },
];

function MockMapSVG({ markers, selectedListingId, onMarkerClick }) {
  return (
    <svg
      viewBox="0 0 400 680"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      {/* ── 기본 지면 ── */}
      <rect width="400" height="680" fill="#ddd9c2" />

      {/* ── 농경지 (전/답) ── */}
      <polygon points="95,10 230,8 228,90 93,95" fill="#c9d87a" opacity="0.85" />
      <polygon points="235,6 385,10 382,82 232,88" fill="#d4df82" opacity="0.8" />
      <polygon points="10,10 88,12 85,92 8,96" fill="#c2d472" opacity="0.85" />

      <polygon points="8,100 88,98 86,190 6,195" fill="#b8d89a" opacity="0.8" />
      <polygon points="95,100 195,97 192,188 92,192" fill="#c5e09a" opacity="0.75" />
      <polygon points="200,95 310,92 308,175 198,180" fill="#bcd87a" opacity="0.8" />
      <polygon points="318,90 390,88 388,170 316,174" fill="#cae08c" opacity="0.75" />

      <polygon points="8,200 88,198 85,285 6,290" fill="#aed28c" opacity="0.8" />
      <polygon points="200,185 295,182 292,260 198,265" fill="#c0dc88" opacity="0.75" />
      <polygon points="305,178 390,175 388,255 302,260" fill="#b8d880" opacity="0.8" />

      <polygon points="8,350 85,348 83,430 6,435" fill="#c8dc80" opacity="0.8" />
      <polygon points="90,345 195,342 192,425 88,430" fill="#bcd478" opacity="0.75" />
      <polygon points="210,340 300,338 298,415 208,420" fill="#c4da84" opacity="0.8" />
      <polygon points="310,335 390,332 388,410 308,415" fill="#d0e088" opacity="0.75" />

      <polygon points="8,440 85,437 83,520 6,525" fill="#b8d47a" opacity="0.8" />
      <polygon points="200,425 295,422 292,505 198,510" fill="#c2da80" opacity="0.75" />
      <polygon points="305,418 390,415 388,495 302,500" fill="#bcd27c" opacity="0.8" />

      <polygon points="8,530 195,527 192,610 6,615" fill="#bcd878" opacity="0.8" />
      <polygon points="205,524 390,520 388,600 202,605" fill="#c8de84" opacity="0.75" />
      <polygon points="8,618 390,614 390,680 8,680" fill="#c0d87c" opacity="0.8" />

      {/* ── 논 (답) - 파란빛 ── */}
      <polygon points="95,195 198,190 195,280 92,285" fill="#9ec8a0" opacity="0.85" />
      <polygon points="8,295 85,292 83,345 6,350" fill="#a8cca8" opacity="0.8" />
      <polygon points="92,290 195,286 192,342 90,347" fill="#a0c89c" opacity="0.8" />

      {/* ── 임야 (산) ── */}
      <ellipse cx="48" cy="255" rx="42" ry="48" fill="#7aab62" opacity="0.75" />
      <ellipse cx="352" cy="215" rx="38" ry="45" fill="#6e9e58" opacity="0.7" />
      <ellipse cx="355" cy="380" rx="35" ry="40" fill="#78a85e" opacity="0.75" />
      <ellipse cx="48" cy="490" rx="40" ry="45" fill="#70a05a" opacity="0.7" />
      <ellipse cx="350" cy="580" rx="38" ry="42" fill="#7aaa62" opacity="0.75" />

      {/* ── 하천 ── */}
      <path
        d="M 145 0 C 140 60 150 110 142 160 C 134 210 118 235 122 290 C 126 345 145 368 140 420 C 135 472 118 498 122 555 C 126 612 142 650 138 680"
        stroke="#7ab8d8"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M 145 0 C 140 60 150 110 142 160 C 134 210 118 235 122 290 C 126 345 145 368 140 420 C 135 472 118 498 122 555 C 126 612 142 650 138 680"
        stroke="#a8d0e8"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* ── 도로망 ── */}
      {/* 주도로 (가로) */}
      <line x1="0" y1="96" x2="400" y2="93" stroke="#f5f0e0" strokeWidth="10" opacity="0.9" />
      <line x1="0" y1="96" x2="400" y2="93" stroke="#e8e4d0" strokeWidth="1" opacity="0.6" />

      <line x1="0" y1="290" x2="400" y2="286" stroke="#f5f0e0" strokeWidth="10" opacity="0.9" />
      <line x1="0" y1="290" x2="400" y2="286" stroke="#e8e4d0" strokeWidth="1" opacity="0.6" />

      <line x1="0" y1="430" x2="400" y2="426" stroke="#f5f0e0" strokeWidth="10" opacity="0.9" />
      <line x1="0" y1="522" x2="400" y2="518" stroke="#f5f0e0" strokeWidth="8" opacity="0.9" />

      {/* 주도로 (세로) */}
      <line x1="90" y1="0" x2="88" y2="680" stroke="#f5f0e0" strokeWidth="10" opacity="0.9" />
      <line x1="90" y1="0" x2="88" y2="680" stroke="#e8e4d0" strokeWidth="1" opacity="0.6" />

      <line x1="200" y1="0" x2="198" y2="680" stroke="#f5f0e0" strokeWidth="10" opacity="0.9" />
      <line x1="200" y1="0" x2="198" y2="680" stroke="#e8e4d0" strokeWidth="1" opacity="0.6" />

      <line x1="305" y1="0" x2="303" y2="680" stroke="#f5f0e0" strokeWidth="8" opacity="0.9" />

      {/* 소로 */}
      <line x1="0" y1="192" x2="400" y2="188" stroke="#ece8d8" strokeWidth="4" opacity="0.7" />
      <line x1="0" y1="345" x2="400" y2="341" stroke="#ece8d8" strokeWidth="4" opacity="0.7" />
      <line x1="0" y1="614" x2="400" y2="610" stroke="#ece8d8" strokeWidth="4" opacity="0.7" />

      {/* ── 주거/상업 구역 (회색 블록) ── */}
      <rect x="205" y="100" width="85" height="82" rx="2" fill="#c8c4b0" opacity="0.7" />
      <rect x="210" y="104" width="16" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="230" y="104" width="18" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="252" y="104" width="14" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="210" y="122" width="20" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="234" y="122" width="16" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="254" y="122" width="18" height="14" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="210" y="140" width="14" height="12" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="228" y="140" width="20" height="12" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="252" y="140" width="16" height="12" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="210" y="156" width="18" height="12" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="232" y="156" width="14" height="12" rx="1" fill="#a8a498" opacity="0.8" />
      <rect x="250" y="156" width="20" height="12" rx="1" fill="#a8a498" opacity="0.8" />

      <rect x="8" y="100" width="74" height="86" rx="2" fill="#c8c4b0" opacity="0.65" />
      <rect x="12" y="104" width="16" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="32" y="104" width="14" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="50" y="104" width="18" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="12" y="120" width="20" height="14" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="36" y="120" width="16" height="14" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="12" y="138" width="16" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="32" y="138" width="20" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="56" y="138" width="14" height="12" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="12" y="154" width="18" height="14" rx="1" fill="#a0a090" opacity="0.7" />
      <rect x="34" y="154" width="14" height="14" rx="1" fill="#a0a090" opacity="0.7" />

      {/* ── 가격 마커 버블 ── */}
      {markers.map((m) => {
        const isSelected = m.listingId && selectedListingId === m.listingId;
        const typeColor =
          m.type === '전' ? '#d97706' :
          m.type === '답' ? '#2563eb' :
          m.type === '임야' ? '#16a34a' :
          '#6b7280';
        const bgColor = isSelected ? typeColor : '#ffffff';
        const textColor = isSelected ? '#ffffff' : typeColor;
        const borderColor = typeColor;

        return (
          <g
            key={m.id}
            onClick={() => onMarkerClick(m)}
            style={{ cursor: 'pointer' }}
          >
            {/* 말풍선 꼬리 */}
            <polygon
              points={`${m.cx - 4},${m.cy + 14} ${m.cx + 4},${m.cy + 14} ${m.cx},${m.cy + 22}`}
              fill={bgColor}
              stroke={borderColor}
              strokeWidth="1"
            />
            {/* 버블 배경 */}
            <rect
              x={m.cx - 28}
              y={m.cy - 14}
              width="56"
              height="28"
              rx="6"
              fill={bgColor}
              stroke={borderColor}
              strokeWidth={isSelected ? 2 : 1.5}
              filter={isSelected ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))'}
            />
            {/* 지목 태그 */}
            <rect
              x={m.cx - 26}
              y={m.cy - 12}
              width="14"
              height="10"
              rx="2"
              fill={isSelected ? 'rgba(255,255,255,0.25)' : typeColor}
            />
            <text
              x={m.cx - 19}
              y={m.cy - 4}
              fontSize="6"
              fontWeight="bold"
              fill={isSelected ? textColor : '#ffffff'}
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {m.type}
            </text>
            {/* 가격 */}
            <text
              x={m.cx + 5}
              y={m.cy + 4}
              fontSize="8"
              fontWeight="bold"
              fill={textColor}
              textAnchor="middle"
              fontFamily="sans-serif"
            >
              {m.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function MapSearchPage({ onNavigate }) {
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [dealFilter, setDealFilter] = useState('전체');
  const [landFilter, setLandFilter] = useState('전체');
  const [showPanel, setShowPanel] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const filteredListings = listings.filter((l) => {
    if (dealFilter !== '전체' && l.dealType !== dealFilter) return false;
    if (landFilter !== '전체' && l.type !== landFilter) return false;
    return true;
  });

  const handleMarkerClick = (marker) => {
    if (marker.listingId) {
      const listing = listings.find((l) => l.id === marker.listingId);
      if (listing) {
        setSelectedListing(listing);
        setShowDetail(true);
        setShowPanel(false);
      }
    }
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setShowDetail(true);
    setShowPanel(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ── 지도 배경 ── */}
      <div className="absolute inset-0">
        <MockMapSVG
          markers={PRICE_MARKERS}
          selectedListingId={selectedListing?.id}
          onMarkerClick={handleMarkerClick}
        />
      </div>

      {/* ── 상단 검색 + 필터 ── */}
      <div className="absolute top-3 left-3 right-3 z-20">
        {/* 검색창 */}
        <div className="bg-white rounded-2xl shadow-lg flex items-center px-3 py-2.5 gap-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="지역, 주소, 지목 검색"
            className="flex-1 text-sm outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          />
          <button className="bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl font-semibold flex-shrink-0">
            검색
          </button>
        </div>

        {/* 필터 칩 */}
        <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {DEAL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setDealFilter(t)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${
                dealFilter === t
                  ? 'bg-green-700 text-white border-green-700 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 shadow-sm'
              }`}
            >
              {t}
            </button>
          ))}
          <div className="w-px bg-gray-300 mx-0.5 self-stretch flex-shrink-0" />
          {LAND_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setLandFilter(t)}
              className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-semibold border transition-all ${
                landFilter === t
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 shadow-sm'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── 매물 목록 토글 버튼 ── */}
      <button
        onClick={() => { setShowPanel(!showPanel); setShowDetail(false); }}
        className="absolute z-20 bg-white rounded-xl shadow-md flex items-center gap-1.5 px-3 py-2"
        style={{ top: '130px', left: '12px' }}
      >
        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
        </svg>
        <span className="text-xs font-bold text-green-700">{filteredListings.length}건</span>
      </button>

      {/* ── 지도 컨트롤 (우측) ── */}
      <div className="absolute z-20 flex flex-col gap-2" style={{ bottom: '140px', right: '12px' }}>
        <button className="bg-white rounded-xl shadow-md w-9 h-9 flex items-center justify-center text-gray-600 font-bold text-xl hover:bg-gray-50 leading-none">
          +
        </button>
        <button className="bg-white rounded-xl shadow-md w-9 h-9 flex items-center justify-center text-gray-600 font-bold text-xl hover:bg-gray-50 leading-none">
          −
        </button>
        <button className="bg-white rounded-xl shadow-md w-9 h-9 flex items-center justify-center text-green-700 hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* ── 범례 ── */}
      <div className="absolute z-20 bg-white rounded-xl shadow-md px-3 py-2" style={{ bottom: '140px', left: '12px' }}>
        <p className="text-xs font-bold text-gray-600 mb-1.5">지목</p>
        {[
          { color: 'bg-amber-500', label: '전' },
          { color: 'bg-blue-600', label: '답' },
          { color: 'bg-green-600', label: '임야' },
          { color: 'bg-gray-500', label: '대지' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 mb-1 last:mb-0">
            <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* ── 매물 목록 패널 (하단 슬라이드업) ── */}
      <div
        className={`absolute left-0 right-0 bottom-0 z-30 transition-transform duration-300 ${
          showPanel ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '65%' }}
      >
        <div className="bg-white rounded-t-2xl shadow-2xl flex flex-col" style={{ maxHeight: '65vh' }}>
          {/* 핸들 */}
          <div className="flex justify-center pt-2.5 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* 헤더 */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-sm">매물 목록</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                {filteredListings.length}건
              </span>
            </div>
            <button onClick={() => setShowPanel(false)} className="text-gray-400 p-1 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* 목록 */}
          <div className="overflow-y-auto flex-1">
            {filteredListings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <span className="text-3xl mb-2">🔍</span>
                <p className="text-sm">조건에 맞는 매물이 없습니다</p>
              </div>
            ) : (
              filteredListings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => handleListingClick(listing)}
                  className={`w-full text-left px-4 py-3.5 border-b border-gray-50 hover:bg-green-50 transition-colors ${
                    selectedListing?.id === listing.id
                      ? 'bg-green-50 border-l-3 border-l-green-600'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1.5 mb-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${LAND_TYPE_COLORS[listing.type] || 'bg-gray-100 text-gray-700'}`}>
                          {listing.type}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${
                          listing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {listing.dealType}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-800 truncate mb-0.5">
                        {listing.address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {listing.area.toLocaleString()}㎡ · 약 {Math.round(listing.area / 3.3)}평
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-green-700">
                        {listing.dealType === '매매'
                          ? formatPrice(listing.price)
                          : `월 ${formatPrice(listing.rentPrice)}`}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{listing.createdAt}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── 매물 상세 바텀시트 ── */}
      {showDetail && selectedListing && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <div className="bg-white rounded-t-2xl shadow-2xl border-t border-gray-100">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            <div className="px-4 pb-5">
              {/* 태그 + 닫기 */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${LAND_TYPE_COLORS[selectedListing.type] || 'bg-gray-100 text-gray-700'}`}>
                    {selectedListing.type}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    selectedListing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedListing.dealType}
                  </span>
                </div>
                <button
                  onClick={() => { setShowDetail(false); setSelectedListing(null); }}
                  className="text-gray-400 p-0.5 hover:text-gray-600 -mt-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 주소 / 면적 */}
              <p className="text-sm font-bold text-gray-900 mb-0.5">{selectedListing.address}</p>
              <p className="text-xs text-gray-500 mb-3">
                {selectedListing.area.toLocaleString()}㎡ · 약 {Math.round(selectedListing.area / 3.3)}평
              </p>

              {/* 가격 + 상세보기 */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">
                    {selectedListing.dealType === '매매' ? '매매가' : '월 임대료'}
                  </p>
                  <p className="text-xl font-bold text-green-700">
                    {selectedListing.dealType === '매매'
                      ? formatPrice(selectedListing.price)
                      : `월 ${formatPrice(selectedListing.rentPrice)}`}
                  </p>
                  {selectedListing.description && (
                    <p className="text-xs text-gray-500 mt-1 max-w-48 truncate">{selectedListing.description}</p>
                  )}
                </div>
                <button
                  onClick={() => { onNavigate('detail', selectedListing); setShowDetail(false); }}
                  className="bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-800 transition-colors flex-shrink-0"
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
