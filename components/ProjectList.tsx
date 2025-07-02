import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {  useState } from "react";
import { useProjectStore } from "@/store/projectstore";
import { MoreVertical } from "lucide-react";

const ProjectList = () => {

const [viewMode, setViewMode] = useState("list");


  const { recentProjects } = useProjectStore();
  

  return (
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
                  <TableCell className="text-right">
                    <div className="relative">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="p-2 rounded-full hover:bg-muted"
                            aria-label="Open project options"
                          >
                            <MoreVertical className="h-5 w-5" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-32" align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
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
  );
};

export default ProjectList;
