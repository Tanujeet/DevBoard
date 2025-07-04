import { Search } from "lucide-react";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import React from "react";

interface SearchFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchFilter = ({ searchQuery, setSearchQuery }: SearchFilterProps) => {
  const debouncedSetSearchQuery = useMemo(
    () => debounce(setSearchQuery, 500),
    [setSearchQuery]
  );

  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

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
          defaultValue={searchQuery}
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
        />
      </div>
    </section>
  );
};

export default SearchFilter;
