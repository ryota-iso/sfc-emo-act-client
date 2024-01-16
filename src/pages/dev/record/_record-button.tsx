import type { FC } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

type Props = {
  className?: string;
  onClick?: () => void;
  isRecording: boolean;
};

export const RecordButton: FC<Props> = ({
  className = "",
  onClick,
  isRecording,
}) => {
  return (
    <Button className={className} onClick={onClick}>
      {isRecording ? (
        <>
          <Pause size={14} className="mr-2" />
          記録停止
        </>
      ) : (
        <>
          <Play size={14} strokeWidth={3} className="mr-2" />
          記録開始
        </>
      )}
    </Button>
  );
};
