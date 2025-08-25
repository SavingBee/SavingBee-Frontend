import MainHeader from "./MainHeader";
const Carousel = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl">
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/7]">
        {/* 단일 이미지  object-cover */}
        <img
          src="/images/carousel/main_img_01.png"
          alt=""
          className="absolute h-full w-full object-cover"
        />

        {/* 배경 오버레이 */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full p-5 sm:px-10 md:px-16 max-w-xl text-white">
            <MainHeader
              title="예·적금 금리, 한눈에 비교!"
              subTitle="상품 비교"
              contentTxt="복잡한 검색 없이 금리·기간·조건별로 손쉽게 비교하고, 나에게 가장 유리한 상품을 바로 찾아보세요."
              titleClassName="!text-[#34A853]"
            />
            <button type="button" className="border px-4 py-1 cursor-pointer">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
