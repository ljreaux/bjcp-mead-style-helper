import { useMeadStyle } from "@/hooks/useMeadStyle";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function StrengthLevelSelect() {
  const { changeStrength, strengthLevel } = useMeadStyle();

  return (
    <div className="flex gap-2">
      <Label htmlFor="sweetness">Select Strength Level </Label>
      <Select onValueChange={changeStrength} value={strengthLevel}>
        <SelectTrigger id="strength">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hydromel">Hydromel</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="sack">Sack</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default StrengthLevelSelect;
