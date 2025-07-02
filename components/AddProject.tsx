"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

import { useProjectStore } from "@/store/projectstore";

const AddProject = () => {
  type ProjectType = {
    name: string;
    descrption: string;
  };

  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const { fetchRecentProjects } = useProjectStore();

  const handlenewProject = async (ProjectType: {
    name: string;
    description: string;
  }) => {
    try {
      await axiosInstance.post("projects", ProjectType);
      console.log("Project created successfully");
      await fetchRecentProjects();
      setOpen(false);
      setProjectName("");
      setDescription("");
    } catch (err) {
      console.log("Failed to create new task", err);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="border border-black rounded-2xl p-2  hover:bg-black hover:text-white transition">
            Add Project
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() =>
                handlenewProject({
                  name: projectName,
                  description: description,
                })
              }
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProject;
