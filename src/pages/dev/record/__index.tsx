import { useState, useEffect } from "react";

import { RecordButton } from "./_record-button";
import { DownloadButton } from "./_download-button";
import { LogViewer } from "./_log-viewer";

export type AccelData = {
  x: number;
  y: number;
  z: number;
  timestamp: number;
};

export type GPSData = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export default () => {
  const [isRecording, setIsRecording] = useState(false);
  const [accelData, setAccelData] = useState<AccelData[]>([]);
  const [gpsData, setGpsData] = useState<GPSData[]>([]);

  /**
   * 記録開始・停止時の処理
   */
  const handleRecord = () => {
    // 記録開始, 停止フラグを反転
    setIsRecording((prev) => !prev);
  };

  /**
   * 加速度の記録
   */
  const recordAccelData = (event: DeviceMotionEvent) => {
    if (!event.acceleration) return;
    const { x, y, z } = event.acceleration;
    setAccelData((prevData): AccelData[] => [
      ...prevData,
      { timestamp: new Date().getTime(), x, y, z } as AccelData,
    ]);
  };

  /**
   * GPSの記録
   */
  const [gpsWatchId, setGpsWatchId] = useState<number | undefined>(undefined);
  const recordGPSData = () => {
    if (isRecording) {
      const watchid = navigator.geolocation.watchPosition(
        (position) => {
          if (!isRecording) return;

          const { latitude, longitude } = position.coords;
          const timestamp = position.timestamp;
          setGpsData((prevData) => [
            ...prevData,
            { latitude, longitude, timestamp },
          ]);
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
      setGpsWatchId(watchid);
    } else {
      if (gpsWatchId) {
        navigator.geolocation.clearWatch(gpsWatchId);
      }
    }
  };

  /**
   * GPSの記録を停止する
   */
  useEffect(() => {
    return () => {
      if (gpsWatchId !== undefined) {
        navigator.geolocation.clearWatch(gpsWatchId);
      }
    };
  }, [gpsWatchId]);

  /**
   * 加速度の記録を開始・停止状態に応じた処理
   */
  useEffect(() => {
    // 加速度の記録
    if (isRecording) {
      window.addEventListener("devicemotion", recordAccelData);
    } else {
      window.removeEventListener("devicemotion", recordAccelData);
    }

    // GPSの記録
    recordGPSData();

    return () => {
      window.removeEventListener("devicemotion", recordAccelData);
    };
  }, [isRecording]);

  /**
   * 加速度データに最も近いGPSデータを取得するユーティリティ関数
   * @param timestamp 加速度データのタイムスタンプ
   */
  const findClosestGPSData = (timestamp: number) => {
    if (!gpsData) return;

    // 二分探索でtimestampに最も近いGPSデータを探す
    let closestGPS = gpsData[0];
    let minDiff = Math.abs(gpsData[0].timestamp - timestamp);

    for (let i = 1; i < gpsData.length; i++) {
      let diff = Math.abs(gpsData[i].timestamp - timestamp);
      if (diff < minDiff) {
        minDiff = diff;
        closestGPS = gpsData[i];
      }
    }
    return closestGPS;
  };

  /**
   * CSVのダウンロード
   */
  const downloadCSV = () => {
    // accelDataをCSVに変換
    const csvRows = accelData.map((accel) => {
      const closestGPS = findClosestGPSData(accel.timestamp);
      if (!closestGPS) return;

      return `${accel.timestamp},,${accel.x},${accel.y},${accel.z},,${
        closestGPS.latitude || ""
      },${closestGPS.longitude || ""}`;
    });

    // CSVのヘッダーを追加
    const csvHeader = "timestamp,,x,y,z,,latitude,longitude";
    csvRows.unshift(csvHeader);
    // CSVの文字列を作成
    const csvString = csvRows.join("\n");

    // Blobを作成
    const blob = new Blob([csvString], { type: "text/csv" });
    // ダウンロード
    const url = URL.createObjectURL(blob);
    const temporaryDom = document.createElement("a");
    temporaryDom.href = url;
    temporaryDom.download = "acceleration_and_gps.csv";
    temporaryDom.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">[開発用] GPSと加速度の記録</h1>
      <div className="flex mt-6">
        <RecordButton
          className="mr-2"
          onClick={handleRecord}
          isRecording={isRecording}
        />
        <DownloadButton onClick={downloadCSV} />
      </div>
      <LogViewer
        className="mt-6"
        accelData={accelData.slice(-1)[0]}
        gpsData={gpsData.slice(-1)[0]}
      />
    </main>
  );
};
