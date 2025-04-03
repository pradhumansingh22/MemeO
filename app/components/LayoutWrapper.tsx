"use client";

import { Sidebar } from "./SideBar";
import { TopBar } from "./TopBar";
import { usePathname } from "next/navigation";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const noLayoutPages = ["/signin", "/signup","/"];
  const shouldShowLayout = !noLayoutPages.includes(pathName);

  return (
    <div className="flex h-screen">
      {shouldShowLayout && (
        <div>
          <Sidebar />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden max-w-screen">
        {shouldShowLayout && (
          <div className="mt-5">
            <TopBar />
          </div>
        )}
        <div
          className={`${shouldShowLayout ? "flex-1 overflow-y-auto p-8" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
