const KAKAO_KEY = process.env.REACT_APP_KAKAO_MAP_KEY;

export function loadKakaoMapScript(callback) {
  if (window.kakao && window.kakao.maps) {
    callback();
    return;
  }
  const existing = document.querySelector('script[data-kakao-sdk="true"]');
  if (existing) {
    const check = () => {
      if (window.kakao && window.kakao.maps) callback();
      else setTimeout(check, 200);
    };
    check();
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('data-kakao-sdk', 'true');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`;
  script.onload = () => {
    if (!window.kakao || !window.kakao.maps) return;
    window.kakao.maps.load(callback);
  };
  document.head.appendChild(script);
}

export function searchAddress(query) {
  return Promise.resolve({ documents: [] });
}

export default { loadKakaoMapScript, searchAddress };
