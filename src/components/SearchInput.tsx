interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchInput({ searchTerm, setSearchTerm }: SearchInputProps) {
  return (
    <div className="h-[36px] w-[249px] self-center px-3 bg-white flex items-center justify-center">
      <input
        type="text"
        className="h-full w-full focus:outline-none text-sm placeholder-black"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
