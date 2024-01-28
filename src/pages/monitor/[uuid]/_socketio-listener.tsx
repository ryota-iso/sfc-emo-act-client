import type { FC } from "react";
import type { LatLngExpression } from "leaflet";
import { monitorSocket as socket } from "@/libs/socketio";

type Props = {
  setLocation: (location: LatLngExpression) => void;
  setAcceleration: (acceleration: DeviceMotionEventAcceleration) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const SocketIOListener: FC<Props> = ({
  setLocation,
  setAcceleration,
  setIsLoading,
}) => {
  // 接続時
  socket.on("connect", () => {
    console.log("connect");
  });

  // 位置情報取得時
  socket.on("locationUpdate", (location: LatLngExpression) => {
    console.log("locationUpdate", location);
    setLocation(location);
    setIsLoading(false);
  });

  // 切断時
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  return undefined;
};
