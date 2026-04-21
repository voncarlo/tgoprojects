import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  CircleDashed,
  Clock3,
  Filter,
  Plus,
  UserRound,
} from "lucide-react";
import { FilterSelect } from "@/components/dashboard/FilterSelect";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PanelCard } from "@/components/dashboard/PanelCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type TaskStatus = "In Progress" | "Blocked" | "Review" | "Completed" | "Not Started";
type TaskPriority = "Critical" | "High" | "Medium" | "Low";

interface TaskItem {
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  department: string;
  deadline: string;
  tags: string[];
}

const tasks: TaskItem[] = [
  {
    title: "Finalize April driver payroll reconciliation",
    priority: "Critical",
    status: "In Progress",
    assignee: "Casey Brooks",
    department: "Finance",
    deadline: "Apr 23",
    tags: ["Payroll", "Month-End"],
  },
  {
    title: "Roll out dispatch handoff checklist",
    priority: "High",
    status: "Review",
    assignee: "Jordan Lee",
    department: "Dispatch",
    deadline: "Apr 24",
    tags: ["Dispatch", "Process"],
  },
  {
    title: "Migrate asset tracker to shared workspace",
    priority: "High",
    status: "Blocked",
    assignee: "Riley Kim",
    department: "Technology",
    deadline: "Apr 22",
    tags: ["Systems", "Migration"],
  },
  {
    title: "Prepare onboarding packets for new hires",
    priority: "Medium",
    status: "Completed",
    assignee: "Morgan Taylor",
    department: "Admin",
    deadline: "Apr 21",
    tags: ["HR", "Onboarding"],
  },
  {
    title: "Validate client portal content approvals",
    priority: "Medium",
    status: "In Progress",
    assignee: "Sam Chen",
    department: "Technology",
    deadline: "Apr 26",
    tags: ["Client Portal", "Approvals"],
  },
  {
    title: "Confirm warehouse inventory spot-checks",
    priority: "Low",
    status: "Not Started",
    assignee: "Alex Rivera",
    department: "Operations",
    deadline: "Apr 29",
    tags: ["Inventory", "Ops"],
  },
  {
    title: "Review Q2 compliance document updates",
    priority: "High",
    status: "Review",
    assignee: "Taylor Nguyen",
    department: "Admin",
    deadline: "Apr 25",
    tags: ["Compliance", "Docs"],
  },
  {
    title: "Clean up stale route import warnings",
    priority: "Low",
    status: "Completed",
    assignee: "Riley Kim",
    department: "Technology",
    deadline: "Apr 20",
    tags: ["Codebase", "Maintenance"],
  },
];

const priorityTone: Record<TaskPriority, string> = {
  Critical: "border-red-200 bg-red-50 text-red-700",
  High: "border-amber-200 bg-amber-50 text-amber-700",
  Medium: "border-sky-200 bg-sky-50 text-sky-700",
  Low: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const statusTone: Record<TaskStatus, string> = {
  "In Progress": "border-blue-200 bg-blue-50 text-blue-700",
  Blocked: "border-rose-200 bg-rose-50 text-rose-700",
  Review: "border-violet-200 bg-violet-50 text-violet-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Not Started": "border-slate-200 bg-slate-100 text-slate-700",
};

const initialsFor = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Tasks = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "All Statuses">("All Statuses");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All Departments");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "All Priorities">("All Priorities");

  const statusOptions: Array<TaskStatus | "All Statuses"> = [
    "All Statuses",
    "In Progress",
    "Blocked",
    "Review",
    "Completed",
    "Not Started",
  ];
  const departmentOptions = ["All Departments", ...Array.from(new Set(tasks.map((task) => task.department)))];
  const priorityOptions: Array<TaskPriority | "All Priorities"> = [
    "All Priorities",
    "Critical",
    "High",
    "Medium",
    "Low",
  ];

  const filteredTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          (statusFilter === "All Statuses" || task.status === statusFilter) &&
          (departmentFilter === "All Departments" || task.department === departmentFilter) &&
          (priorityFilter === "All Priorities" || task.priority === priorityFilter)
      ),
    [departmentFilter, priorityFilter, statusFilter]
  );

  const summary = useMemo(() => {
    const total = filteredTasks.length;
    const inProgress = filteredTasks.filter((task) => task.status === "In Progress").length;
    const review = filteredTasks.filter((task) => task.status === "Review").length;
    const blocked = filteredTasks.filter((task) => task.status === "Blocked").length;
    const completed = filteredTasks.filter((task) => task.status === "Completed").length;

    return { total, inProgress, review, blocked, completed };
  }, [filteredTasks]);

  return (
    <div className="mx-auto max-w-[1260px] px-6 py-7 lg:px-8">
      <PageHeader
        title="Tasks"
        subtitle="Track every active item by priority, ownership, department, deadline, and tags."
        actions={
          <>
            <Button variant="outline" className="rounded-xl">
              <Filter className="h-4 w-4" />
              Filter Set
            </Button>
            <Button className="rounded-xl">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </>
        }
      />

      <section className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Total Tasks" value={String(summary.total)} icon={CheckSquare} tone="green" />
        <KpiCard label="In Progress" value={String(summary.inProgress)} icon={Clock3} tone="blue" />
        <KpiCard label="In Review" value={String(summary.review)} icon={CircleDashed} tone="purple" />
        <KpiCard label="Blocked" value={String(summary.blocked)} icon={AlertTriangle} tone="red" />
        <KpiCard label="Completed" value={String(summary.completed)} icon={CheckCircle2} tone="teal" />
      </section>

      <PanelCard title="Task Directory" icon={CalendarClock}>
        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect value={statusFilter} options={statusOptions} onChange={(value) => setStatusFilter(value as TaskStatus | "All Statuses")} />
            <FilterSelect value={departmentFilter} options={departmentOptions} onChange={setDepartmentFilter} />
            <FilterSelect value={priorityFilter} options={priorityOptions} onChange={(value) => setPriorityFilter(value as TaskPriority | "All Priorities")} />
          </div>
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredTasks.length}</span> tasks
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="min-w-[280px]">Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="min-w-[180px]">Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                  No tasks match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={`${task.title}-${task.assignee}`}>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Operational task record</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-semibold", priorityTone[task.priority])}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("font-semibold", statusTone[task.status])}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border/60">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {initialsFor(task.assignee)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{task.assignee}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <UserRound className="h-3.5 w-3.5" />
                          Owner
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{task.department}</TableCell>
                  <TableCell className="text-foreground">{task.deadline}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </PanelCard>
    </div>
  );
};

export default Tasks;
