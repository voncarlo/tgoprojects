import { LucideIcon } from "lucide-react";

interface PanelCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const PanelCard = ({ title, icon: Icon, children }: PanelCardProps) => {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-card">
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  );
};
