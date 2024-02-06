import type { FC } from "react";
import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";

type Props = {
  setAcceleration: (acceleration: DeviceMotionEventAcceleration) => void;
  location: LatLngExpression;
};

export const AccelerationLogger: FC<Props> = ({
  setAcceleration,
  location,
}) => {
  useEffect(() => {
    // 加速度の記録
    const recordAccelData = (event: DeviceMotionEvent) => {
      if (!event.acceleration) return;
      const { x, y, z } = event.acceleration;
      console.log("[AccelerationLogger] update acceleration: ", { x, y, z });
      // stateを更新
      setAcceleration({ x, y, z });
    };

    // パーミッションを確認し、加速度の記録を開始
    (async () => {
      const hasPermission = await requestMotionPermission();
      if (hasPermission) {
        window.addEventListener("devicemotion", recordAccelData);
      } else {
        alert("権限がありません");
      }
    })();

    // 加速度の記録を停止
    return () => {
      window.removeEventListener("devicemotion", recordAccelData);
    };
  }, []);

  return undefined;
};

/**
 * 加速度取得権限のリクエスト
 */
async function requestMotionPermission() {
  try {
    const permission = (DeviceMotionEvent as any).requestPermission;
    if (typeof permission === "function") {
      const permissionState = await permission();
      return permissionState === "granted";
    } else {
      // ブラウザが requestPermission メソッドをサポートしていない場合、'granted' と見なす
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
