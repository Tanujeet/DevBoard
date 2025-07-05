import { Project } from "@/type/project";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "Not set"; // handle empty/null
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export function filterProjects(
  projects: Project[],
  searchQuery: string,
  statusFilter: string
): Project[] {
  return projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}



// utils/pomodoro.ts
import { useState, useEffect } from "react";

export function usePomodoroTimer(durationInMinutes = 25) {
  const initialTime = durationInMinutes * 60;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const start = () => {
    if (!isRunning) setStartTime(new Date());
    setIsRunning(true);
  };

  const pause = () => setIsRunning(false);

  const reset = () => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    setStartTime(null);
  };

  const isComplete = timeLeft === 0;

  const formattedTime = `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`;

  return {
    timeLeft,
    isRunning,
    isComplete,
    formattedTime,
    start,
    pause,
    reset,
    startTime,
  };
}

// For input fields
export const formatDateForInput = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0]; // e.g. "2025-07-16"
};
