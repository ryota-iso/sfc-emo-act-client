import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export const LogoutButton = ({ className = "" }) => {
  return (
    <Button
      className={`${className} w-full`}
      onClick={() => {
        alert("未実装");
      }}
    >
      <LogOut strokeWidth={3} size={16} />
      <span className="ml-2 font-bold">ログアウト</span>
    </Button>
  );
};
