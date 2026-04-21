import { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/dashboard/PageHeader";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
}

export const PlaceholderPage = ({ title, subtitle, icon: Icon, description }: PlaceholderPageProps) => {
  return (
    <div className="mx-auto max-w-[1500px] px-8 py-8 lg:px-10 lg:py-10">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title} workspace</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
