import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function FunctionFilter({ value, onChange }: FilterProps<string>) {
  const options = [
    "wszystkie",
    "Drzwi AddWash™",
    "Panel AI Control",
    "Silnik inwerterowy",
    "Wyświetlacz elektroniczny",
  ];

  return <Dropdown label="Funkcje" options={options} selected={value} onChange={onChange} />;
}

export default FunctionFilter;
