import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { notificationsAPI } from "@/services/api";

type NotificationItem = {
  id?: string | number;
  _id?: string;
  title?: string;
  message?: string;
  is_read?: boolean;
  isRead?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [markingId, setMarkingId] = useState<string | number | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await notificationsAPI.getAll();

      const data = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];

      setNotifications(data);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Failed to load notifications.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string | number) => {
    try {
      setMarkingId(notificationId);

      await notificationsAPI.markAsRead(String(notificationId));

      setNotifications((prev) =>
        prev.map((item) =>
          (item.id ?? item._id) === notificationId
            ? { ...item, is_read: true, isRead: true }
            : item
        )
      );

      toast.success("Notification marked as read.");
    } catch (err: any) {
      console.error("Failed to mark notification as read:", err);
      toast.error(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to update notification."
      );
    } finally {
      setMarkingId(null);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Notifications
        </h1>
        <p className="text-muted-foreground mb-8">
          Stay updated on your projects and tasks.
        </p>

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchNotifications} />
        ) : notifications.length === 0 ? (
          <EmptyState
            title="You're all caught up!"
            description="No new notifications at the moment. We'll let you know when something needs your attention."
          />
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => {
              const id = item.id ?? item._id;
              const isRead = item.is_read ?? item.isRead ?? false;

              return (
                <div
                  key={id}
                  className="glass-card p-5 rounded-2xl border border-border"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`rounded-full p-3 ${
                          isRead ? "bg-muted" : "bg-primary/10"
                        }`}
                      >
                        <Bell
                          className={`h-5 w-5 ${
                            isRead ? "text-muted-foreground" : "text-primary"
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">
                          {item.title || "Notification"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.message || "You have a new update."}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(item.createdAt || item.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {!isRead && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleMarkAsRead(id!)}
                        disabled={markingId === id}
                        className="min-w-[140px]"
                      >
                        {markingId === id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Mark as read
                          </>
                        )}
                      </Button>
                    )}
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

export default NotificationsPage;