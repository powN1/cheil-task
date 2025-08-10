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
  capacity: string;
  dimensions: Dimensions;
  functions: string[];
  energeticEfficiency: string;
  price: number;
  priceDate?: PriceDate;
  installment?: number;
}

export interface FilterProps<T = string | null> {
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}
