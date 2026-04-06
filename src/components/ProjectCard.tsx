import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status?: string;
  createdAt?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success",
  completed: "bg-primary/10 text-primary",
  pending: "bg-warning/10 text-warning",
};

const ProjectCard = ({ id, title, description, status = "active", createdAt }: ProjectCardProps) => (
  <div className="glass-card p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-glow hover:-translate-y-1">
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColors[status] || "bg-secondary text-secondary-foreground"}`}>
          {status}
        </span>
        {createdAt && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <h3 className="font-display font-bold text-lg text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{description}</p>
    </div>
    <Link to={`/projects/${id}`}>
      <Button variant="ghost" className="w-full justify-between group text-primary hover:text-primary">
        View Project
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Link>
  </div>
);

export default ProjectCard;
