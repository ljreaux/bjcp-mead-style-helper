import { LucideX } from "lucide-react";
import { Input } from "./input";

function SearchInput({
  searchValue,
  search,
  placeholder,
  clearSearch,
}: {
  searchValue: string;
  search: (str: string) => void;
  placeholder: string;
  clearSearch: () => void;
}) {
  return (
    <div className="relative max-w-sm">
      <Input
        id="search"
        value={searchValue}
        onChange={(e) => {
          search(e.target.value);
        }}
        placeholder={`Search ${placeholder}`}
        className="pr-8"
      />
      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <LucideX />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
