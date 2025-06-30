import { SidebarLink } from "./SidebarLInk";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  BarChart2,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-black border-r px-4 py-6 flex flex-col">
      <div className="text-2xl font-bold text-purple-600 mb-10">
        TaskHive 🐝
      </div>

      <nav className="space-y-2">
        <SidebarLink
          href="/dashboard"
          icon={<LayoutDashboard />}
          label="Dashboard"
        />
        <SidebarLink href="/tasks" icon={<CheckSquare />} label="Tasks" />
        <SidebarLink
          href="/projects"
          icon={<FolderKanban />}
          label="Projects"
        />
        <SidebarLink href="/analytics" icon={<BarChart2 />} label="Analytics" />
      </nav>
    </aside>
  );
}
