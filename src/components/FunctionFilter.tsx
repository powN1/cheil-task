import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function FunctionFilter({ value, onChange }: FilterProps<string[]>) {
  const options = [
    "Wszystkie",
    "Drzwi AddWash™",
    "Panel AI Control",
    "Silnik inwerterowy",
    "Wyświetlacz elektroniczny",
  ];

  return <Dropdown label="Funkcje" options={options} selected={value} multiple={true} onChange={onChange} />;
}

export default FunctionFilter;
