import { useEffect, useRef, useState } from "react";

interface DropdownProps<T extends string | number> {
  label: string;
  options: T[];
  selected: T | null;
  onChange: React.Dispatch<React.SetStateAction<T | null>>;
}

function Dropdown<T extends string | number>({ label, options, selected, onChange }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="z-1 w-full relative text-sm" ref={menuRef}>
      <div>
        <p className="font-bold text-lg">{label}:</p>
        <div
          className="flex items-center justify-between h-[36px] leading-[36px] bg-white px-3 cursor-pointer capitalize"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selected || "pokaż wszystkie"}

          <div className="border-l-[6px] border-l-transparent border-t-[10px] border-t-arrow border-r-[6px] border-r-transparent mr-2" />
        </div>
      </div>
      {open && (
        <div className="w-full absolute top-[100%] left-0 mt-2 bg-white [box-shadow:_2px_2px_10px_0px_rgb(0_0_0_/_10%)]">
          {options.map((opt, i) => (
            <div
              key={i}
              className="h-[36px] leading-[36px] px-3 cursor-pointer capitalize hover:bg-[var(--dropdown-bg)]"
              onClick={() => {
                setOpen(false);
                onChange(() => {
                  if (opt === "wszystkie") return null;
                  return opt;
                });
              }}
            >
              {opt}
              {label.toLowerCase() === "pojemność" && (typeof opt === "number" ? "kg" : "")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
