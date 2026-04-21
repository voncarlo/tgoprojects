import { useMemo, useState } from "react";
import { CheckCircle2, LucideIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  sampleItems: string[];
}

export const PlaceholderPage = ({
  title,
  subtitle,
  icon: Icon,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  sampleItems,
}: PlaceholderPageProps) => {
  const [query, setQuery] = useState("");
  const [demoEnabled, setDemoEnabled] = useState(true);
  const [selectedItem, setSelectedItem] = useState(sampleItems[0] ?? "");

  const filteredItems = useMemo(
    () => sampleItems.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase())),
    [query, sampleItems]
  );

  return (
    <div className="mx-auto max-w-[1500px] px-8 py-8 lg:px-10 lg:py-10">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Icon className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <h2 className="text-xl font-semibold text-foreground">{title} workspace</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => toast(primaryActionLabel, { description: `${title} demo workflow launched.` })}>
                {primaryActionLabel}
              </Button>
              <Button
                variant="outline"
                onClick={() => toast(secondaryActionLabel, { description: `${title} preview generated for the selected item.` })}
              >
                {secondaryActionLabel}
              </Button>
            </div>

            <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 p-4">
              <label className="mb-2 block text-sm font-medium text-foreground">Search {title.toLowerCase()}</label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={`Find a ${title.toLowerCase()} item`}
                  className="pl-9"
                />
              </div>
              <div className="mt-4 grid gap-2">
                {filteredItems.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                    No matching items found.
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setSelectedItem(item);
                        toast(item, { description: `${title} item selected.` });
                      }}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        selectedItem === item
                          ? "border-primary/40 bg-primary/5 text-foreground"
                          : "border-border/70 bg-card hover:bg-muted/40"
                      }`}
                    >
                      <span className="text-sm font-medium">{item}</span>
                      {selectedItem === item && <CheckCircle2 className="h-4 w-4 text-primary" strokeWidth={2} />}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Demo Controls</h3>
                <p className="mt-1 text-sm text-muted-foreground">Use these to simulate live workspace actions.</p>
              </div>
              <Switch
                checked={demoEnabled}
                onCheckedChange={(checked) => {
                  setDemoEnabled(checked);
                  toast(`Demo mode ${checked ? "enabled" : "disabled"}`);
                }}
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Current Selection</p>
                <p className="mt-2 text-base font-semibold text-foreground">
                  {selectedItem || `No ${title.toLowerCase()} item selected`}
                </p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Automation Status</p>
                <p className="mt-2 text-sm text-foreground">
                  {demoEnabled
                    ? `${title} automations are ready to run against the selected item.`
                    : `${title} automations are paused until demo mode is enabled again.`}
                </p>
              </div>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() =>
                  toast(`Queued ${title} action`, {
                    description: selectedItem
                      ? `${selectedItem} was added to the next processing batch.`
                      : `Choose an item first to queue a ${title.toLowerCase()} action.`,
                  })
                }
              >
                Queue Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
