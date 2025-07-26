import { useQuery } from "@tanstack/react-query";
import type { Ingredient } from "./useMeadStyle";

export const useIngredients = () => {
  return useQuery<Ingredient[]>({
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
