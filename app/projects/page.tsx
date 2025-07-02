"use client";

import AddProject from "@/components/AddProject";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";

const page = () => {
  type Project = {
    id: string;
    name: string;
    description: string;
    status?: string;
  };

  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [viewMode, setViewMode] = useState("list");

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        const res = await axiosInstance.get("projects");
        setRecentProjects(res.data.projects);
      } catch (error) {
        console.log("Failed to fetch projects", error);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <AddProject />
      </section>

      <section>
        <div className="relative w-full md:w-[600px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search Projects"
            className="w-full border border-black rounded-xl p-2 pl-10"
          />
        </div>
      </section>

      {/* Filter Buttons: All, Active, Archived */}
      <section className="flex items-center space-x-4">
        <button className="border border-black rounded-2xl px-4 py-2 hover:bg-black hover:text-white transition">
          All Projects
        </button>
        <button className="border border-black rounded-2xl px-4 py-2 hover:bg-black hover:text-white transition">
          Active
        </button>
        <button className="border border-black rounded-2xl px-4 py-2 hover:bg-black hover:text-white transition">
          Archived
        </button>
      </section>

      <section className="space-y-6 mt-20">
        <div className="flex gap-7">
          <button onClick={() => setViewMode("list")} className="text-2xl ">
            List
          </button>
          <button onClick={() => setViewMode("card")} className="text-2xl ">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProjects.length > 0 ? (
                recentProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.description}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={2}
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
      </section>
    </main>
  );
};

export default page;
