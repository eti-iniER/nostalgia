import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface HotkeyLegendProps {
  className?: string;
}

export function HotkeyLegend({ className }: HotkeyLegendProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>Alt</Kbd>
          <Kbd>&rarr;</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground text-sm">Next</span>
      </div>
      <div className="flex items-center gap-2">
        <KbdGroup>
          <Kbd>Alt</Kbd>
          <Kbd>&larr;</Kbd>
        </KbdGroup>
        <span className="text-muted-foreground text-sm">Previous</span>
      </div>
    </div>
  );
}
