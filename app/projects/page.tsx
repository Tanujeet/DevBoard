"use client";

import AddProject from "@/components/AddProject";


import { useEffect, useState } from "react";

import { useProjectStore } from "@/store/projectstore";
import ProjectList from "@/components/ProjectList";
import SearchFilter from "@/components/SearchFilter";

const Page = () => {
  const { fetchRecentProjects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Archived" | "Completed"
  >("All");

  useEffect(() => {
    fetchRecentProjects();
  }, [fetchRecentProjects]);
  const handleProjectAddSuccess = async () => {
    await fetchRecentProjects(); 
  
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <AddProject />
      </section>

      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <section className="flex items-center space-x-4">
        <button
          onClick={() => setStatusFilter("All")}
          className={`border border-black rounded-2xl px-4 py-2 transition ${
            statusFilter === "All"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          All Projects
        </button>
        <button
          onClick={() => setStatusFilter("Active")}
          className={`border border-black rounded-2xl px-4 py-2 transition ${
            statusFilter === "Active"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setStatusFilter("Archived")}
          className={`border border-black rounded-2xl px-4 py-2 transition ${
            statusFilter === "Archived"
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          Archived
        </button>
      </section>

      <ProjectList searchQuery={searchQuery} statusFilter={statusFilter} />
    </main>
  );
};

export default Page;
