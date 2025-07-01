// components/TaskForm.jsx
import React from "react";
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

// Define the form schema
const formSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  status: z.enum(["To Do", "In Progress", "Completed"]),
  dueDate: z.string().min(1, "Due date is required"),
});

const TaskForm = ({ onSubmitSuccess }: { onSubmitSuccess :any}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      status: "To Do",
      dueDate: "",
    },
  });

  const handleSubmit = async (data:any) => {
    try {
      const payload = {
        title: data.taskName,
        status: data.status,
        dueDate: data.dueDate,
      };
      await onSubmitSuccess(payload); // Call the prop function
      form.reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Failed to submit task form:", error);
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-muted-foreground">
          Manage your tasks and stay productive
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
  );
};

export default TaskForm;
