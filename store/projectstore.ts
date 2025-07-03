// store/projectStore.ts
import { axiosInstance } from "@/lib/axios";
import { Project } from "@/type/project";
import { create } from "zustand";

;

type ProjectState = {
  recentProjects: Project[];
  fetchRecentProjects: () => Promise<void>;
};

export const useProjectStore = create<ProjectState>((set) => ({
  recentProjects: [],
  fetchRecentProjects: async () => {
    try {
      const res = await axiosInstance.get("projects");
      set({ recentProjects: res.data.projects }); // or res.data.project
    } catch (error) {
      console.error("Failed to fetch projects", error);
    }
  },
}));
