import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function SortFilter({ value, onChange }: FilterProps<string>) {
  const options = ["wszystkie", "cena", "pojemność"];

  return <Dropdown label="Sortuj po" options={options} selected={value} onChange={onChange} />;
}

export default SortFilter;
