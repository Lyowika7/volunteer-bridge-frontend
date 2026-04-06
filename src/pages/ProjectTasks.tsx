import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import TaskCard from "@/components/TaskCard";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { tasksAPI, usersAPI } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

const ProjectTasks = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isAdmin } = useAuth();

  const [tasks, setTasks] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Record<string, string>>(
    {}
  );
  const [assigning, setAssigning] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    estimatedHours: "",
  });

  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTasks = async () => {
    if (!projectId) return;

    setLoading(true);
    setError("");

    try {
      const res = await tasksAPI.getByProject(projectId);
      setTasks(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Failed to load tasks:", err);
      setError("Failed to load tasks.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const res = await usersAPI.getVolunteerUsers();
      const volunteerList = Array.isArray(res.data?.data) ? res.data.data : [];
      setVolunteers(volunteerList);
    } catch (err) {
      console.error("Failed to load volunteer users:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    if (isAdmin) {
      fetchVolunteers();
    }
  }, [isAdmin]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.title || !projectId) {
      toast.error("Task title is required");
      return;
    }

    setCreating(true);

    try {
      await tasksAPI.create(projectId, {
        title: newTask.title,
        dueDate: newTask.dueDate || undefined,
        estimatedHours: newTask.estimatedHours
          ? Number(newTask.estimatedHours)
          : undefined,
      });

      toast.success("Task created!");
      setNewTask({ title: "", dueDate: "", estimatedHours: "" });
      setDialogOpen(false);
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create task.");
    } finally {
      setCreating(false);
    }
  };

  const handleStatusUpdate = async (taskId: string, status: string) => {
    try {
      await tasksAPI.updateStatus(taskId, { status });
      toast.success("Status updated!");
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleAssignTask = async (taskId: string, taskTitle: string) => {
    const userId = selectedUsers[taskId];

    if (!userId) {
      toast.error("Select a volunteer");
      return;
    }

    setAssigning(taskId);

    try {
      await tasksAPI.assign(taskId, { userId, taskTitle });
      toast.success("Task assigned!");
      setSelectedUsers((prev) => ({ ...prev, [taskId]: "" }));
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Assignment failed.");
    } finally {
      setAssigning(null);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Tasks</h1>
            <p className="text-muted-foreground">
              Manage tasks and assignments
            </p>
          </div>

          {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleCreate} className="space-y-4">
                  <Input
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />

                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />

                  <Input
                    type="number"
                    placeholder="Estimated hours"
                    value={newTask.estimatedHours}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        estimatedHours: e.target.value,
                      })
                    }
                  />

                  <Button disabled={creating}>
                    {creating ? "Creating..." : "Create Task"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : tasks.length === 0 ? (
          <EmptyState title="No tasks" description="Add your first task" />
        ) : (
          <div className="space-y-5">
            {tasks.map((t: any) => {
              const taskId = String(t._id || t.id);

              const assignedUser = volunteers.find(
                (v: any) => String(v.id) === String(t.assignedTo)
              );

              return (
                <div key={taskId} className="space-y-3">
                  <TaskCard
                    title={t.title}
                    status={t.status}
                    dueDate={t.dueDate}
                    estimatedHours={t.estimatedHours}
                    onAction={() =>
                      handleStatusUpdate(
                        taskId,
                        t.status === "done" ? "pending" : "done"
                      )
                    }
                    actionLabel={t.status === "done" ? "Reopen" : "Complete"}
                  />

                  {isAdmin && (
                    <div className="p-4 border rounded-xl space-y-3">
                      <select
                        value={selectedUsers[taskId] || ""}
                        onChange={(e) =>
                          setSelectedUsers({
                            ...selectedUsers,
                            [taskId]: e.target.value,
                          })
                        }
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option value="">Select volunteer</option>
                        {volunteers.map((v: any) => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.email})
                          </option>
                        ))}
                      </select>

                      <Button
                        disabled={
                          !selectedUsers[taskId] || assigning === taskId
                        }
                        onClick={() => handleAssignTask(taskId, t.title)}
                      >
                        {assigning === taskId ? "Assigning..." : "Assign Task"}
                      </Button>

                      {t.assignedTo && (
                        <p className="text-sm text-muted-foreground">
                          Assigned to: {assignedUser?.name || `User ${t.assignedTo}`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProjectTasks;