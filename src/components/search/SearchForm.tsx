// import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Button from "@/components/common/button/Button";

/**
 * 검색어, 상테 업데이트, 값 전달 - API
 */
type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchForm({
  value,
  onChange,
  onSubmit,
  placeholder,
  className = "",
}: Props) {
  //   const [search, setSearch] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form
      role="search"
      aria-label="상품검색"
      onSubmit={handleSubmit}
      className="flex border-2 border-primary rounded-md mb-4"
    >
      <input
        className="w-full p-4 outline-none rounded-md"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button
        type="button"
        variant="sm"
        styleVariant="border"
        className="text-primary border-none my-3"
      >
        <FaSearch size={20} />
      </Button>
    </form>
  );
}
