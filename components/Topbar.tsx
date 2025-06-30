"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

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
    <header className="h-16 px-4 border-b bg-white dark:bg-[#0f0f0f] flex items-center justify-between">
      {/* Left: Page Title */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h1>

      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        {/* Optional: Theme toggle */}
        <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Sun className="h-5 w-5 hidden dark:block" />
          <Moon className="h-5 w-5 dark:hidden" />
        </button>

        {/* Clerk Auth */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
