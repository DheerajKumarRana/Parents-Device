"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

const Map = ({ lat, lng, driverName }) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{height: "400px", width: "100%"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]}>
        <Popup>
          {driverName}'s Bus
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
