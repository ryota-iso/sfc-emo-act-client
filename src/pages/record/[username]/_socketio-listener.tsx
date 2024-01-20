import { useEffect } from "react";
import type { FC } from "react";
import { socket } from "@/lib/socketio";

type Props = {};

export const SocketioListener: FC<Props> = () => {
  // 接続, 切断
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

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
