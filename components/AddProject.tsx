import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const AddProject = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="border border-black rounded-2xl p-2  hover:bg-black hover:text-white transition">
          Add Project
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your project name"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button>Cancel</Button>
            <Button>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProject;
