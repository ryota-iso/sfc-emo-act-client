import { io } from "socket.io-client";

// TODO: 環境変数の設定
export const socket = io("http://localhost:4000");
