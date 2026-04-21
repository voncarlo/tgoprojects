import {
  ArrowLeftRight,
  BriefcaseBusiness,
  CalendarClock,
  CarFront,
  ClipboardCheck,
  FileStack,
  IdCard,
  Medal,
  NotebookPen,
  ScanSearch,
  Truck,
  UserRoundSearch,
} from "lucide-react";

type ToolCard = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type ToolSection = {
  title: string;
  description: string;
  count: number;
  icon: React.ElementType;
  tools: ToolCard[];
};

const sections: ToolSection[] = [
  {
    title: "Business Admin Tools",
    description: "Planning, validation checks, reporting, and operations support.",
    count: 7,
    icon: BriefcaseBusiness,
    tools: [
      {
        title: "Attendance No-Show Monitor",
        description: "Review no-show patterns and attendance exceptions.",
        icon: ClipboardCheck,
      },
      {
        title: "Monthly Plan Input",
        description: "Submit and manage monthly operations plans.",
        icon: NotebookPen,
      },
      {
        title: "Monthly Plan Compare",
        description: "Compare planning snapshots across reporting periods.",
        icon: ArrowLeftRight,
      },
      {
        title: "Oil Change Tracker",
        description: "Monitor fleet maintenance schedules and service timing.",
        icon: CarFront,
      },
      {
        title: "New Hire Cross-Checker",
        description: "Cross-check new hires against onboarding and tracker records.",
        icon: UserRoundSearch,
      },
      {
        title: "Timecard Checker",
        description: "Review timecard approvals and exceptions pending validation.",
        icon: CalendarClock,
      },
      {
        title: "Driver Board",
        description: "Manage driver workflow and status visibility in one view.",
        icon: IdCard,
      },
    ],
  },
  {
    title: "Dispatch Tools",
    description: "Route support, send-back planning, ranking, and dispatch decisions.",
    count: 4,
    icon: Truck,
    tools: [
      {
        title: "ARMM Send Back Planner",
        description: "Plan send-backs and remaining driver hours more efficiently.",
        icon: Truck,
      },
      {
        title: "Route/Stage PDF Parser",
        description: "Extract route and stage details from dispatch PDFs.",
        icon: FileStack,
      },
      {
        title: "Send Back Snapshots",
        description: "Review send-back planning snapshots and comparison views.",
        icon: ScanSearch,
      },
      {
        title: "Weekly DA Ranking",
        description: "Rank DAs using weekly upload and score comparison data.",
        icon: Medal,
      },
    ],
  },
];

const ToolSectionCard = ({ section }: { section: ToolSection }) => (
  <section className="rounded-[22px] border border-border/80 bg-card/95 px-4 py-4 shadow-card backdrop-blur sm:px-6 sm:py-5">
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md bg-accent-teal-soft text-accent-teal">
        <section.icon className="h-4 w-4" strokeWidth={2.1} />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-[15px] font-extrabold tracking-[-0.02em] text-foreground sm:text-[17px]">
            {section.title}
          </h2>
          <span className="text-[13px] font-bold text-muted-foreground">({section.count})</span>
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground sm:text-[14px]">{section.description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 md:grid-cols-2">
      {section.tools.map((tool) => (
        <article
          key={tool.title}
          className="flex min-h-[198px] flex-col rounded-[18px] border border-[#cfdae2] bg-white px-4 py-5 shadow-[0_4px_14px_rgba(58,82,88,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[hsl(var(--accent-green-soft))] text-[hsl(var(--accent-teal))]">
            <tool.icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
          </div>
          <h3 className="mt-4 max-w-[18ch] text-[17px] font-extrabold leading-tight tracking-[-0.03em] text-foreground">
            {tool.title}
          </h3>
          <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{tool.description}</p>
          <button className="mt-auto inline-flex w-fit items-center rounded-xl border border-foreground/80 bg-white px-4 py-2 text-[13px] font-medium text-foreground transition hover:bg-accent/60">
            Open
          </button>
        </article>
      ))}
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-5 lg:py-5">
      <div className="space-y-5">
        {sections.map((section) => (
          <ToolSectionCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
};

export default Index;
