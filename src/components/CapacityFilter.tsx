import type { FilterProps } from "../types/types";
import Dropdown from "./Dropdown";

function CapacityFilter({ value, onChange }: FilterProps<string | number>) {
  const options = ["wszystkie", 9, 6, 10.5];

  return <Dropdown label="Pojemność" options={options} selected={value} onChange={onChange} />;
}

export default CapacityFilter;
