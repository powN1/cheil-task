import { useEffect, useRef, useState } from "react";

interface DropdownProps<T> {
  label: string;
  options: string[];
  selected: T;
  multiple?: boolean;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}

function Dropdown<T extends string | string[] | null>({
  label,
  options,
  selected,
  multiple = false,
  onChange,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleOption = (opt: string) => {
    if (!multiple) {
      onChange(() => {
        if (opt === "Wszystkie") return null as T;
        return opt as T;
      });
      setOpen(false);
    } else {
      onChange((prev) => {
        if (opt === "Wszystkie") return [] as unknown as T;
        const arr = Array.isArray(prev) ? [...prev] : [];
        if (arr.includes(opt)) {
          return arr.filter((o) => o !== opt) as T;
        }
        return [...arr, opt] as T;
      });
      if (opt === "Wszystkie") setOpen(false);
    }
  };

  const renderLabel = () => {
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : [];
      return arr.length > 0 ? arr.join(", ") : "Pokaż wszystkie";
    }
    return selected || "Pokaż wszystkie";
  };

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
    <div className="w-full relative text-sm" ref={menuRef}>
      <div>
        <p className="font-bold text-lg">{label}:</p>
        <div
          className="flex items-center justify-between h-[36px] leading-[36px] bg-white px-3 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <p className="text-ellipsis line-clamp-1">{renderLabel()}</p>

          <div className="border-l-[6px] border-l-transparent border-t-[10px] border-t-arrow border-r-[6px] border-r-transparent mr-2" />
        </div>
      </div>
      {open && (
        <div className="z-10 w-full absolute top-[100%] left-0 mt-2 bg-white [box-shadow:_2px_2px_10px_0px_rgb(0_0_0_/_10%)]">
          {options.map((opt, i) => {
            const isSelected = multiple ? Array.isArray(selected) && selected.includes(opt) : selected === opt;
            return (
              <div
                key={i}
                className={`h-[36px] leading-[36px] px-3 cursor-pointer flex justify-between hover:bg-[var(--dropdown-bg)] ${
                  isSelected ? "bg-[var(--dropdown-bg)]" : ""
                }`}
                onClick={() => toggleOption(opt)}
              >
                <span>{opt}</span>
                {multiple && isSelected && <span>✓</span>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
