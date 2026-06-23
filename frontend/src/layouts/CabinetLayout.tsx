import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import { getCabinetUser } from "../api/cabinetApi";
import type { CabinetUser } from "../api/types";

export default function CabinetLayout() {
  const [user, setUser] = useState<CabinetUser>();

  useEffect(() => {
    getCabinetUser().then(setUser);
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} />
      <div className="flex flex-1 flex-col overflow-hidden bg-mist">
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
