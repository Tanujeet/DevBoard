"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

const formSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  dueDate: z.string().min(1, "Due date is required"),
});

export default function Page() {
  type TaskType = {
    id: string;
    title: string;
    status: string;
    dueDate: string;
  };

  const [tasks, setTasks] = useState<TaskType[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      status: "To Do",
      dueDate: "",
    },
  });
  const onHandle = async (data: {
    title: string;
    status: string;
    dueDate: string;
  }) => {
    try {
      const res = await axiosInstance.post("tasks", data);
      console.log("Task created:", res.data);
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  const fetchTasks = async () => {
    const res = await axiosInstance.get("tasks");
    setTasks(res.data.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        title: data.taskName,
        status: data.status,
        dueDate: data.dueDate,
      };

      await onHandle(payload);
      await fetchTasks();
      form.reset();
    } catch (error) {
      console.error("Failed to submit", error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <section className="mb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks and stay productive
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Task Name */}
            <FormField
              control={form.control}
              name="taskName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter task name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Dropdown */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="hover:bg-white hover:text-black hover:border border-black"
            >
              Add Task
            </Button>
          </form>
        </Form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Existing Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl border shadow-sm bg-white"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Due: {task.dueDate}
                  </p>
                  <h3 className="text-lg font-medium">{task.title}</h3>
                  <p className="text-muted-foreground">{task.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
