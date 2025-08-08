import Product from "./Product";
import items from "../assets/items.ts"

export default function ProductsSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto bg-gray-200">
      <h2 className="text-2xl font-bold text-center py-2">Wybierz urządzenie</h2>
      <div className="grid grid-cols-3 gap-2">
        <Product />
      </div>
    </section>
  );
}
