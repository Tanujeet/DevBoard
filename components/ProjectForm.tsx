import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Project = {
  id: string;
  name: string;
  description: string;
};
  



type ProjectFormProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project | null;
  onUpdate: (updatedProject: Project) => void;
  
};
const ProjectForm = ({open ,setOpen,project,onUpdate}:ProjectFormProps) => {
    const [name, setName] = useState("")
    const [description, setdescription] = useState("");
    

    useEffect(() => {
        if (project) {
            setName(project.name)
            setdescription(project.description)
        }
    }, [project])
    

    const handleSubmit = () => {
      if (!project) return;

      console.log("Updating project:", { ...project, name, description }); 

      onUpdate({ ...project, name, description });
      setOpen(false);
    };
      

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <textarea
            value={description}
                      onChange={(e) => setdescription(e.target.value)}
                      className="border border-10-black"
          />
          <Button onClick={handleSubmit} className="mt-10">Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectForm;
