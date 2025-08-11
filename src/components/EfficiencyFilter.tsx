import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function EfficiencyFilter({ value, onChange }: FilterProps<string | null>) {
  const options = ["Wszystkie", "A", "B", "C", "D", "E", "F", "G"];

  return <Dropdown label="Klasa energetyczna" options={options} selected={value} onChange={onChange} />;
}

export default EfficiencyFilter;
