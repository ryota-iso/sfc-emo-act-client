import type { FC } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/libs/utils";

type Props = {
  size?: number;
  className?: string;
};

export const LoadingIcon: FC<Props> = ({ size = 32, className }) => {
  return <Loader2 size={size} className={cn("animate-spin", className)} />;
};
