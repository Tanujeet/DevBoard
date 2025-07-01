// app/page.jsx
"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Page() {
  type TaskType = {
    id: string;
    title: string;
    status: string;
    dueDate: string;
  };

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTaskData: {
    title: string;
    status: string;
    dueDate: string;
  }) => {
    try {
      await axiosInstance.post("tasks", newTaskData);
      console.log("Task created successfully!");
      await fetchTasks();
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <TaskForm onSubmitSuccess={handleAddTask} />
      <TaskList
        tasks={tasks}
        onTaskDelete={fetchTasks}
        onTaskEdit={fetchTasks}
      />
    </main>
  );
}
