import type { Socket } from "socket.io-client";
import type { LatLngExpression } from "leaflet";
import io from "socket.io-client";
import { env } from "@/libs/env";

type ServerToClientEvents = {
  // 位置情報の更新を受信
  locationUpdate: (location: LatLngExpression) => void;
  // ルーム削除を受信
  roomDelete: () => void;
};

type ClientToServerEvents = {
  // 位置情報の更新を送信
  locationUpdate: (location: LatLngExpression) => void;
};

export type SocketIOSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const URL: string = env.SOCKET_URL;

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
