import { Button } from "@/components/ui/button";
import type { FC } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
};

export const DownloadButton: FC<Props> = ({ className = "", onClick }) => {
  return <Button onClick={onClick}>CSVをダウンロード</Button>;
};
