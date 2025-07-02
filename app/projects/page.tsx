import AddProject from "@/components/AddProject";
import { Search } from "lucide-react";

const page = () => {
  return (
    <main>
      <section className="max-w-4xl space-y-6 mx-auto p-6 ">
        <div className=" flex justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <AddProject />
        </div>
        <div className="relative w-[600px] ">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </span>

          <input
            type="text"
            placeholder="Search Projects"
            className="w-full border border-black rounded-xl p-2 pl-10 "
          />
        </div>
      </section>
    </main>
  );
};

export default page;
