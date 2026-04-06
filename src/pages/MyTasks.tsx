import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { tasksAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CheckCircle2, Clock3, AlertCircle, Loader2 } from "lucide-react";

type Task = {
  id?: string | number;
  _id?: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "done";
  dueDate?: string;
  due_date?: string;
  estimatedHours?: number;
  estimated_hours?: number;
};

const statusOptions: Array<"pending" | "in_progress" | "done"> = [
  "pending",
  "in_progress",
  "done",
];

const formatDate = (date?: string) => {
  if (!date) return "No due date";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "No due date";
  return parsed.toLocaleDateString();
};

const prettifyStatus = (status?: string) => {
  if (!status) return "Unknown";
  if (status === "in_progress") return "In Progress";
  if (status === "done") return "Done";
  if (status === "pending") return "Pending";
  return status;
};

const getStatusIcon = (status?: string) => {
  if (status === "done") return <CheckCircle2 className="h-4 w-4" />;
  if (status === "in_progress") return <Clock3 className="h-4 w-4" />;
  return <AlertCircle className="h-4 w-4" />;
};

const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingTaskId, setUpdatingTaskId] = useState<string | number | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await tasksAPI.getMyTasks();
      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];
      setTasks(data);
    } catch (err) {
      console.error("Failed to load my tasks:", err);
      setError("Failed to load your tasks.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    taskId: string | number,
    newStatus: "pending" | "in_progress" | "done"
  ) => {
    try {
      setUpdatingTaskId(taskId);

      await tasksAPI.updateStatus(String(taskId), { status: newStatus });

      setTasks((prev) =>
        prev.map((task) =>
          (task.id ?? task._id) === taskId
            ? { ...task, status: newStatus }
            : task
        )
      );

      toast.success("Task status updated successfully.");
    } catch (err: any) {
      console.error("Failed to update task status:", err);
      toast.error(
        err?.response?.data?.message || "Failed to update task status."
      );
    } finally {
      setUpdatingTaskId(null);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          My Tasks
        </h1>
        <p className="text-muted-foreground mb-6">Tasks assigned to you</p>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchTasks} />
        ) : tasks.length === 0 ? (
          <EmptyState
            title="No tasks assigned"
            description="You will see tasks assigned by admins here."
          />
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const taskId = task.id ?? task._id;
              const dueDate = task.dueDate || task.due_date;
              const estimatedHours = task.estimatedHours || task.estimated_hours;

              return (
                <div
                  key={taskId}
                  className="glass-card p-5 rounded-2xl border border-border"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {getStatusIcon(task.status)}
                          {prettifyStatus(task.status)}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground">
                        {task.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {task.description || "No task description provided."}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-sm text-muted-foreground">
                        <p>
                          <span className="font-medium text-foreground">Due:</span>{" "}
                          {formatDate(dueDate)}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Estimated Hours:
                          </span>{" "}
                          {estimatedHours ?? "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-52 space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Update Status
                      </label>

                      <div className="grid grid-cols-1 gap-2">
                        {statusOptions.map((status) => {
                          const active = task.status === status;
                          const isLoading = updatingTaskId === taskId;

                          return (
                            <Button
                              key={status}
                              type="button"
                              variant={active ? "default" : "outline"}
                              disabled={active || isLoading}
                              onClick={() => handleStatusUpdate(taskId!, status)}
                              className="justify-center"
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                prettifyStatus(status)
                              )}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyTasks;