import { Inbox } from "lucide-react";

const EmptyState = ({ title = "Nothing here yet", description = "There's no data to display." }: { title?: string; description?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
    <div className="rounded-full bg-secondary p-4">
      <Inbox className="h-8 w-8 text-muted-foreground" />
    </div>
    <div>
      <h3 className="font-display font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  </div>
);

export default EmptyState;
