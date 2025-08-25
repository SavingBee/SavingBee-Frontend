import SearchBox from "@/components/search/SearchBox";
import MainHeader from "@/components/main/MainHeader";
import Carousel from "@/components/main/Carousel";

const SearchEntryPage = () => {
  return (
    <>
      <div className="flex flex-col items-center mb-6 md:flex-row gap-6">
        <div className="md:basis-2/5 md:shrink-0">
          <MainHeader
            title="내가 원하는 조건에 맞는 상품을 찾아보세요!"
            subTitle="찾는 상품이 있으신가요?"
          />{" "}
        </div>
        <div className="w-full md:basis-3/5 md:min-w-0">
          <SearchBox />
        </div>
      </div>
      <Carousel />
    </>
  );
};

export default SearchEntryPage;
