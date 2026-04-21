import {
  BarChart3,
  CheckSquare,
  FolderKanban,
  Gauge,
  LogOut,
  PackageSearch,
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

const LogoLockup = () => (
  <div className="pb-8 pt-6">
    <div className="flex flex-col items-center text-center">
      <div className="font-['Montserrat'] text-[22px] font-extrabold leading-none tracking-[0.06em] text-sidebar-primary">
        TGO
      </div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/95">
        TGO Portal
      </div>
      <div className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.24em] text-sidebar-muted">
        Workspace
      </div>
      <div className="mt-5 px-3 text-center">
        <p className="text-[12px] font-extrabold uppercase leading-tight tracking-[0.03em] text-white">
          Project Operations Hub
        </p>
        <p className="mt-1 text-[10px] font-semibold text-sidebar-foreground">
          Planning, tracking, and reporting
        </p>
      </div>
    </div>
    <div className="mt-4 border-t border-sidebar-border/90" />
  </div>
);

export const Sidebar = () => {
  return (
    <aside className="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col bg-gradient-sidebar px-4 text-sidebar-foreground lg:flex">
      <LogoLockup />

      <nav className="flex-1 overflow-y-auto pb-4">
        {navGroups.map((group) => (
          <div key={group.title} className="mb-7">
            <p className="mb-2 px-2 text-[11px] font-extrabold tracking-[0.12em] text-sidebar-muted">
              {group.title}
            </p>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2.5 text-[14px] font-semibold transition-all",
                      "text-sidebar-foreground hover:bg-white/8 hover:text-white"
                    )}
                    activeClassName="bg-white/28 text-white shadow-[inset_0_0_0_1px_hsl(0_0%_100%/.07)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <item.icon className="h-[16px] w-[16px] shrink-0" strokeWidth={2} />
                      <span className="leading-tight">{item.label}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mb-6 mt-auto border-t border-sidebar-border/90 pt-4">
        <button className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-[14px] font-semibold text-white/90 transition hover:bg-white/8 hover:text-white">
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Logout
        </button>
        <div className="mt-4 border-t border-sidebar-border/90 pt-4">
          <p className="px-2 text-[11px] font-extrabold tracking-[0.12em] text-sidebar-muted">
            INSIGHTS &amp; ADMIN
          </p>
          <div className="mt-3 rounded-xl border border-sidebar-border/70 bg-black/10 px-3 py-3 text-[12px] text-sidebar-foreground/90">
            <div className="flex items-start gap-2.5">
              <PackageSearch className="mt-0.5 h-4 w-4 text-sidebar-primary" strokeWidth={2} />
              <p>Operational tools, validation workflows, and reporting dashboards in one place.</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
