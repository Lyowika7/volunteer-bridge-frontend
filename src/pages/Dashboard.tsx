import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import {
  FolderOpen,
  Heart,
  Plus,
  ArrowRight,
  Bell,
  FileText,
  User,
  Activity,
  ListTodo,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { projectsAPI, reportsAPI, tasksAPI } from "@/services/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    projects: 0,
    reports: 0,
    myTasks: 0,
    role: user?.role || "volunteer",
    status: "Active",
  });

  const [loading, setLoading] = useState(true);

  const quickActions = [
    { to: "/projects", label: "Browse Projects", icon: FolderOpen, desc: "Find projects to join" },
    { to: "/donations", label: "Make a Donation", icon: Heart, desc: "Support a cause" },
    { to: "/reports", label: "View Reports", icon: FileText, desc: "Check your impact" },
    { to: "/notifications", label: "Notifications", icon: Bell, desc: "Stay updated" },
    { to: "/my-tasks", label: "My Tasks", icon: ListTodo, desc: "View assigned tasks" },
    { to: "/projects/create", label: "Create Project", icon: Plus, desc: "Start a new project" },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [projectsRes, reportsRes, myTasksRes] = await Promise.all([
          projectsAPI.getAll(),
          user?.role === "admin"
            ? reportsAPI.getAll()
            : user?.id
            ? reportsAPI.getByUser(String(user.id))
            : Promise.resolve({ data: { data: [] } }),
          tasksAPI.getMyTasks(),
        ]);

        const projects = Array.isArray(projectsRes.data?.data) ? projectsRes.data.data : [];
        const reports = Array.isArray(reportsRes.data?.data) ? reportsRes.data.data : [];
        const myTasks = Array.isArray(myTasksRes.data?.data) ? myTasksRes.data.data : [];

        setStats({
          projects: projects.length,
          reports: reports.length,
          myTasks: myTasks.length,
          role: user?.role || "volunteer",
          status: "Active",
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setStats((prev) => ({
          ...prev,
          role: user?.role || "volunteer",
          status: "Active",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Welcome back, <span className="gradient-text">{user?.name}</span>! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Ready to make a difference today?
              </p>
            </div>

            <Link to="/projects/create">
              <Button className="rounded-xl shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Projects"
            value={loading ? "..." : String(stats.projects)}
            icon={FolderOpen}
            trend="Live data"
          />
          <StatCard
            title="My Reports"
            value={loading ? "..." : String(stats.reports)}
            icon={FileText}
            trend="Live data"
          />
          <StatCard
            title="My Tasks"
            value={loading ? "..." : String(stats.myTasks)}
            icon={ListTodo}
            trend="Live data"
          />
          <StatCard
            title="Role"
            value={stats.role}
            icon={User}
          />
          <StatCard
            title="Account Status"
            value={stats.status}
            icon={Activity}
          />
        </div>

        <h2 className="text-xl font-display font-bold text-foreground mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {quickActions.map((a, i) => (
            <motion.div
              key={a.to}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={a.to}
                className="glass-card p-6 flex flex-col gap-3 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 group block"
              >
                <div className="rounded-xl bg-primary/10 p-3 w-fit">
                  <a.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground flex items-center gap-1">
                    {a.label}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;