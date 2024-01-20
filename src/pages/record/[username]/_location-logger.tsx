import type { FC } from "react";
import { useState, useEffect } from "react";
import type { LatLngExpression } from "leaflet";

type Props = {
  location?: LatLngExpression;
  setLocation: (location: LatLngExpression) => void;
};

export const LocationLogger: FC<Props> = ({ location, setLocation }) => {
  const [watchId, seWatchId] = useState<number | undefined>(undefined);

  /**
   * 初回レンダリング時のみ実行
   */
  useEffect(() => {
    // 位置情報の取得
    const id = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
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
      }
    };
  }, []);

  return undefined;
};
