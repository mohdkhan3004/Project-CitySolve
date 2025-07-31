import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect, selectedLocation }) => {
  const defaultCenter: [number, number] = [17.385044, 78.486671]; // Hyderabad
  const mapRef = useRef<L.Map | null>(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  useEffect(() => {
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSelect(latitude, longitude);
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    }
  }, [onLocationSelect]);

  return (
    <div className="h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-600">
      <MapContainer
        center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : defaultCenter}
        zoom={selectedLocation ? 15 : 12}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />
        {selectedLocation && (
          <Marker 
            position={[selectedLocation.lat, selectedLocation.lng]}
            draggable={true}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target as L.Marker;
                const position = marker.getLatLng();
                onLocationSelect(position.lat, position.lng);
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;