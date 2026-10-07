import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const NEARBY_UNIVERSITIES = [
  { id: "aston", name: "Aston University", distance: "0.3 mi", walkTime: "5 min", transitTime: "3 min", lat: 52.4867, lng: -1.8899 },
  { id: "uob", name: "University of Birmingham", distance: "2.4 mi", walkTime: "45 min", transitTime: "16 min", lat: 52.4508, lng: -1.9305 },
  { id: "bcu", name: "Birmingham City University", distance: "0.5 mi", walkTime: "8 min", transitTime: "5 min", lat: 52.4851, lng: -1.8863 },
  { id: "ucb", name: "University College Birmingham", distance: "0.8 mi", walkTime: "14 min", transitTime: "7 min", lat: 52.4812, lng: -1.9056 },
];

const POI_DATA = {
  grocery: [
    { name: "Tesco Express", distance: "0.1 mi", lat: 52.4865, lng: -1.8915 },
    { name: "Sainsbury's Local", distance: "0.3 mi", lat: 52.4842, lng: -1.8920 },
  ],
  transit: [
    { name: "Moor Street Station", distance: "0.4 mi", lat: 52.4789, lng: -1.8928 },
    { name: "Vauxhall Rd Bus Stop", distance: "0.05 mi", lat: 52.4860, lng: -1.8890 },
  ],
  walk: [
    { name: "City Center Canal Walk", distance: "0.2 mi", lat: 52.4845, lng: -1.8885 },
    { name: "Eastside City Park", distance: "0.3 mi", lat: 52.4830, lng: -1.8860 },
  ],
  university: NEARBY_UNIVERSITIES,
};

export default function NearbyMapAndTransit({ property }) {
  const [viewMode, setViewMode] = useState("map"); // "map" or "street"
  const [selectedUni, setSelectedUni] = useState(NEARBY_UNIVERSITIES[0].id);
  const [activeCategory, setActiveCategory] = useState("university");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const propLat = property?.latitude || 52.4862;
  const propLng = property?.longitude || -1.8904;

  const currentUni = NEARBY_UNIVERSITIES.find((u) => u.id === selectedUni) || NEARBY_UNIVERSITIES[0];

  useEffect(() => {
    if (viewMode !== "map" || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [propLat, propLng],
        zoom: 14,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Property Main Marker (Custom HTML icon)
    const propertyIcon = L.divIcon({
      className: "custom-property-pin",
      html: `
        <div style="background-color: #5fa89b; color: white; padding: 6px 12px; border-radius: 9999px; font-weight: bold; font-size: 11px; white-space: nowrap; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); border: 2px solid white; display: flex; align-items: center; gap: 4px;">
          <span>📍</span>
          <span>${property?.title || "Compass, Birmingham"}</span>
        </div>
      `,
      iconSize: [160, 36],
      iconAnchor: [80, 18],
    });

    const propMarker = L.marker([propLat, propLng], { icon: propertyIcon })
      .addTo(map)
      .bindPopup(`<b>${property?.title || "Compass, Birmingham"}</b><br/>${property?.address || "Birmingham"}`)
      .openPopup();

    markersRef.current.push(propMarker);

    // Active Category POI markers
    const pois = POI_DATA[activeCategory] || [];
    pois.forEach((poi) => {
      const poiIcon = L.divIcon({
        className: "custom-poi-pin",
        html: `
          <div style="background-color: #ffffff; color: #374151; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.15); border: 1px solid #7bbcb0; display: flex; align-items: center; gap: 3px;">
            <span style="color: #7bbcb0;">•</span>
            <span>${poi.name}</span>
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [60, 12],
      });

      const poiMarker = L.marker([poi.lat, poi.lng], { icon: poiIcon })
        .addTo(map)
        .bindPopup(`<b>${poi.name}</b><br/>${poi.distance} away`);

      markersRef.current.push(poiMarker);
    });

    map.invalidateSize();
  }, [viewMode, propLat, propLng, activeCategory, property]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
      {/* Top Header with Map/Street View switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-gray-900">Nearby Locations and Map</h3>
        <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50 self-start sm:self-auto">
          <button
            onClick={() => setViewMode("map")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === "map" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode("street")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewMode === "street" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Street View
          </button>
        </div>
      </div>

      {/* University Distance Selector & POI Chips */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-gray-100">
        {/* Left: Distance from University */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              View Distance from University
            </span>
            <select
              value={selectedUni}
              onChange={(e) => setSelectedUni(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 bg-white outline-none focus:border-[#7bbcb0] font-medium"
            >
              {NEARBY_UNIVERSITIES.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>

          {/* Commute summary badges */}
          <div className="flex items-center gap-2 pt-4 sm:pt-0">
            <div className="bg-[#7bbcb0]/10 text-[#5fa89b] text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#7bbcb0]/30">
              <DirectionsWalkOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{currentUni.walkTime} walk ({currentUni.distance})</span>
            </div>
            <div className="bg-sky-50 text-sky-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-sky-200">
              <DirectionsBusOutlinedIcon sx={{ fontSize: 16 }} />
              <span>{currentUni.transitTime} bus</span>
            </div>
          </div>
        </div>

        {/* Right: Category Filter Icons (as in Design) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveCategory("grocery")}
            title="Groceries & Supermarkets"
            className={`p-2 rounded-lg border transition ${
              activeCategory === "grocery"
                ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            onClick={() => setActiveCategory("transit")}
            title="Bus & Train Stations"
            className={`p-2 rounded-lg border transition ${
              activeCategory === "transit"
                ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <DirectionsBusOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            onClick={() => setActiveCategory("walk")}
            title="Walking Routes & Parks"
            className={`p-2 rounded-lg border transition ${
              activeCategory === "walk"
                ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <DirectionsWalkOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
          <button
            onClick={() => setActiveCategory("university")}
            title="University Campuses"
            className={`p-2 rounded-lg border transition ${
              activeCategory === "university"
                ? "bg-[#7bbcb0] text-white border-[#7bbcb0]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <SchoolOutlinedIcon sx={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {/* Map or Street View Container */}
      <div className="relative h-96 w-full rounded-xl overflow-hidden border border-gray-100">
        {viewMode === "map" ? (
          <div ref={mapContainerRef} className="h-full w-full z-0" />
        ) : (
          <div className="relative h-full w-full bg-gray-900 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1543832923-44667a44c804?auto=format&fit=crop&w=1600&q=80"
              alt="Street View"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex flex-col justify-end p-6 text-white space-y-2">
              <span className="bg-[#5fa89b] text-white text-xs font-bold px-3 py-1 rounded-full self-start">
                360° Street Level View
              </span>
              <h4 className="text-lg font-bold">{property?.address || "Vauxhall Rd, Birmingham, UK"}</h4>
              <p className="text-xs text-gray-200 max-w-lg">
                Safe, pedestrian-friendly avenue with direct paved walkways leading to Aston University and Birmingham City Center.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
