import { useQuery } from "@tanstack/react-query";
import type { Ingredient } from "./useMeadStyle";
const BASE_URL = "https://meadtools.com";

export const useIngredients = () => {
  return useQuery<Ingredient[]>({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/bjcp-ingredients`);
      if (!res.ok) {
        throw new Error("Failed to fetch ingredient data");
      }
      return res.json();
    },
  });
};
