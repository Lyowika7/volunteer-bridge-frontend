import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { reportsAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

const ReportsPage = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    projectId: "",
    taskId: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchReports = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError("");

    try {
      const res =
        user.role === "admin"
          ? await reportsAPI.getAll()
          : await reportsAPI.getByUser(String(user.id));

      console.log("REPORTS RESPONSE:", res.data);

      setReports(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to load reports:", err);
      setError("Failed to load reports.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user?.id, user?.role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      toast.error("Fill in all required fields");
      return;
    }

    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    setSubmitting(true);

    try {
      await reportsAPI.create({
        title: form.title,
        content: form.content,
        userId: Number(user.id),
        projectId: form.projectId ? Number(form.projectId) : undefined,
        taskId: form.taskId ? Number(form.taskId) : undefined,
      });

      toast.success("Report submitted!");
      setForm({
        title: "",
        content: "",
        projectId: "",
        taskId: "",
      });

      fetchReports();
    } catch (err: any) {
      console.error("Failed to submit report:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to submit report.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Reports
        </h1>
        <p className="text-muted-foreground mb-8">
          {user?.role === "admin"
            ? "Review reports submitted by all volunteers."
            : "Submit and review your volunteer reports."}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {user?.role !== "admin" && (
            <div>
              <h2 className="text-lg font-display font-semibold mb-4">
                Submit a Report
              </h2>

              <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="Report title"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Project ID (optional)</Label>
                  <Input
                    value={form.projectId}
                    onChange={(e) =>
                      setForm({ ...form, projectId: e.target.value })
                    }
                    placeholder="Project ID"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Task ID (optional)</Label>
                  <Input
                    value={form.taskId}
                    onChange={(e) =>
                      setForm({ ...form, taskId: e.target.value })
                    }
                    placeholder="Task ID"
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    rows={5}
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                    placeholder="Describe your activities..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={submitting}
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </div>
          )}

          <div className={user?.role === "admin" ? "lg:col-span-2" : ""}>
            <h2 className="text-lg font-display font-semibold mb-4">
              {user?.role === "admin" ? "All Reports" : "Your Reports"}
            </h2>

            {loading ? (
              <Loader />
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchReports} />
            ) : reports.length === 0 ? (
              <EmptyState
                title="No reports"
                description={
                  user?.role === "admin"
                    ? "No volunteer reports available yet."
                    : "Submit your first report."
                }
              />
            ) : (
              <div className="space-y-3">
                {reports.map((r: any) => (
                  <Link
                    to={`/reports/${r._id || r.id}`}
                    key={r._id || r.id}
                    className="block"
                  >
                    <div className="glass-card p-5 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-medium text-foreground">
                            {r.title}
                          </h4>

                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {r.content}
                          </p>

                          <div className="text-xs text-muted-foreground mt-2 space-y-1">
                            <div>
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString()
                                : ""}
                            </div>

                            {r.project?.name && (
                              <div>Project: {r.project.name}</div>
                            )}

                            {r.reportsOwner?.name && (
                              <div>By: {r.reportsOwner.name}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;