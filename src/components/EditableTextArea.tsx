import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Copy, CopyCheckIcon, Pencil, PencilOff } from "lucide-react";
import { Textarea } from "./ui/textarea";

export const EditableTextArea = ({
  value,
  label,
  handleChange,
  disabled,
  toggleDisabled,
}: {
  value: string;
  label: string;
  handleChange: (str: string) => void;
  disabled: boolean;
  toggleDisabled: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <Label className="grid gap-2 text-lg">
      {label}
      <div className="relative">
        <Textarea
          value={value}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
        />

        <div className="absolute right-2 top-2 flex">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleDisabled}
          >
            <Pencil
              className={cn(
                "absolute transition-opacity duration-300",
                disabled ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            />
            <PencilOff
              className={cn(
                "absolute transition-opacity duration-300",
                disabled ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="relative"
          >
            <Copy
              className={cn(
                "absolute transition-all duration-300",
                copied
                  ? "opacity-0 pointer-events-none text-green-500"
                  : "opacity-100"
              )}
            />
            <CopyCheckIcon
              className={cn(
                "absolute text-green-500 transition-all duration-300",
                copied
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none text-foreground"
              )}
            />
          </Button>
        </div>
      </div>
    </Label>
  );
};
