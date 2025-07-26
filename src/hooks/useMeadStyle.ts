import { createContext, useContext } from "react";

export type Sweetness = "sweet" | "semisweet" | "dry";
export type Carb = "still" | "petillant" | "sparkling";
export type Strength = "hydromel" | "standard" | "sack";
export type Ingredient = { label: string; value: string; category: string };
export type MeadStyleStateType = {
  isTraditional: boolean;
  toggleTraditional: () => void;
  isMelomel: boolean;
  toggleMelomel: () => void;
  isMetheglin: boolean;
  toggleMetheglin: () => void;
  isSpecialty: boolean;
  toggleSpecialty: () => void;
  isBraggot: boolean;
  toggleBraggot: () => void;
  isHistorical: boolean;
  toggleHistorical: () => void;
  sweetnessLevel: Sweetness;
  changeSweetness: (str: string) => void;
  strengthLevel: Strength;
  changeStrength: (str: string) => void;
  carbonationLevel: Carb;
  changeCarbonation: (str: string) => void;
  honeyVarietal: string;
  changeHoneyVarietal: (str: string) => void;
  category: { category: string; link: string } | null;
  requiredInfo: string;
  updateRequiredInfo: (str: string) => void;
  updateOptionalInfo: (str: string) => void;
  optionalInfo: string;
  selectedIngredients: Ingredient[];
  setSelectedIngredients: (items: Ingredient[]) => void;
  warning: string | null;
  edited: boolean;
};

export const StyleContext = createContext<MeadStyleStateType | undefined>(
  undefined
);

export const useMeadStyle = () => {
  const context = useContext(StyleContext);

  if (!context)
    throw new Error("useMeadStyle must be used within a MeadStyleProvider");

  return context;
};
