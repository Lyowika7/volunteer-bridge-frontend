import { AlertTriangle } from "lucide-react";

const ErrorMessage = ({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
    <div className="rounded-full bg-destructive/10 p-4">
      <AlertTriangle className="h-8 w-8 text-destructive" />
    </div>
    <div>
      <h3 className="font-display font-semibold text-foreground">Error</h3>
      <p className="text-sm text-muted-foreground mt-1">{message}</p>
    </div>
    {onRetry && (
      <button onClick={onRetry} className="text-sm font-medium text-primary hover:underline">
        Try again
      </button>
    )}
  </div>
);

export default ErrorMessage;
