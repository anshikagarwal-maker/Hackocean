import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  route: string;
  setRoute: (r: string) => void;
  oceanId: string;
  setOceanId: (id: string) => void;
  children: ReactNode;
}

export default function DashboardLayout({
  route,
  setRoute,
  oceanId,
  setOceanId,
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      <Sidebar
        currentRoute={route}
        setRoute={setRoute}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          oceanId={oceanId}
          setOceanId={setOceanId}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <main className="flex-1 p-3 sm:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}

