export type Project = {
  id: string;
  name: string;
  description: string;
  status?: "Active" | "Archived" | "Completed"; // ✅ fix here
};
