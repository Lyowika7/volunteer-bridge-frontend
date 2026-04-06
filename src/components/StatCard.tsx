import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
}

const StatCard = ({ title, value, icon: Icon, description, trend }: StatCardProps) => (
  <div className="glass-card p-6 transition-all duration-300 hover:shadow-glow group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-3xl font-display font-bold text-foreground mt-1">{value}</p>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && <p className="text-xs text-success font-medium mt-1">{trend}</p>}
      </div>
      <div className="rounded-xl bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  </div>
);

export default StatCard;
