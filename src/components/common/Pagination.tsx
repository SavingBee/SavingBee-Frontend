import React from "react";
import ReactPaginate from "react-paginate";

/**
 * totalPages - 전역관리
 * currentPage - default 1
 * className - 바깥 여백 등 추가 커스텀 (선택)
 */
type Props = {
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  className?: string;
};

const Pagination: React.FC<Props> = ({
  totalPages,
  currentPage,
  onChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      // 동작
      pageCount={totalPages}
      forcePage={Math.max(0, currentPage - 1)} // react-paginate는 0-base
      onPageChange={({ selected }) => onChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      renderOnZeroPageCount={null}
      // 레이블
      previousLabel="‹"
      nextLabel="›"
      breakLabel="…"
      // (고정) Tailwind 디자인
      containerClassName={[
        "flex items-center justify-center gap-2 select-none",
        className || "",
      ].join(" ")}
      pageClassName="list-none"
      previousClassName="list-none"
      nextClassName="list-none"
      breakClassName="list-none"
      disabledClassName="opacity-40 pointer-events-none"
      // 링크(원형 버튼)
      pageLinkClassName="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
      previousLinkClassName="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
      nextLinkClassName="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-700 hover:bg-slate-100"
      breakLinkClassName="w-9 h-9 rounded-full inline-flex items-center justify-center text-slate-400"
      // 활성 페이지(파란 원)
      activeClassName="selected"
      activeLinkClassName="!bg-[#1976D3] !text-white"
      // 접근성
      ariaLabelBuilder={(p) => `${p}페이지`}
      previousAriaLabel="이전 페이지"
      nextAriaLabel="다음 페이지"
    />
  );
};

export default Pagination;
