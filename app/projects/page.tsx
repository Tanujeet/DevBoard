"use client";

import AddProject from "@/components/AddProject";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { useProjectStore } from "@/store/projectstore";
import ProjectList from "@/components/ProjectList";
import SearchFilter from "@/components/SearchFilter";

const page = () => {
  const { fetchRecentProjects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <section className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <AddProject />
      </section>

      <SearchFilter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
      <ProjectList searchQuery={searchQuery} statusFilter={statusFilter} />
    </main>
  );
};

export default page;
