import React, { useEffect, useRef } from 'react';

const SimpleNaverMap = () => {
    const mapRef = useRef(null);
    const lat = 35.8467508; // 위도
    const lng = 128.583211; // 경도

    useEffect(() => {
        const { naver } = window;
        if (mapRef.current && naver) {
            const location = new naver.maps.LatLng(lat, lng);
            const map = new naver.maps.Map(mapRef.current, {
                center: location,
                zoom: 17, // 지도 확대 정도
            });
            new naver.maps.Marker({
                position: location,
                map,
            });
        }
    }, []);

    return (
        <div ref={mapRef} style={{ width: "500px", height: "500px" }}></div>
    );
};

export default SimpleNaverMap;
