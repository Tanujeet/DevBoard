"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useProjectStore } from "@/store/projectstore";
import { MoreVertical } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import ProjectForm from "@/components/ProjectForm"; // 👈 import it

const ProjectList = () => {
  type Project = {
    id: string;
    name: string;
    description: string;
  };

  const [viewMode, setViewMode] = useState("list");
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { fetchRecentProjects, recentProjects } = useProjectStore();

  const onDelete = async (projectId: string) => {
    try {
      await axiosInstance.delete(`/projects/${projectId}`);
      await fetchRecentProjects();
    } catch (err) {
      console.log("Failed to delete project", err);
    }
  };

  return (
    <section className="space-y-6 mt-20">
      <div className="flex gap-7">
        <button onClick={() => setViewMode("list")} className="text-2xl">
          List
        </button>
        <button onClick={() => setViewMode("card")} className="text-2xl">
          Card
        </button>
      </div>

      {viewMode === "list" ? (
        <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-xl font-semibold text-left p-4">
                Project name
              </TableHead>
              <TableHead className="text-xl font-semibold text-left p-4">
                Description
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell className="text-right">
                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-full hover:bg-muted">
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-32" align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProject(project);
                              setFormOpen(true);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => onDelete(project.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-gray-500 py-4"
                >
                  No recent projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <p>Card view will be here</p>
      )}

      {/* ✅ Render the form modal here */}
      <ProjectForm
        open={formOpen}
        setOpen={setFormOpen}
        project={selectedProject}
        onUpdate={async (updatedProject) => {
          console.log("Sending PUT for:", updatedProject); // ✅ debug
          try {
            const res = await axiosInstance.patch(
              `/projects/${updatedProject.id}`,
              {
                name: updatedProject.name,
                description: updatedProject.description,
              }
            );
            console.log("PUT response:", res.data); // ✅ debug
            await fetchRecentProjects();
          } catch (err) {
            console.error("Failed to update project", err); // ✅ check error
          }
        }}
      />
    </section>
  );
};

export default ProjectList;
