"use client";

import AddProject from "@/components/AddProject";

import { Search } from "lucide-react";
import { useEffect } from "react";

import { useProjectStore } from "@/store/projectstore";
import ProjectList from "@/components/ProjectList";

const page = () => {
  const { fetchRecentProjects } = useProjectStore();

  useEffect(() => {
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
      <ProjectList />
    </main>
  );
};

export default page;
