interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => {
  return (
    <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  );
};
