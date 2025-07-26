import { useQuery } from "@tanstack/react-query";

type IngredientItem = {
  label: string;
  value: string;
};

export const useIngredients = () => {
  return useQuery<IngredientItem[]>({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const res = await fetch("/ingredients.json");
      if (!res.ok) {
        throw new Error("Failed to fetch ingredient data");
      }
      return res.json();
    },
  });
};
