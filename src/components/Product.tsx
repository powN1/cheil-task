import { forwardRef } from "react";
import type { ProductInterface } from "../types/types";

type ProductProps = {
  product: ProductInterface;
  isSelected: boolean;
  handleProductSelection: (id: number) => void;
};

const efficiencyColors: Record<string, { bg: string; border: string }> = {
  A: { bg: "bg-efficiency-a", border: "border-l-efficiency-a" },
  B: { bg: "bg-efficiency-b", border: "border-l-efficiency-b" },
  C: { bg: "bg-efficiency-c", border: "border-l-efficiency-c" },
  D: { bg: "bg-efficiency-d", border: "border-l-efficiency-d" },
  E: { bg: "bg-efficiency-e", border: "border-l-efficiency-e" },
  F: { bg: "bg-efficiency-f", border: "border-l-efficiency-f" },
  G: { bg: "bg-efficiency-g", border: "border-l-efficiency-g" },
};

const Product = forwardRef<HTMLDivElement, ProductProps>(({ product, isSelected, handleProductSelection }, ref) => {
  const {
    id,
    name,
    img,
    type,
    color,
    capacity,
    dimensions: { width, height, depth },
    functions,
    energeticEfficiency,
    price,
    priceDate: { priceStart, priceEnd } = {},
    installment,
  } = product;

  return (
    <div ref={ref} className="flex flex-col gap-y-6 p-6 bg-white rounded-xl">
      <div className="w-2/3 self-center">
        <img src={`${img}`} alt={`${name} img`} className="w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold">
        {name}, Pralka {type}, {capacity.replace(".", ",")}, {color}
      </h3>
      <div className="flex flex-col space-y-1 text-description text-xs">
        <p>
          Pojemność (kg): <span className="text-black font-bold">{capacity.replace(".", ",")}</span>
        </p>
        <p>
          Wymiary (GxSxW):{" "}
          <span className="text-black font-bold">
            {depth} x {width} x {height} cm
          </span>
        </p>
        <p>
          Funkcje: <span className="text-black font-bold">{functions.join(", ")}</span>
        </p>
        <div className="my-4 flex items-center gap-x-2">
          Klasa energetyczna:{" "}
          <div className="h-[18px] flex items-center text-white">
            <p className={`${efficiencyColors[energeticEfficiency]?.bg} px-2 leading-[18px] w-[40px] h-full`}>
              {energeticEfficiency}
            </p>
            <div
              className={`
                border-t-[9px] border-t-transparent
                border-l-[9px] ${efficiencyColors[energeticEfficiency]?.border}
                border-b-[9px] border-b-transparent`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p>
            Cena zobowiązuje:{" "}
            <span>
              {priceStart} - {priceEnd}
            </span>
          </p>
          <div className="flex items-end leading-none font-bold text-black gap-x-1">
            <span className="text-[40px] leading-none">{price}</span>
            <div className="flex flex-col gap-y-1 h-full items-end leading-none text-sm">
              <span className="">00</span>
              <span className="">zł</span>
            </div>
          </div>
        </div>
        {installment && (
          <p className="font-semibold text-base mt-2">
            {(price / installment).toFixed(2).toString().replace(".", ",")} zł x 60 rat
          </p>
        )}
      </div>
      <button
        className={
          "h-[36px] w-[150px] mt-auto uppercase text-white text-sm font-bold rounded-full self-center cursor-pointer " +
          (isSelected ? "bg-button-selected hover:bg-button-selected/90" : "bg-button-select hover:bg-button-select/90")
        }
        onClick={() => handleProductSelection(id)}
      >
        {isSelected ? "wybrane" : "wybierz"}
      </button>
    </div>
  );
});

Product.displayName = "Product";

export default Product;
