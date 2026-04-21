import { cn } from "@/lib/utils";

type Status = "done" | "review" | "backlog";

interface ActivityRowProps {
  initials: string;
  title: string;
  project: string;
  date: string;
  status: Status;
  onClick?: () => void;
}

const statusStyles: Record<Status, string> = {
  done: "bg-[hsl(var(--status-done-bg))] text-[hsl(var(--status-done-fg))]",
  review: "bg-[hsl(var(--status-review-bg))] text-[hsl(var(--status-review-fg))]",
  backlog: "bg-[hsl(var(--status-backlog-bg))] text-[hsl(var(--status-backlog-fg))]",
};

export const ActivityRow = ({
  initials,
  title,
  project,
  date,
  status,
  onClick,
}: ActivityRowProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 py-3 px-2 -mx-2 rounded-lg text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">
          {project} · {date}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
          statusStyles[status]
        )}
      >
        {status}
      </span>
    </button>
  );
};
