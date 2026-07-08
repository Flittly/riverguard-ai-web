import { useEffect, useRef } from "react";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function HomeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !instanceRef.current) {
      instanceRef.current = L.map(mapRef.current, {
        center: [30.5, 112.0], // 长江中游
        zoom: 6,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(instanceRef.current);
    }

    return () => {
      instanceRef.current?.remove();
      instanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: 420, borderRadius: 22 }} />;
}