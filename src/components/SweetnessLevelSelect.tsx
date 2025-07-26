import { useMeadStyle } from "@/hooks/useMeadStyle";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SweetnessLevelSelect = () => {
  const { changeSweetness, sweetnessLevel } = useMeadStyle();
  return (
    <div className="flex gap-2">
      <Label htmlFor="sweetness">Select Sweetness Level </Label>
      <Select onValueChange={changeSweetness} value={sweetnessLevel}>
        <SelectTrigger id="sweetness">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dry">Dry</SelectItem>
          <SelectItem value="semisweet">Semisweet</SelectItem>
          <SelectItem value="sweet">Sweet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
