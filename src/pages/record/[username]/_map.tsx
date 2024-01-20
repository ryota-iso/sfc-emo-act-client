import type { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import { LoadingIcon } from "@/components/ui/loading-icon";

type Props = {
  currentLocation: LatLngExpression;
  isLoading: boolean;
};

const ChangeView = ({ center }: { center: LatLngExpression }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

export const Map: FC<Props> = ({ currentLocation, isLoading }) => {
  return (
    <>
      {isLoading && (
        <span className="absolute flex justify-center items-center inset-0 backdrop-blur-md m z-[9999]">
          <LoadingIcon />
        </span>
      )}
      <MapContainer center={currentLocation} zoom={17} className="h-dvh w-full">
        <ChangeView center={currentLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
