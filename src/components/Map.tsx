import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Guwahati coordinates
const position: [number, number] = [26.1445, 91.7362];

function getCssHslVar(name: string, fallback: string) {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return raw ? `hsl(${raw})` : fallback;
  } catch {
    return fallback;
  }
}

const Map = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const primary = getCssHslVar("--primary", "hsl(96 10% 51%)");

    const map = L.map(containerRef.current, {
      center: position,
      zoom: 14,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const marker = L.circleMarker(position, {
      radius: 8,
      color: primary,
      weight: 2,
      fillColor: primary,
      fillOpacity: 0.9,
    }).addTo(map);

    marker.bindPopup(
      `<div style="text-align:center;padding:6px 8px;">
        <div style="font-weight:700;color:${primary}">Cozi Cars</div>
        <div style="color:hsl(0 0% 60%);font-size:12px">Premium Car Detailing</div>
        <div style="color:hsl(0 0% 60%);font-size:12px">Guwahati, Assam</div>
      </div>`,
      { closeButton: true },
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-border relative">
      <div ref={containerRef} className="h-full w-full" />
      <div className="absolute inset-0 pointer-events-none rounded-3xl border border-primary/10" />
    </div>
  );
};

export default Map;
