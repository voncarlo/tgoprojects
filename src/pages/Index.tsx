import { useMemo, useState } from "react";
import {
  ListChecks,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  TrendingDown,
  FolderKanban,
  Users,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PanelCard } from "@/components/dashboard/PanelCard";
import { ProgressRow } from "@/components/dashboard/ProgressRow";
import { WorkloadRow } from "@/components/dashboard/WorkloadRow";
import { ActivityRow } from "@/components/dashboard/ActivityRow";
import { FilterSelect } from "@/components/dashboard/FilterSelect";
import { PageHeader } from "@/components/dashboard/PageHeader";

const projectsData = [
  { name: "Operations Overhaul", value: 40, total: 8, inProgress: 3, overdue: 2, completed: 1 },
  { name: "Tech Infrastructure", value: 20, total: 6, inProgress: 2, overdue: 1, completed: 1 },
  { name: "Dispatch Optimization", value: 0, total: 4, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Finance Automation", value: 0, total: 4, inProgress: 1, overdue: 1, completed: 1 },
  { name: "Employee Onboarding 2.0", value: 20, total: 3, inProgress: 1, overdue: 1, completed: 1 },
  { name: "Client Portal Redesign", value: 0, total: 3, inProgress: 1, overdue: 1, completed: 0 },
  { name: "Compliance & Audit", value: 0, total: 2, inProgress: 0, overdue: 1, completed: 0 },
];

const teamData = [
  { name: "Riley Kim", department: "Technology", tasks: 4 },
  { name: "Casey Brooks", department: "Finance", tasks: 3 },
  { name: "Alex Rivera", department: "Operations", tasks: 2 },
  { name: "Sam Chen", department: "Technology", tasks: 2 },
  { name: "Jordan Lee", department: "Dispatch", tasks: 2 },
  { name: "Morgan Taylor", department: "Admin", tasks: 2 },
];

const activityData = [
  { initials: "WO", title: "Weekly ops report automation", project: "Operations Overhaul", date: "Apr 21", status: "done" as const, assignee: "Alex Rivera" },
  { initials: "CF", title: "Client feedback survey", project: "Operations Overhaul", date: "Apr 21", status: "review" as const, assignee: "Casey Brooks" },
  { initials: "RO", title: "Route optimization algorithm", project: "Dispatch Optimization", date: "Apr 15", status: "review" as const, assignee: "Jordan Lee" },
  { initials: "AP", title: "API documentation", project: "Tech Infrastructure", date: "Apr 15", status: "review" as const, assignee: "Sam Chen" },
  { initials: "WA", title: "Workflow automation mapping", project: "Operations Overhaul", date: "Apr 15", status: "backlog" as const, assignee: "Morgan Taylor" },
  { initials: "BF", title: "Budget forecast Q2", project: "Finance Automation", date: "Apr 15", status: "review" as const, assignee: "Riley Kim" },
];

const Index = () => {
  const [project, setProject] = useState("All Projects");
  const [member, setMember] = useState("All Members");

  const projectOptions = ["All Projects", ...projectsData.map((p) => p.name)];
  const memberOptions = ["All Members", ...teamData.map((t) => t.name)];

  const filteredProjects = useMemo(
    () => (project === "All Projects" ? projectsData : projectsData.filter((p) => p.name === project)),
    [project]
  );
  const filteredTeam = useMemo(
    () => (member === "All Members" ? teamData : teamData.filter((t) => t.name === member)),
    [member]
  );
  const filteredActivity = useMemo(
    () =>
      activityData.filter(
        (a) =>
          (project === "All Projects" || a.project === project) &&
          (member === "All Members" || a.assignee === member)
      ),
    [project, member]
  );

  const kpis = useMemo(() => {
    const total = filteredProjects.reduce((s, p) => s + p.total, 0);
    const inProgress = filteredProjects.reduce((s, p) => s + p.inProgress, 0);
    const overdue = filteredProjects.reduce((s, p) => s + p.overdue, 0);
    const completed = filteredProjects.reduce((s, p) => s + p.completed, 0);
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
    <div className="mx-auto max-w-[1500px] px-8 py-8 lg:px-10 lg:py-10">
      <PageHeader
        title="Dashboard"
        subtitle="TGO operations overview"
        actions={
          <>
            <FilterSelect value={project} options={projectOptions} onChange={setProject} />
            <FilterSelect value={member} options={memberOptions} onChange={setMember} />
          </>
        }
      />

      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <PanelCard title="Project Progress" icon={FolderKanban}>
          <div className="space-y-3">
            {filteredProjects.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">No projects match.</p>
            ) : (
              filteredProjects.map((p) => (
                <ProgressRow
                  key={p.name}
                  name={p.name}
                  value={p.value}
                  onClick={() => toast(`${p.name}`, { description: `${p.value}% complete · ${p.total} tasks` })}
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
              filteredTeam.map((m) => (
                <WorkloadRow
                  key={m.name}
                  {...m}
                  onClick={() => toast(m.name, { description: `${m.department} · ${m.tasks} active tasks` })}
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
              filteredActivity.map((a) => (
                <ActivityRow
                  key={a.title}
                  {...a}
                  onClick={() => toast(a.title, { description: `${a.project} · ${a.assignee}` })}
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
