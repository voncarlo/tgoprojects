import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  ListChecks,
  Loader2,
  TrendingDown,
  Users,
  FolderKanban,
} from "lucide-react";
import { toast } from "sonner";
import { FilterSelect } from "@/components/dashboard/FilterSelect";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PanelCard } from "@/components/dashboard/PanelCard";
import { ProgressRow } from "@/components/dashboard/ProgressRow";
import { WorkloadRow } from "@/components/dashboard/WorkloadRow";
import { ActivityRow } from "@/components/dashboard/ActivityRow";

const projectsData = [
  { name: "Operations Overhaul", value: 20, total: 10, inProgress: 4, overdue: 3, completed: 1 },
  { name: "Tech Infrastructure", value: 0, total: 6, inProgress: 1, overdue: 2, completed: 0 },
  { name: "Dispatch Optimization", value: 0, total: 4, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Finance Automation", value: 0, total: 3, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Employee Onboarding 2.0", value: 0, total: 3, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Client Portal Redesign", value: 0, total: 2, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Compliance & Audit", value: 0, total: 2, inProgress: 0, overdue: 2, completed: 0 },
];

const teamData = [
  { name: "Riley Kim", department: "Technology", tasks: 4 },
  { name: "Sam Chen", department: "Technology", tasks: 3 },
  { name: "Morgan Taylor", department: "Admin", tasks: 3 },
  { name: "Casey Brooks", department: "Finance", tasks: 3 },
  { name: "Alex Rivera", department: "Operations", tasks: 2 },
  { name: "Jordan Lee", department: "Dispatch", tasks: 2 },
];

const activityData = [
  { initials: "SC", title: "Set up CI/CD pipeline", project: "Tech Infrastructure", date: "Apr 21", status: "review" as const, assignee: "Sam Chen" },
  { initials: "AR", title: "Weekly ops report automation", project: "Operations Overhaul", date: "Apr 21", status: "done" as const, assignee: "Alex Rivera" },
  { initials: "DM", title: "Route optimization algorithm", project: "Dispatch Optimization", date: "Apr 21", status: "review" as const, assignee: "Jordan Lee" },
  { initials: "AP", title: "New hire orientation schedule", project: "Employee Onboarding 2.0", date: "Apr 21", status: "review" as const, assignee: "Morgan Taylor" },
  { initials: "SC", title: "Database backup strategy", project: "Tech Infrastructure", date: "Apr 21", status: "review" as const, assignee: "Sam Chen" },
  { initials: "TN", title: "Client feedback survey", project: "Operations Overhaul", date: "Apr 21", status: "review" as const, assignee: "Casey Brooks" },
];

const Index = () => {
  const [project, setProject] = useState("All Projects");
  const [member, setMember] = useState("All Members");

  const projectOptions = ["All Projects", ...projectsData.map((item) => item.name)];
  const memberOptions = ["All Members", ...teamData.map((item) => item.name)];

  const filteredProjects = useMemo(
    () => (project === "All Projects" ? projectsData : projectsData.filter((item) => item.name === project)),
    [project]
  );

  const filteredTeam = useMemo(
    () => (member === "All Members" ? teamData : teamData.filter((item) => item.name === member)),
    [member]
  );

  const filteredActivity = useMemo(
    () =>
      activityData.filter(
        (item) =>
          (project === "All Projects" || item.project === project) &&
          (member === "All Members" || item.assignee === member)
      ),
    [project, member]
  );

  const kpis = useMemo(() => {
    const total = filteredProjects.reduce((sum, item) => sum + item.total, 0);
    const inProgress = filteredProjects.reduce((sum, item) => sum + item.inProgress, 0);
    const overdue = filteredProjects.reduce((sum, item) => sum + item.overdue, 0);
    const completed = filteredProjects.reduce((sum, item) => sum + item.completed, 0);
    const onTime = total === 0 ? 0 : Math.round(((total - overdue) / total) * 100);
    const overdueRate = total === 0 ? 0 : Math.round((overdue / total) * 100);

    return [
      { label: "Total Tasks", value: String(total), icon: ListChecks, tone: "green" as const },
      { label: "In Progress", value: String(inProgress), icon: Loader2, tone: "blue" as const },
      { label: "Overdue", value: String(overdue), icon: AlertTriangle, tone: "red" as const },
      { label: "Completed", value: String(completed), icon: CheckCircle2, tone: "teal" as const },
      { label: "On-Time Rate", value: `${onTime}%`, icon: Gauge, tone: "green" as const },
      { label: "Overdue Rate", value: `${overdueRate}%`, icon: TrendingDown, tone: "amber" as const },
    ];
  }, [filteredProjects]);

  return (
    <div className="mx-auto max-w-[1260px] px-6 py-7 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[24px] font-extrabold tracking-[-0.03em] text-foreground">Dashboard</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">TGO operations overview</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <FilterSelect value={project} options={projectOptions} onChange={setProject} />
          <FilterSelect value={member} options={memberOptions} onChange={setMember} />
        </div>
      </header>

      <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {kpis.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <PanelCard title="Project Progress" icon={FolderKanban}>
          <div className="space-y-2">
            {filteredProjects.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No projects match.</p>
            ) : (
              filteredProjects.map((item) => (
                <ProgressRow
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  onClick={() => toast(item.name, { description: `${item.value}% complete · ${item.total} tasks` })}
                />
              ))
            )}
          </div>
        </PanelCard>

        <PanelCard title="Team Workload" icon={Users}>
          <div className="divide-y divide-border/60">
            {filteredTeam.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No members match.</p>
            ) : (
              filteredTeam.map((item) => (
                <WorkloadRow
                  key={item.name}
                  {...item}
                  onClick={() => toast(item.name, { description: `${item.department} · ${item.tasks} active tasks` })}
                />
              ))
            )}
          </div>
        </PanelCard>

        <PanelCard title="Recent Activity" icon={Activity}>
          <div className="divide-y divide-border/60">
            {filteredActivity.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No activity matches.</p>
            ) : (
              filteredActivity.map((item) => (
                <ActivityRow
                  key={item.title}
                  {...item}
                  onClick={() => toast(item.title, { description: `${item.project} · ${item.assignee}` })}
                />
              ))
            )}
          </div>
        </PanelCard>
      </section>
    </div>
  );
};

export default Index;
