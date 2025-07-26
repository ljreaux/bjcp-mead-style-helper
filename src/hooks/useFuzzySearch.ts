import Fuse from "fuse.js";
import { useState } from "react";

interface FuzzySearchProps<T> {
  data: T[];
  searchKey: keyof T | (keyof T)[];
}

export const useFuzzySearch = <T>({ data, searchKey }: FuzzySearchProps<T>) => {
  const [search, setSearch] = useState("");
  const keys = Array.isArray(searchKey)
    ? searchKey.map(String)
    : [String(searchKey)];

  const filteredData =
    searchKey && search
      ? new Fuse(data || [], {
          keys,
          threshold: 0.4,
        })
          .search(search)
          .map((r) => r.item)
      : data;

  return {
    searchValue: search,
    search: (val: string) => setSearch(val),
    clearSearch: () => {
      setSearch("");
    },

    filteredData,
  };
};
