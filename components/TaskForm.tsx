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


// components/TaskForm.tsx

const formSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]), 
  dueDate: z.string().min(1, "Due date is required"),
});

type TaskFormValues = z.infer<typeof formSchema>;

interface TaskSubmissionPayload {
  title: string;
 
  status: "TODO" | "IN_PROGRESS" | "COMPLETED"; 
  dueDate: string;
}
interface TaskFormProps {
  onSubmitSuccess: (data: TaskSubmissionPayload) => void | Promise<void>;
}

const TaskForm = ({ onSubmitSuccess }: TaskFormProps) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      status: "TODO",
      dueDate: "",
    },
  });

  // Handle the form submission
  const handleSubmit = async (data: TaskFormValues) => {
    try {
      const payload: TaskSubmissionPayload = {
        title: data.taskName,
        status: data.status,
        dueDate: data.dueDate,
      };
      await onSubmitSuccess(payload);
      form.reset();
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
                    <SelectItem value="TODO">To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

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
