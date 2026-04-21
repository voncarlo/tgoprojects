import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterSelectProps {
  value: string;
  options?: string[];
  onChange: (v: string) => void;
}

export const FilterSelect = ({ value, options = [], onChange }: FilterSelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex min-w-[150px] items-center justify-between gap-2 rounded-xl border border-border/70 bg-card px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring/30">
          {value}
          <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[200px]">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt}
            onSelect={() => onChange(opt)}
            className="cursor-pointer"
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                opt === value ? "opacity-100 text-primary" : "opacity-0"
              )}
            />
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
