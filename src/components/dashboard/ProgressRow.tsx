interface ProgressRowProps {
  name: string;
  value: number;
  onClick?: () => void;
}

export const ProgressRow = ({ name, value, onClick }: ProgressRowProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full space-y-2 rounded-lg p-2 -mx-2 text-left transition-colors hover:bg-muted/50"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </button>
  );
};
