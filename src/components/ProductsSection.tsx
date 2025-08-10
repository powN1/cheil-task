import { useSearchParams } from "react-router-dom";
import Product from "./Product";
import products from "../data/items.json";
import { useEffect, useState } from "react";
import type { ProductInterface } from "../types/types.ts";
import SearchInput from "./SearchInput.tsx";
import SortFilter from "./SortFilter.tsx";
import FunctionFilter from "./FunctionFilter.tsx";
import EfficiencyFilter from "./EfficiencyFilter.tsx";
import CapacityFilter from "./CapacityFilter.tsx";

export default function ProductsSection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [productsToShow, setProductsToShow] = useState<ProductInterface[]>([]);
  const [productCount, setProductCount] = useState(3);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);

  // Filters
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [sortOption, setSortOption] = useState<string | null>(searchParams.get("sort") || "Wszystkie");
  // const [selectedFunction, setSelectedFunction] = useState<string | null>(searchParams.get("function") || null);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>(searchParams.get("functions")?.split(",") || []);
  const [selectedEfficiency, setSelectedEfficiency] = useState<string | null>(searchParams.get("efficiency") || null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(searchParams.get("capacity") || null);
  const [selectedProducts, setSelectedProducts] = useState<ProductInterface[]>([]);

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Whenever filters change, update URL queries
  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchTerm) params.search = searchTerm;
    if (sortOption && sortOption !== "Wszystkie") params.sort = sortOption;
    // if (selectedFunction) params.function = selectedFunction;
    if (selectedFunctions?.length > 0) params.functions = selectedFunctions.join(",");
    if (selectedEfficiency) params.efficiency = selectedEfficiency;
    if (selectedCapacity) params.capacity = String(selectedCapacity);

    setSearchParams(params);
  }, [debouncedSearch, sortOption, selectedFunctions, selectedEfficiency, selectedCapacity, setSearchParams]);

  useEffect(() => {
    // Filter products whenever user changes any filter
    const filteredProducts = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          String(p.capacity.replace(".", ",")).toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.color.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // .filter((p) => !selectedFunction || p.functions.includes(selectedFunction))
      .filter((p) => selectedFunctions.length === 0 || selectedFunctions.every((f) => p.functions.includes(f)))
      .filter((p) => !selectedEfficiency || p.energeticEfficiency.toLowerCase() === selectedEfficiency.toLowerCase())
      .filter((p) => !selectedCapacity || p.capacity === selectedCapacity)
      .sort((a, b) => {
        if (sortOption?.toLowerCase() === "cena (rosnąco)") return Number(a.price) - Number(b.price);
        if (sortOption?.toLowerCase() === "cena (malejąco)") return Number(b.price) - Number(a.price);
        if (sortOption?.toLowerCase() === "pojemność (rosnąco)") return parseFloat(a.capacity) - parseFloat(b.capacity);
        if (sortOption?.toLowerCase() === "pojemność (malejąco)")
          return parseFloat(b.capacity) - parseFloat(a.capacity);
        return 0;
      });

    setTotalFilteredCount(filteredProducts.length);
    setProductsToShow(filteredProducts.slice(0, productCount));
  }, [debouncedSearch, sortOption, selectedFunctions, selectedEfficiency, selectedCapacity, productCount]);

  const handleProductSelection = (id: number) => {
    // Add product the the array if it's not there, otherwise remove it
    setSelectedProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        const selectedProduct = products.find((product) => product.id === id);
        return selectedProduct ? [...prevProducts, selectedProduct] : prevProducts;
      } else {
        return prevProducts.filter((product) => product.id !== id);
      }
    });
  };

  const handleShowMore = () => {
    if (productCount >= products.length) return;
    setProductCount((prev) => {
      // If productCount is bigger then the amount of products then increase it by +3
      if (products.length - prev >= 3) return prev + 3;
      // Otherwise add the difference of products and product count
      else return prev + (products.length - prev);
    });

    // Animation
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 10);
  };

  const handleSelectedCountText = () => {
    const lastNumber = Number(String(selectedProducts.length).at(-1));
    if (lastNumber !== 0 && lastNumber < 4) return "wybrane";
    else return "wybranych";
  };

  return (
    <section className="w-full flex flex-col items-center bg-section-bg">
      {/* Heading */}
      <h2 className="h-[66px] flex items-center justify-center text-4xl xl:text-[40px] font-bold text-center py-3 bg-white w-full">
        Wybierz urządzenie
      </h2>

      <div className="w-full xl:w-[1046px] xl:w-max-[1046px] flex flex-col items-center max-xl:px-5 py-6">
        {/* Filters */}
        <div className="w-full flex flex-col gap-y-8">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="w-full flex flex-col">
            <div className="flex flex-col lg:flex-row items-center gap-3">
              <SortFilter value={sortOption} onChange={setSortOption} />
              <FunctionFilter value={selectedFunctions} onChange={setSelectedFunctions} />
              <EfficiencyFilter value={selectedEfficiency} onChange={setSelectedEfficiency} />
              <CapacityFilter value={selectedCapacity} onChange={setSelectedCapacity} />
            </div>
            <p className="text-sm my-3">
              Liczba produktów: {totalFilteredCount}{" "}
              {selectedProducts.length > 0 && (
                <span>
                  ({selectedProducts.length} {handleSelectedCountText()})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] transition-all">
          {productsToShow.map((product, key) => (
            <Product
              key={key}
              product={product}
              isSelected={selectedProducts.some((p) => p.id === product.id)}
              handleProductSelection={handleProductSelection}
            />
          ))}
        </div>

        {/* Show more button */}
        {console.log(products.length > productCount || totalFilteredCount > productCount)}

        {products.length > productCount && totalFilteredCount > productCount ? (
          <button
            className="disabled:opacity-50 disabled:before:hidden my-5 flex items-center gap-x-2 text-load-more font-bold cursor-pointer relative overflow-hidden before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-load-more before:-translate-x-full hover:before:translate-x-0 before:transition-all before:duration-100"
            onClick={handleShowMore}
          >
            <p>Pokaż więcej</p>
            <div className="border-l-[3px] border-l-transparent border-t-[6px] border-t-load-more border-r-[3px] border-r-transparent mr-2" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
