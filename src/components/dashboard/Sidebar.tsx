import {
  BarChart3,
  Bell,
  CheckSquare,
  FolderKanban,
  Gauge,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  StickyNote,
  Users,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    title: "HOME",
    items: [{ label: "Dashboard", icon: Gauge, to: "/" }],
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

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const LogoLockup = ({ collapsed }: { collapsed: boolean }) => (
  <div className={cn("border-b border-sidebar-border/80 pb-5 pt-3", collapsed ? "px-2" : "px-3")}>
    {!collapsed && (
      <div className="min-w-0 pt-0.5">
        <p className="truncate font-['Montserrat'] text-[15px] font-extrabold tracking-[-0.03em] text-sidebar-primary">
          TGO Projects
        </p>
        <p className="mt-1 truncate font-['Montserrat'] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9cb1a9]">
          Internal Operations Workspace
        </p>
      </div>
    )}
  </div>
);

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 flex-col bg-gradient-sidebar text-sidebar-foreground transition-[width] duration-300 lg:flex",
        collapsed ? "w-[88px] px-3" : "w-[250px] px-2"
      )}
    >
      <LogoLockup collapsed={collapsed} />

      <nav className="flex-1 overflow-y-auto pb-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-7">
            {!collapsed && (
              <p className="mb-2 px-3 font-['Montserrat'] text-[11px] font-bold tracking-[0.16em] text-[#8fa29b]">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[15px] font-semibold transition-all",
                      "text-[#edf1eb] hover:bg-white/6 hover:text-white",
                      collapsed && "justify-center px-3"
                    )}
                    activeClassName="bg-white/10 text-white shadow-[inset_0_0_0_1px_hsl(0_0%_100%/.03)]"
                  >
                    <item.icon className="h-[18px] w-[18px] shrink-0 text-inherit" strokeWidth={2} />
                    {!collapsed && <span className="leading-tight">{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto pb-4">
        {!collapsed && (
          <div className="mb-4 rounded-2xl bg-white/6 px-4 py-3 shadow-[inset_0_0_0_1px_hsl(0_0%_100%/.03)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sidebar-primary/40 text-[15px] font-extrabold text-white">
                AR
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-bold text-white">Alex Rivera</p>
                <p className="truncate text-[13px] text-[#d9ddd1]">Admin · Operations</p>
              </div>
              <button className="relative rounded-full p-1.5 text-[#d9ddd1] transition hover:bg-white/8 hover:text-white">
                <Bell className="h-4 w-4" strokeWidth={2} />
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent-amber" />
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#d9ddd1] transition hover:bg-white/8 hover:text-white",
            collapsed && "justify-center px-2"
          )}
          aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" strokeWidth={2} /> : <PanelLeftClose className="h-4 w-4" strokeWidth={2} />}
          {!collapsed && <span>Hide Sidebar</span>}
        </button>

        {!collapsed && (
          <button className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-[#d9ddd1] transition hover:bg-white/8 hover:text-white">
            <LogOut className="h-4 w-4" strokeWidth={2} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};
