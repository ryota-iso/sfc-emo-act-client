import { useState } from "react";
import type { LatLngExpression } from "leaflet";
import type { Status } from "./_status-badge";

import { BackToTopButton } from "@/components/back-to-top-button";
import { StatusBadge } from "./_status-badge";
import { Map } from "./_map";
import { LocationLogger } from "./_location-logger";
import { AccelerationLogger } from "./_acceleration-logger";

export default () => {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<LatLngExpression>([
    35.681236, 139.767125,
  ]);
  const [acceleration, setAcceleration] =
    useState<DeviceMotionEventAcceleration>();
  const [status, setStatus] = useState<Status>("未検出");

  return (
    <>
      <BackToTopButton className="fixed top-4 left-4 z-[500]" />
      <StatusBadge status={status} className="fixed top-4 right-4 z-[500]" />
      <Map isLoading={isLoading} currentLocation={location} />
      <LocationLogger
        location={location}
        setLocation={setLocation}
        setIsLoading={setisLoading}
      />
      <AccelerationLogger
        acceleration={acceleration}
        setAcceleration={setAcceleration}
      />
    </>
  );
};
