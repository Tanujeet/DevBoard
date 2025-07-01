"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { axiosInstance } from "@/lib/axios";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  title: string;
  dueDate: string;
  status: string;
};

const TaskList = ({
  tasks,
  onTaskDelete,
  onTaskEdit,
}: {
  tasks: Task[];
  onTaskDelete: () => void;
  onTaskEdit: () => void;
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    status: "",
  });

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      dueDate: task.dueDate,
      status: task.status,
    });
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/tasks/${taskId}`);
      onTaskDelete(); // Refetch from parent
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditSubmit = async () => {
    if (!editingTask) return;

    try {
      await axiosInstance.patch(`/tasks/${editingTask.id}`, formData);
      setEditingTask(null);
      onTaskEdit(); // Refetch from parent
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Existing Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task, idx) => (
            <div
              key={task.id || idx}
              className="flex items-center justify-between p-4 rounded-xl border shadow-sm bg-white"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Due: {task.dueDate}
                </p>
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-muted-foreground">{task.status}</p>
              </div>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-muted">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-32" align="end">
                    <DropdownMenuItem onClick={() => handleEditClick(task)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input
              placeholder="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
            <Input
              placeholder="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingTask(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TaskList;
