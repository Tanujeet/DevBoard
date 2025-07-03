import { Search } from "lucide-react";
import { useState } from "react";

const SearchFilter = ({ searchQuery, setSearchQuery }: any) => {
  return (
    <section>
      <div className="relative w-full md:w-[600px]">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search Projects"
          className="w-full border border-black rounded-xl p-2 pl-10"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </section>
  );
};

export default SearchFilter;
