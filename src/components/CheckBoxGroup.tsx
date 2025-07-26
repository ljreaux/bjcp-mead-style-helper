import { useFuzzySearch } from "@/hooks/useFuzzySearch";
import type { Ingredient } from "@/hooks/useMeadStyle";
import { useState } from "react";
import SearchInput from "./ui/searchInput";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { LucideX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type CheckBoxGroupProps = {
  boxes?: Ingredient[];
  selected: Ingredient[];
  setSelected: (items: Ingredient[]) => void;
  label: string;
};

export const CheckBoxGroup = ({
  boxes,
  selected,
  setSelected,
  label,
}: CheckBoxGroupProps) => {
  const [customInput, setCustomInput] = useState("");

  const toggle = (ingredient: Ingredient) => {
    const exists = selected.some((item) => item.value === ingredient.value);
    if (exists) {
      setSelected(selected.filter((item) => item.value !== ingredient.value));
    } else {
      setSelected([...selected, ingredient]);
    }
  };

  const addCustomIngredient = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return;

    const exists = selected.some(
      (item) => item.label.toLowerCase() === trimmed.toLowerCase()
    );

    if (!exists) {
      setSelected([
        ...selected,
        {
          label: trimmed,
          value: trimmed.toLowerCase().replace(/\s+/g, "_"),
          category: "Berry",
        },
      ]);
    }
  };

  const handleRemove = (value: string) => {
    setSelected(selected.filter((item) => item.value !== value));
  };

  const handleCategoryChange = (value: string, cat: string) => {
    setSelected(
      selected.map((item) => {
        if (item.value === value) {
          return { ...item, category: cat };
        } else {
          return item;
        }
      })
    );
  };

  const { search, searchValue, clearSearch, filteredData } = useFuzzySearch({
    data: boxes ?? [],
    searchKey: ["label", "category"],
  });

  return (
    <div className="grid py-2 gap-2">
      <div className="flex gap-4">
        <SearchInput
          search={search}
          placeholder={label}
          searchValue={searchValue}
          clearSearch={clearSearch}
        />
        <Button onClick={() => setSelected([])}>
          Clear Selected Ingredients
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 h-64 overflow-y-auto p-6 border rounded-md">
        {filteredData.map((ingredient) => (
          <Label
            key={ingredient.value}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selected.some((item) => item.value === ingredient.value)}
              onCheckedChange={() => toggle(ingredient)}
            />
            {ingredient.label}
          </Label>
        ))}
      </div>
      <div className="grid gap-2">
        <div className="flex gap-4 items-center">
          <p>Add {label}</p>
          <Input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="max-w-36"
          />
          <Button
            onClick={() => {
              addCustomIngredient(customInput);
              setCustomInput("");
            }}
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {selected
            .filter((opt) => !boxes?.some((b) => b.value === opt.value))
            .map((option) => (
              <Card key={option.value} className="relative p-4">
                <CardContent>
                  <button
                    onClick={() => handleRemove(option.value)}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <LucideX className="w-4 h-4" />
                  </button>
                  <h2 className="text-base font-medium">{option.label}</h2>
                  <Select
                    value={option.category}
                    onValueChange={(val) => {
                      handleCategoryChange(option.value, val);
                    }}
                  >
                    <SelectTrigger className="w-[240px]">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Berry">Berry</SelectItem>
                      <SelectItem value="Cyser">Cyser</SelectItem>
                      <SelectItem value="Melomel">Melomel</SelectItem>
                      <SelectItem value="Pyment">Pyment</SelectItem>
                      <SelectItem value="Stone Fruit">Stone Fruit</SelectItem>
                      <SelectItem value="shv">
                        Spice, Herb, or Vegetable
                      </SelectItem>
                      <SelectItem value="experimental">
                        Experimental Ingredient
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};
