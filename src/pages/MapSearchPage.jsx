import { useEffect, useRef, useState } from 'react';
import { listings } from '../data/dummyData';
import { formatPrice, LAND_TYPE_COLORS } from '../utils/format';

const DEFAULT_CENTER = { lat: 36.5, lng: 127.5 };

export default function MapSearchPage({ onNavigate }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    const kakao = window.kakao;
    if (!kakao?.maps) {
      setMapLoaded(false);
      return;
    }

    kakao.maps.load(() => {
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng),
        level: 7,
      });
      mapInstanceRef.current = map;
      setMapLoaded(true);

      listings.forEach((listing) => {
        if (!listing.lat || !listing.lng) return;

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(listing.lat, listing.lng),
          map,
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:8px;font-size:12px;max-width:160px">
            <strong>${listing.address.split(' ').slice(-2).join(' ')}</strong><br/>
            ${listing.type} · ${listing.dealType}<br/>
            <span style="color:#16a34a;font-weight:bold">${formatPrice(listing.price || listing.rentPrice)}</span>
          </div>`,
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(map, marker);
          setSelectedListing(listing);
        });

        kakao.maps.event.addListener(map, 'click', () => {
          infowindow.close();
        });
      });
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim() || !mapInstanceRef.current) return;

    const kakao = window.kakao;
    if (!kakao?.maps?.services) return;

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchInput, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        mapInstanceRef.current.setCenter(coords);
        mapInstanceRef.current.setLevel(5);
      }
    });
  };

  return (
    <div className="relative h-full">
      {/* 검색 오버레이 */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="주소 검색..."
            className="flex-1 px-4 py-2.5 rounded-xl shadow-md text-sm outline-none focus:ring-2 focus:ring-primary-400"
          />
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2.5 rounded-xl shadow-md font-medium text-sm hover:bg-primary-700 transition-colors"
          >
            검색
          </button>
        </form>
      </div>

      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full bg-gray-200" />

      {/* 카카오 API 미로드 시 폴백 */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <div className="text-center px-6">
            <span className="text-5xl mb-4 block">🗺️</span>
            <p className="font-bold text-gray-700 mb-2">카카오맵을 불러오는 중...</p>
            <p className="text-sm text-gray-500 mb-6">API 키를 설정하면 실제 지도가 표시됩니다</p>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 text-left max-w-sm">
              <p className="text-xs font-bold text-gray-700 mb-3">등록된 매물 ({listings.length}건)</p>
              {listings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => setSelectedListing(listing)}
                  className="w-full text-left py-2.5 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-1 rounded transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-gray-900">{listing.address.split(' ').slice(-3).join(' ')}</p>
                      <p className="text-xs text-gray-500">{listing.type} · {listing.area.toLocaleString()}㎡</p>
                    </div>
                    <span className={`text-xs font-bold ${listing.dealType === '매매' ? 'text-blue-600' : 'text-purple-600'}`}>
                      {formatPrice(listing.price || listing.rentPrice)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 범례 */}
      {showLegend && (
        <div className="absolute top-20 right-4 z-10 bg-white rounded-xl shadow-md p-3 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-gray-700">범례</span>
            <button onClick={() => setShowLegend(false)} className="text-gray-400 ml-3 hover:text-gray-600">✕</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { color: 'bg-red-400 border-red-500', label: '300m 이내 축사 (위험)' },
              { color: 'bg-orange-400 border-orange-500', label: '500m 이내 축사 (주의)' },
              { color: 'bg-yellow-400 border-yellow-500', label: '1km 이내 축사 (참고)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full opacity-50 border ${color}`} />
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 선택된 매물 팝업 */}
      {selectedListing && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LAND_TYPE_COLORS[selectedListing.type] || 'bg-gray-100 text-gray-700'}`}>
                    {selectedListing.type}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    selectedListing.dealType === '매매' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedListing.dealType}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{selectedListing.address}</p>
                <p className="text-xs text-gray-500 mt-0.5">{selectedListing.area.toLocaleString()}㎡</p>
              </div>
              <button onClick={() => setSelectedListing(null)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-primary-700">
                {selectedListing.dealType === '매매'
                  ? formatPrice(selectedListing.price)
                  : `월 ${formatPrice(selectedListing.rentPrice)}`}
              </p>
              <button
                onClick={() => onNavigate('detail', selectedListing)}
                className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                상세보기 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
