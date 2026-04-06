import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import ProjectCard from "@/components/ProjectCard";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import { projectsAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ProjectsPage = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await projectsAPI.getAll();
      console.log("PROJECTS RESPONSE:", res.data);

      setProjects(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to load projects:", err);
      setError("Failed to load projects.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Projects
            </h1>
            <p className="text-muted-foreground mt-1">
              Discover projects that need your help.
            </p>
          </div>

          
            <Link to="/projects/create">
              <Button className="rounded-xl">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
        
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchProjects} />
        ) : projects.length === 0 ? (
          <EmptyState
            title="No projects yet"
            description="Check back soon for new projects."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <ProjectCard
                key={p.id}
                id={p.id}
                title={p.name}
                description={p.description}
                status={p.status}
                createdAt={p.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectsPage;