import type { FC } from "react";
import { recordSocket as socket } from "@/libs/socketio";

type Props = {};

export const SocketIOListener: FC<Props> = () => {
  // 接続時
  socket.on("connect", () => {
    console.log("connect");
  });

  // 切断時
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  return undefined;
};
