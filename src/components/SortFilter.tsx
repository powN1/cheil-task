import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function SortFilter({ value, onChange }: FilterProps<string | null>) {
  const options = ["Wszystkie", "Cena (malejąco)", "Cena (rosnąco)", "Pojemność (malejąco)", "Pojemność (rosnąco)"];

  return <Dropdown label="Sortuj po" options={options} selected={value} onChange={onChange} />;
}

export default SortFilter;
