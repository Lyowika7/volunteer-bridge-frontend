import { Clock, CheckCircle2, Circle } from "lucide-react";

interface TaskCardProps {
  title: string;
  status?: string;
  dueDate?: string;
  estimatedHours?: number;
  onAction?: () => void;
  actionLabel?: string;
}

const statusIcons: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-success" />,
  "in-progress": <Clock className="h-4 w-4 text-warning" />,
  pending: <Circle className="h-4 w-4 text-muted-foreground" />,
};

const TaskCard = ({ title, status = "pending", dueDate, estimatedHours, onAction, actionLabel }: TaskCardProps) => (
  <div className="glass-card p-5 transition-all duration-200 hover:shadow-card">
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{statusIcons[status] || statusIcons.pending}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          {dueDate && <span>Due: {new Date(dueDate).toLocaleDateString()}</span>}
          {estimatedHours && <span>{estimatedHours}h estimated</span>}
          <span className="capitalize px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{status}</span>
        </div>
      </div>
      {onAction && (
        <button onClick={onAction} className="text-xs font-medium text-primary hover:underline shrink-0">
          {actionLabel || "Action"}
        </button>
      )}
    </div>
  </div>
);

export default TaskCard;
