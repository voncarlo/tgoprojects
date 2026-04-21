import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  StickyNote,
  Users,
  BarChart3,
  Settings,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Item = { label: string; icon: React.ElementType; to: string };
type Section = { title: string; items: Item[] };

const sections: Section[] = [
  {
    title: "HOME",
    items: [{ label: "Dashboard", icon: LayoutDashboard, to: "/" }],
  },
  {
    title: "MANAGEMENT",
    items: [
      { label: "Projects", icon: FolderKanban, to: "/projects" },
      { label: "Tasks", icon: CheckSquare, to: "/tasks" },
      { label: "Notes & Ideas", icon: StickyNote, to: "/notes" },
    ],
  },
  {
    title: "TEAMS",
    items: [
      { label: "Teams", icon: Users, to: "/teams" },
      { label: "Reports", icon: BarChart3, to: "/reports" },
    ],
  },
  {
    title: "SETTINGS",
    items: [{ label: "Settings", icon: Settings, to: "/settings" }],
  },
];

const notifications = [
  { title: "Weekly ops report ready", time: "2m ago" },
  { title: "Riley Kim assigned you a task", time: "1h ago" },
  { title: "Budget forecast Q2 needs review", time: "3h ago" },
  { title: "Compliance audit scheduled", time: "Yesterday" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "sticky top-0 flex h-screen flex-col bg-gradient-sidebar text-sidebar-foreground transition-[width] duration-300 ease-out",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        {/* Brand */}
        <div className={cn("pt-7 pb-8", collapsed ? "px-4" : "px-6")}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary/20 ring-1 ring-sidebar-primary/30">
              <span className="text-sm font-bold text-sidebar-primary">T</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h1 className="truncate text-[15px] font-semibold leading-tight text-sidebar-accent-foreground">
                  TGO Portal
                </h1>
                <p className="mt-0.5 truncate text-[10px] font-medium tracking-[0.12em] text-sidebar-muted">
                  INTERNAL OPERATIONS WORKSPACE
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.14em] text-sidebar-muted">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const link = (
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        "text-sidebar-foreground/85 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      activeClassName="!bg-sidebar-accent !text-sidebar-accent-foreground shadow-sm"
                    >
                      <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.8} />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                  return (
                    <li key={item.label}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>{link}</TooltipTrigger>
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                      ) : (
                        link
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Profile */}
        <div className={cn("mx-3 mb-3 rounded-xl bg-sidebar-accent/50", collapsed ? "p-2" : "p-3")}>
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/30 text-xs font-semibold text-sidebar-accent-foreground ring-1 ring-sidebar-primary/40 transition hover:ring-sidebar-primary">
              AR
            </button>
            {!collapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">
                    Alex Rivera
                  </p>
                  <p className="truncate text-[11px] text-sidebar-muted">
                    Admin · Operations
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      aria-label="Notifications"
                      className="relative rounded-md p-1.5 text-sidebar-muted transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    >
                      <Bell className="h-4 w-4" strokeWidth={1.8} />
                      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent-amber" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="right" align="end" className="w-72 p-0">
                    <div className="border-b border-border px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">Notifications</p>
                      <p className="text-xs text-muted-foreground">{notifications.length} new updates</p>
                    </div>
                    <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.title}
                          className="cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-muted/50"
                        >
                          <p className="font-medium text-foreground">{n.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>

        {/* Hide sidebar */}
        <button
          onClick={onToggle}
          className={cn(
            "mx-3 mb-4 flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-sidebar-muted transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            collapsed && "justify-center"
          )}
          aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" strokeWidth={1.8} />
          ) : (
            <>
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.8} />
              Hide Sidebar
            </>
          )}
        </button>
      </aside>
    </TooltipProvider>
  );
};
