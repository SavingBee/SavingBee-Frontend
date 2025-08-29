import { useEffect, useRef } from "react";

const MY_KAKAO_KEY = "e7b21a9532a9fd0e67c3bc322a333b75";
const KAKAO_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${MY_KAKAO_KEY}&autoload=false&libraries=services`;

export default function MapOnly() {
  const mapRef = useRef(null);

  useEffect(() => {
    // SDK 동적 로드
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = () => {
      // SDK 로드 완료 후
      window.kakao.maps.load(async () => {
        const pos = await getCurrentPositionOrFallback();

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(pos.lat, pos.lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 내 위치 마커
        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(pos.lat, pos.lng),
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-72 rounded-xl border border-gray-200"
    />
  );
}

function getCurrentPositionOrFallback(): Promise<{ lat: number; lng: number }> {
  const FALLBACK = { lat: 37.561, lng: 126.981 }; // 한국은행 본관
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(FALLBACK);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => resolve(FALLBACK),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  });
}
