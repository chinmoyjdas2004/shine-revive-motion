import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for leaflet default icon issue - run immediately
const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png";

// Create custom sage green marker icon
const customIcon = new Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Guwahati coordinates
const position: [number, number] = [26.1445, 91.7362];

const Map = () => {
  useEffect(() => {
    // Fix for leaflet default icon issue
    delete (Icon.Default.prototype as any)._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
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
            <strong style={{ color: "#7E8C77" }}>Cozi Cars</strong>
            <br />
            <span style={{ color: "#888" }}>Premium Car Detailing</span>
            <br />
            <span style={{ color: "#888" }}>Guwahati, Assam</span>
          </Popup>
        </Marker>
      </MapContainer>
      <div className="absolute inset-0 pointer-events-none rounded-3xl border border-primary/10" />
    </div>
  );
};

export default Map;
