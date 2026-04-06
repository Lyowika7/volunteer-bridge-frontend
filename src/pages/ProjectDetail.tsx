import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import TaskCard from "@/components/TaskCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { projectsAPI, tasksAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ListTodo } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      setLoading(true);
      setError("");

      try {
        const [pRes, tRes] = await Promise.all([
          projectsAPI.getOne(id),
          tasksAPI.getByProject(id),
        ]);

        setProject(pRes.data?.data || pRes.data);
        setTasks(Array.isArray(tRes.data?.data) ? tRes.data.data : []);
      } catch (err) {
        console.error("Failed to load project details:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <ErrorMessage message={error} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Projects
        </Link>

        <div className="glass-card p-8 mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                {project?.status || "active"}
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-3">
                {project?.name}
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                {project?.description}
              </p>
            </div>

            <Link to={`/projects/${id}/tasks`}>
              <Button variant="outline" className="rounded-xl">
                <ListTodo className="h-4 w-4 mr-2" />
                Manage Tasks
              </Button>
            </Link>
          </div>
        </div>

        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          Tasks ({tasks.length})
        </h2>

        {tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description="Tasks will appear here once they're added."
          />
        ) : (
          <div className="space-y-3">
            {tasks.map((t: any) => (
              <TaskCard
                key={t._id || t.id}
                title={t.title}
                status={t.status}
                dueDate={t.dueDate}
                estimatedHours={t.estimatedHours}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;