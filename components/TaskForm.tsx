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

// Define the Zod schema for your form's data structure
const formSchema = z.object({
  taskName: z.string().min(1, "Task name is required"),
  status: z.enum(["To Do", "In Progress", "Completed"]), // Ensure these match your backend/database statuses
  dueDate: z.string().min(1, "Due date is required"), // Assuming date is handled as a string (e.g., "YYYY-MM-DD")
});

// Infer the TypeScript type directly from the Zod schema
type TaskFormValues = z.infer<typeof formSchema>;

// Define the shape of the payload that will be sent via onSubmitSuccess
interface TaskSubmissionPayload {
  title: string;
  status: "To Do" | "In Progress" | "Completed";
  dueDate: string;
}

// Define the props that the TaskForm component expects
interface TaskFormProps {
  /**
   * Function called on successful form submission.
   * Receives the submitted task data as `TaskSubmissionPayload`.
   */
  onSubmitSuccess: (data: TaskSubmissionPayload) => void | Promise<void>;
}

const TaskForm = ({ onSubmitSuccess }: TaskFormProps) => {
  // <-- FIXED: Type 'any' replaced with 'TaskFormProps'
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskName: "",
      status: "To Do",
      dueDate: "",
    },
  });

  // Handle the form submission
  const handleSubmit = async (data: TaskFormValues) => {
    try {
      // Construct the payload as expected by the API or parent component
      const payload: TaskSubmissionPayload = {
        // Explicitly typing the payload for clarity
        title: data.taskName,
        status: data.status,
        dueDate: data.dueDate,
      };
      await onSubmitSuccess(payload); // Call the prop function with the typed payload
      form.reset(); // Clear form fields after successful submission
    } catch (error) {
      console.error("Failed to submit task form:", error);
      // You might want to add error handling feedback to the user here
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
          {/* Task Name Input */}
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

          {/* Due Date Input */}
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

          {/* Submit Button */}
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
