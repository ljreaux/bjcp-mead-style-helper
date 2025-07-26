import { useMeadStyle } from "@/hooks/useMeadStyle";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CarbonationLevelSelect = () => {
  const { changeCarbonation, carbonationLevel } = useMeadStyle();
  return (
    <div className="flex gap-2">
      <Label htmlFor="sweetness">Select Carbonation Level </Label>
      <Select onValueChange={changeCarbonation} value={carbonationLevel}>
        <SelectTrigger id="sweetness">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="still">Still</SelectItem>
          <SelectItem value="petillant">Petillant</SelectItem>
          <SelectItem value="sparkling">Sparkling</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
