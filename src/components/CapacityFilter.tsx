import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function CapacityFilter({ value, onChange }: FilterProps<string | null>) {
  const options = ["Wszystkie", "6kg", "9kg", "10.5kg"];

  return <Dropdown label="Pojemność" options={options} selected={value} onChange={onChange} />;
}

export default CapacityFilter;
