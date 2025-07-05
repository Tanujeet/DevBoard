"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { axiosInstance } from "@/lib/axios";
import { useProjectStore } from "@/store/projectstore";

const AddProject = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const { fetchRecentProjects } = useProjectStore();

 
  const handleSaveNewProject = async () => {
    try {
      if (!projectName.trim()) {
        console.error("Project name cannot be empty.");

        return;
      }

      await axiosInstance.post("projects", {
        name: projectName,
        description: description,
      });
      console.log("Project created successfully");
      await fetchRecentProjects();
      setOpen(false);
      setProjectName("");
      setDescription("");
    } catch (err) {
      console.error("Failed to create new project", err);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="border border-black rounded-2xl p-2 bg-black text-white hover:bg-white hover:text-black transition">
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
            <Button onClick={handleSaveNewProject}>Save</Button>

            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default AddProject;
