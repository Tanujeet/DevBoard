"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/projects": "Projects",
  "/analytics": "Analytics",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "TaskHive";

  return (
    <header className="h-16 px-4 border-b bg-black flex items-center justify-between">
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="bg-white text-black font-medium text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
