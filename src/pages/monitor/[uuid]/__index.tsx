import { useState, useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import type { Status } from "@/components/_status-badge";
import { monitorSocket as socket } from "@/lib/socketio";

import { BackToTopButton } from "@/components/back-to-top-button";
import { StatusBadge } from "@/components/_status-badge";
import { Map } from "@/components/_map";
import { AccelerationViewer } from "@/components/_acceleration-viewer";
import { SocketIOListener } from "./_socketio-listener";

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<LatLngExpression>([
    35.681236, 139.767125,
  ]);
  const [acceleration, setAcceleration] =
    useState<DeviceMotionEventAcceleration>();
  const [status, setStatus] = useState<Status>("未検出");

  useEffect(() => {
    socket.connect();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <>
      <BackToTopButton className="fixed top-4 left-4 z-[500]" />
      <StatusBadge status={status} className="fixed top-4 right-4 z-[500]" />
      <Map isLoading={isLoading} currentLocation={location} />
      <AccelerationViewer
        className="fixed bottom-4 left-4 z-[500]"
        acceleration={acceleration}
      />
      <SocketIOListener setLocation={setLocation} setIsLoading={setIsLoading} />
    </>
  );
};
