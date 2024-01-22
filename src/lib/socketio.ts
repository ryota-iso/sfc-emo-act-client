import type { Socket } from "socket.io-client";
import type { LatLngExpression } from "leaflet";
import io from "socket.io-client";

export type ServerToClientEvents = {
  locationUpdate: (location: LatLngExpression) => void; // 位置情報の更新を受信
  roomDelete: () => void; //                               ルーム削除を受信
};

export type ClientToServerEvents = {
  locationUpdate: (location: LatLngExpression) => void; // 位置情報の更新を送信
};

export type SocketIOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const URL: string = import.meta.env.SOCKET_URL || "http://localhost:4000";

export const recordSocket: SocketIOSocket = io(URL, {
  query: {
    isHost: true,
  },
  autoConnect: false,
});

export const monitorSocket: SocketIOSocket = io(URL, {
  query: {
    roomUUID: "test",
  },
  autoConnect: false,
});
