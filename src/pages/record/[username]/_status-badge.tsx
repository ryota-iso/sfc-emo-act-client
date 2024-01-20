import type { FC } from "react";
import { Badge } from "@/components/ui/badge";

export type Status = "停止" | "歩行" | "バス" | "電車" | "未検出";

type Props = {
  status: Status;
  className?: string;
};

export const StatusBadge: FC<Props> = ({
  status = "未検出",
  className = "",
}) => {
  return <Badge className={className}>行動: {status}</Badge>;
};
