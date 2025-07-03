"use client";

import AddProject from "@/components/AddProject";


import { useEffect, useState } from "react";

import { useProjectStore } from "@/store/projectstore";
import ProjectList from "@/components/ProjectList";
import SearchFilter from "@/components/SearchFilter";

const page = () => {
  const { fetchRecentProjects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState("");


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
        <button className="border border-black rounded-2xl px-4 py-2   bg-black text-white   hover:bg-white hover:text-black transition">
          All Projects
        </button>
        <button className="border border-black rounded-2xl px-4 py-2  bg-black text-white   hover:bg-white hover:text-black transition">
          Active
        </button>
        <button className="border border-black rounded-2xl px-4 py-2  bg-black text-white   hover:bg-white hover:text-blacke transition">
          Archived
        </button>
      </section>
      <ProjectList searchQuery={searchQuery} />
    </main>
  );
};

export default page;
