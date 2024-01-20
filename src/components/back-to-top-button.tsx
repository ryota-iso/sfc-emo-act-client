import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

type Props = {
  className?: string;
};

export const BackToTopButton: FC<Props> = ({ className = "" }) => {
  return (
    <Button variant="outline" className={className}>
      <ChevronLeft size={24} />
      <a className="ml-2" href="/">
        Topへ戻る
      </a>
    </Button>
  );
};
