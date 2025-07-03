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
import ProjectForm from "@/components/ProjectForm";
import { filterProjects } from "@/lib/utils";
import { Project } from "@/type/project";

type Props = {
  searchQuery: string;
  statusFilter: string;
};

const ProjectList = ({ searchQuery, statusFilter }: Props) => {
  const [formOpen, setFormOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { fetchRecentProjects, recentProjects } = useProjectStore();

  const filteredProjects = filterProjects(
    recentProjects,
    searchQuery,
    statusFilter
  );

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
        <button className="text-2xl">List</button>
      </div>

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
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="text-xl">{project.name}</TableCell>
                <TableCell className="text-xl">{project.description}</TableCell>
                <TableCell className="text-right">
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
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(project.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500 py-4">
                No matching projects.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProjectForm
        open={formOpen}
        setOpen={setFormOpen}
        project={selectedProject}
        onUpdate={async (updatedProject) => {
          try {
            const res = await axiosInstance.patch(
              `/projects/${updatedProject.id}`,
              {
                name: updatedProject.name,
                description: updatedProject.description,
              }
            );
            await fetchRecentProjects();
          } catch (err) {
            console.error("Failed to update project", err);
          }
        }}
      />
    </section>
  );
};

export default ProjectList;
