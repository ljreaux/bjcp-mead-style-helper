import { useMeadStyle } from "@/hooks/useMeadStyle";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";

export const HoneyVarietalLine = () => {
  const [addingVarietal, setAddingVarietal] = useState(false);
  const { honeyVarietal, changeHoneyVarietal } = useMeadStyle();
  return (
    <>
      <Label>
        Would you like to declare a honey varietal?
        <Select
          onValueChange={(val) => {
            setAddingVarietal(val === "yes");
            if (val === "no") {
              changeHoneyVarietal("");
            }
          }}
          defaultValue="no"
        >
          <SelectTrigger>
            <SelectValue></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </Label>
      {addingVarietal && (
        <Label className="grid">
          Varietal Name
          <Input
            value={honeyVarietal}
            onChange={(e) => changeHoneyVarietal(e.target.value)}
          />
        </Label>
      )}
    </>
  );
};
