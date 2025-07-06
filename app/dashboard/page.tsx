"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { axiosInstance } from "@/lib/axios";
import { Badge } from "@/components/ui/badge";

import PomodoroWidget from "@/components/Pomodoro";


interface DashboardStats {
  totalTask: number;
  completedTask: number;
  totalFocusTimeInMinutes: number;
  pomodoroSession: number;
}

interface ApiTask {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface ApiProject {
  id: string;
  name: string; // Assuming 'name' is the field for project title
  status: string; // Or specific literals: "All" | "Active" | "Archived" | "Completed"
  createdAt: string; // ISO 8601 date string
  // Add other properties if your API returns them and you use them
}


interface ActivityItem {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  type: "Task" | "Project";
}

export default function DashboardPage() {
  const { user } = useUser();
  const userName = user?.firstName || "Developer";

  const [stats, setStats] = useState<DashboardStats>({
    totalTask: 0,
    completedTask: 0,
    totalFocusTimeInMinutes: 0,
    pomodoroSession: 0,
  });

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<DashboardStats>("/analytics");
        setStats(res.data);
      } catch (error) {
        console.log("Failed to fetch analytics", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const [taskRes, projectRes] = await Promise.all([
          axiosInstance.get<{ tasks: ApiTask[] }>("/tasks"),
          axiosInstance.get<{ projects: ApiProject[] }>("/projects"),
        ]);

        
        const tasks: ActivityItem[] = taskRes.data.tasks.map(
          (task: ApiTask): ActivityItem => ({
            id: task.id,
            title: task.title,
            status: task.status,
            createdAt: task.createdAt,
            type: "Task",
          })
        );

   
        const projects: ActivityItem[] = projectRes.data.projects.map(
          (project: ApiProject): ActivityItem => ({
            id: project.id,
            title: project.name,
            status: project.status,
            createdAt: project.createdAt,
            type: "Project",
          })
        );

        const merged = [...tasks, ...projects].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRecentActivity(merged);
      } catch (error) {
        console.log("Failed to fetch activity", error);
      }
    };
    fetchRecentActivity();
  }, []);

  const formatFocusTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h2 className="text-3xl font-bold">Welcome back, {userName} 👋</h2>
        <p className="text-muted-foreground mt-2">
          Here&apos;s your productivity snapshot
        </p>
      </div>

      <section className="flex overflow-x-auto gap-4 pb-4">
        {[
          { label: "Total Tasks", value: stats.totalTask },
          { label: "Completed Tasks", value: stats.completedTask },
          { label: "Pomodoro Sessions", value: stats.pomodoroSession },
          {
            label: "Focus Time",
            value: formatFocusTime(stats.totalFocusTimeInMinutes),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="min-w-[180px] bg-muted/50 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <p className="text-muted-foreground text-sm">{item.label}</p>
            <h3 className="text-2xl font-semibold mt-2">{item.value}</h3>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.length > 0 ? (
            recentActivity.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-xl"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.type} •{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline">{item.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No recent activity found.</p>
          )}
        </div>
      </section>

      <PomodoroWidget />
    </main>
  );
}
