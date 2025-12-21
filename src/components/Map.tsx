import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom sage green marker using SVG
const customMarkerSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path fill="#7E8C77" stroke="#5A6553" stroke-width="1" filter="url(#shadow)"
    d="M12 0C5.4 0 0 5.4 0 12c0 7.2 12 24 12 24s12-16.8 12-24C24 5.4 18.6 0 12 0z"/>
  <circle cx="12" cy="12" r="5" fill="#F5F5F5"/>
</svg>
`;

const customIcon = new DivIcon({
  html: customMarkerSvg,
  className: "custom-marker",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
});

// Guwahati coordinates
const position: [number, number] = [26.1445, 91.7362];

const Map = () => {
  useEffect(() => {
    // Fix for leaflet default icon issue
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="w-full h-full rounded-3xl overflow-hidden border border-border relative">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="dark-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-center p-2">
              <strong style={{ color: "#7E8C77" }}>Cozi Cars</strong>
              <br />
              <span style={{ color: "#888" }}>Premium Car Detailing</span>
              <br />
              <span style={{ color: "#888" }}>Guwahati, Assam</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      {/* Gradient overlay for seamless blend */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl border border-primary/10" />
    </div>
  );
};

export default Map;
