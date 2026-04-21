interface WorkloadRowProps {
  name: string;
  department: string;
  tasks: number;
  onClick?: () => void;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

export const WorkloadRow = ({ name, department, tasks, onClick }: WorkloadRowProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 py-2.5 px-2 -mx-2 rounded-lg text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {initials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{department}</p>
      </div>
      <span className="rounded-full bg-accent-amber-soft px-2.5 py-1 text-[11px] font-semibold text-accent-amber">
        {tasks} tasks
      </span>
    </button>
  );
};
