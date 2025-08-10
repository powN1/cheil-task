interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface PriceDate {
  priceStart: string;
  priceEnd: string;
}

export interface ProductInterface {
  id: number;
  name: string;
  img: string;
  type: string;
  color: string;
  capacity: number;
  dimensions: Dimensions;
  functions: string[];
  energeticEfficiency: string;
  price: number;
  priceDate?: PriceDate;
  installment?: number;
}

export interface FilterProps<T extends string | number> {
  value: T | null;
  onChange: React.Dispatch<React.SetStateAction<T | null>>;
}
