import {
  StyleContext,
  type Carb,
  type Ingredient,
  type Strength,
  type Sweetness,
} from "@/hooks/useMeadStyle";
import { useEffect, useState, type ReactNode } from "react";

type IngredientReturnType = {
  isExperimental: boolean;
  isFruited: boolean;
  isSpiced: boolean;
  isHistorical: boolean;
  isBraggot: boolean;
  fruitSubtype: string | null;
  sweetness: Sweetness;
};

export const MeadStyleProvider = ({ children }: { children: ReactNode }) => {
  const [isTraditional, setIsTraditional] = useState(false);
  const [isMelomel, setIsMelomel] = useState(false);
  const [isMetheglin, setIsMetheglin] = useState(false);
  const [isSpecialty, setIsSpecialty] = useState(false);
  const [isBraggot, setIsBraggot] = useState(false);
  const [isHistorical, setIsHistorical] = useState(false);
  const [sweetness, setSweetness] = useState<Sweetness>("dry");
  const [carbonationLevel, setCarbonation] = useState<Carb>("still");
  const [strengthLevel, setStrength] = useState<Strength>("standard");
  const [honeyVarietal, setHoneyVarietal] = useState("");
  const [requiredInfo, setRequiredInfo] = useState("");
  const [optionalInfo, setOptionalInfo] = useState("");

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );

  const [warning, setWarning] = useState<string | null>(null);

  const [category, setCategory] = useState<{
    category: string;
    link: string;
  } | null>(null);

  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (isTraditional) {
      setIsMelomel(false);
      setIsMetheglin(false);
      setIsSpecialty(false);
    }
    if (isSpecialty) {
      setIsTraditional(false);
      setIsSpecialty(true);
    }
    if (isBraggot) {
      setIsTraditional(false);
      setIsBraggot(true);
    }
    if (isHistorical) {
      setIsTraditional(false);
      setIsHistorical(true);
    }
  }, [
    isTraditional,
    isMelomel,
    isMetheglin,
    isSpecialty,
    sweetness,
    isBraggot,
    isHistorical,
  ]);

  useEffect(() => {
    if (isSpecialty) {
      setWarning(null);
      return;
    }

    let warningMessage = null;

    const hasExperimental = selectedIngredients.some(
      (ing) => ing.category === "experimental"
    );

    const hasSHV = selectedIngredients.some((ing) => ing.category === "shv");

    const hasFruit = selectedIngredients.some(
      (ing) => ing.category !== "shv" && ing.category !== "experimental"
    );

    if (!isHistorical && hasExperimental) {
      warningMessage =
        "One or more ingredients would push this mead into the Experimental category.";
    } else if (!isMetheglin && hasSHV) {
      warningMessage =
        "You’ve selected spice, herb, or vegetable ingredients without marking this mead as a containing any spices, herbs, or vegetables.";
    } else if (!isMelomel && hasFruit) {
      warningMessage =
        "You’ve selected fruits but haven’t indicated that it contains any fruit.";
    } else if (isMelomel && !hasFruit) {
      warningMessage =
        "You've selected that your Mead contains fruits, but haven't selected any fruits.";
    } else if (isMetheglin && !hasSHV) {
      warningMessage =
        "You've selected that your Mead contains spices, but haven't selected any spices.";
    }

    if (warningMessage?.length) {
      warningMessage +=
        " Please review the questions on the previous page carefully and look at the tooltips for further clarifying information.";
    }

    setWarning(warningMessage);
  }, [selectedIngredients, isSpecialty, isMelomel, isMetheglin, isHistorical]);

  const determineIngredients = (
    selectedIngredients: Ingredient[],
    isHistorical: boolean,
    isBraggot: boolean,
    markedExperimental: boolean,
    sweetness: Sweetness
  ): IngredientReturnType => {
    const categoryMap = {
      experimental: "experimental",
      fruit: ["Berry", "Cyser", "Melomel", "Pyment", "Stone Fruit"],
      shv: "shv",
    };

    const isExperimental =
      selectedIngredients.some(
        (ing) => ing.category === categoryMap.experimental
      ) || markedExperimental;

    const isFruited = selectedIngredients.some((ing) =>
      categoryMap.fruit.includes(ing.category!)
    );

    const isSpiced = selectedIngredients.some(
      (ing) => ing.category === categoryMap.shv
    );

    const fruitCategories = categoryMap.fruit;

    const selectedFruitCategories = Array.from(
      new Set(
        selectedIngredients
          .map((ing) => ing.category)
          .filter((cat): cat is string => fruitCategories.includes(cat!))
      )
    );

    let fruitSubtype: string | null = null;

    if (selectedFruitCategories.includes("Melomel")) {
      fruitSubtype = "Melomel";
    } else if (selectedFruitCategories.length > 1) {
      // handles multiple types of fruit
      fruitSubtype = "Melomel";
    } else if (selectedFruitCategories.length === 1) {
      fruitSubtype = selectedFruitCategories[0];
    }

    return {
      isExperimental,
      isFruited,
      isSpiced,
      isHistorical,
      isBraggot,
      fruitSubtype,
      sweetness,
    };
  };

  const determineCategory = (details: IngredientReturnType) => {
    const baseLink = "https://www.bjcp.org/style/2015";
    const fruitCategoryMap: Record<string, string> = {
      Berry: "M2C",
      Cyser: "M2A",
      Melomel: "M2E",
      Pyment: "M2B",
      "Stone Fruit": "M2D",
    };

    let category = "M1";
    let path = category;

    if (details.isHistorical) {
      category = "M4B";
      path = `M4/${category}`;
    } else if (details.isExperimental) {
      category = "M4C";
      path = `M4/${category}`;
    } else if (details.isBraggot) {
      category = "M4A";
      path = `M4/${category}`;
    } else if (details.isFruited && !details.isSpiced) {
      category = fruitCategoryMap[details.fruitSubtype!] ?? "M2E"; // fallback to Melomel
      path = `M2/${category}`;
    } else if (details.isFruited && details.isSpiced) {
      category = "M3A";
      path = `M3/${category}`;
    } else if (details.isSpiced) {
      category = "M3B";
      path = `M3/${category}`;
    }

    if (category === "M1") {
      switch (details.sweetness) {
        case "dry":
          category += "A";
          break;
        case "semisweet":
          category += "B";
          break;
        case "sweet":
          category += "C";
      }
      path += `/${category}`;
    }

    return {
      category,
      link: `${baseLink}/${path}`,
    };
  };

  const determineAdditionalInfo = (
    category: string,
    ingredients: Ingredient[],
    honeyVarietal: string
  ) => {
    const labels = ingredients.map((ing) => ing.label);
    const count = labels.length;

    let substring = "";
    if (count === 1) {
      substring = labels[0];
    } else if (count === 2) {
      substring = `${labels[0]} and ${labels[1]}`;
    } else if (count > 2) {
      substring = `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
    }

    let ingredientList = "";
    let varietal = "";

    if (substring.length) ingredientList = `Mead with ${substring}. `;
    if (honeyVarietal.length) varietal = `${honeyVarietal} Honey.`;

    if (["M2C", "M2D", "M2E", "M3A", "M3B", "M4C"].includes(category)) {
      return { required: ingredientList, optional: varietal };
    } else {
      return {
        optional: ingredientList + varietal,
        required: null,
      };
    }
  };

  useEffect(() => {
    if (edited) return;

    const details = determineIngredients(
      selectedIngredients,
      isHistorical,
      isBraggot,
      isSpecialty,
      sweetness
    );
    const category = determineCategory(details);

    setCategory(category);

    const additionalInfo = determineAdditionalInfo(
      category.category,
      selectedIngredients,
      honeyVarietal
    );
    setRequiredInfo(additionalInfo.required ?? "");
    setOptionalInfo(additionalInfo.optional);
  }, [
    selectedIngredients,
    isHistorical,
    isBraggot,
    isSpecialty,
    sweetness,
    honeyVarietal,
    edited,
  ]);

  return (
    <StyleContext.Provider
      value={{
        isTraditional,
        toggleTraditional: () => {
          setIsTraditional((prev) => {
            if (!prev) setSelectedIngredients([]);
            return !prev;
          });
        },
        isMelomel,
        toggleMelomel: () => setIsMelomel((prev) => !prev),
        isMetheglin,
        toggleMetheglin: () => setIsMetheglin((prev) => !prev),
        isSpecialty,
        toggleSpecialty: () => setIsSpecialty((prev) => !prev),
        isBraggot,
        toggleBraggot: () => setIsBraggot((prev) => !prev),
        isHistorical,
        toggleHistorical: () => setIsHistorical((prev) => !prev),
        sweetnessLevel: sweetness,
        changeSweetness: (str) => setSweetness(str as Sweetness),
        carbonationLevel,
        changeCarbonation: (str) => setCarbonation(str as Carb),
        strengthLevel,
        changeStrength: (str) => setStrength(str as Strength),
        honeyVarietal,
        changeHoneyVarietal: setHoneyVarietal,
        category,
        requiredInfo,
        updateRequiredInfo: (str: string) => {
          setRequiredInfo(str);
          setEdited(true);
        },
        optionalInfo,
        updateOptionalInfo: (str: string) => {
          setOptionalInfo(str);
          setEdited(true);
        },
        selectedIngredients,
        setSelectedIngredients,
        warning,
        edited,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
