import { cn } from "@/lib/utils";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./ui/hover-card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

export const ListItem = ({
  id,
  isChecked,
  checkChange,
  label,
  disabled,
  tooltipText,
}: {
  id: string;
  isChecked: boolean;
  checkChange: () => void;
  label: string;
  disabled: boolean;
  tooltipText?: string;
}) => {
  return (
    <div className="max-w-max">
      <HoverCard>
        <HoverCardTrigger>
          <Label
            htmlFor={id}
            className={cn("text-lg", {
              "text-muted-foreground": disabled,
            })}
          >
            <Checkbox
              id={id}
              checked={isChecked}
              onCheckedChange={() => {
                if (!disabled) checkChange();
              }}
              disabled={disabled}
            />
            {label}
          </Label>
        </HoverCardTrigger>
        {tooltipText && !disabled && !isChecked && (
          <HoverCardContent className="w-96">{tooltipText}</HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};
