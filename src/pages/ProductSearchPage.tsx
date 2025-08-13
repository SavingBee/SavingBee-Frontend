import Button from "@/components/common/button/Button";
// import InputField1 from "@/components/common/input/InputField1";
import FilterBar from "@/components/search/FilterBar";
import SelectedFilter from "@/components/search/SelectedFilter";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function ProductSearchPage() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <form className="flex border-2 border-primary rounded-md mb-4">
        {/* <InputField1
          type="text"
          placeholder="검색어를 입력해주세요."
          className="outline-none rounded-md"
          value={search}
          onChange={handleSearch}
        /> */}
        <input
          className="w-full p-4 outline-none rounded-md"
          placeholder="검색어를 입력해주세요."
          value={search}
          onChange={handleSearch}
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
      <FilterBar />
      <SelectedFilter />
    </div>
  );
}
