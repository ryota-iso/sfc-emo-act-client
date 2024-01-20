import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import { Map } from "./_map";
import { LocationLogger } from "./_location-logger";

export default () => {
  const [location, setLocation] = useState<LatLngExpression>([
    35.681236, 139.767125,
  ]);
  const position: LatLngExpression = [35.681236, 139.767125];
  return (
    <>
      <Map currentLocation={location} />
      <LocationLogger location={location} setLocation={setLocation} />
    </>
  );
};
