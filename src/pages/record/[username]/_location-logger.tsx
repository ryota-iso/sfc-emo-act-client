import type { FC } from "react";
import { useState, useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import { recordSocket as socket } from "@/libs/socketio";

type Props = {
  location?: LatLngExpression;
  setLocation: (location: LatLngExpression) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const LocationLogger: FC<Props> = ({
  location,
  setLocation,
  setIsLoading,
}) => {
  const [watchId, seWatchId] = useState<number | undefined>(undefined);

  useEffect(() => {
    // 位置情報の取得
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (socket) {
          console.log("[LocationLogger] emit locationUpdate");
          socket.emit("locationUpdate", [latitude, longitude]);
        } else {
          console.log("[LocationLogger] socket is undefined");
        }
        setLocation([latitude, longitude]);
        setIsLoading(false);
        console.log("[LocationLogger] update location: ", location);
      },
      (error) => {
        console.warn(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    // watchIdを記録
    seWatchId(id);

    // コンポーネントのアンマウント時に実行
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        console.log("[LocationLogger] clear geolocation watch");
      }
    };
  }, []);

  return undefined;
};
