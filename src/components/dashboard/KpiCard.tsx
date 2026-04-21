import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "green" | "blue" | "red" | "teal" | "amber" | "purple";

const toneStyles: Record<Tone, string> = {
  green: "bg-accent-green-soft text-accent-green",
  blue: "bg-accent-blue-soft text-accent-blue",
  red: "bg-accent-red-soft text-accent-red",
  teal: "bg-accent-teal-soft text-accent-teal",
  amber: "bg-accent-amber-soft text-accent-amber",
  purple: "bg-accent-purple-soft text-accent-purple",
};

interface KpiCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: Tone;
  onClick?: () => void;
}

export const KpiCard = ({ label, value, icon: Icon, tone, onClick }: KpiCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full rounded-2xl border border-border/70 bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            toneStyles[tone]
          )}
        >
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
      </div>
    </button>
  );
};
