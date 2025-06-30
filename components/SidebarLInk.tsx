"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export function SidebarLink({ href, icon, label }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 rounded-md font-medium text-sm transition",
        isActive
          ? "bg-gray-100 text-black dark:bg-gray-800 dark:text-white"
          : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900"
      )}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </Link>
  );
}
