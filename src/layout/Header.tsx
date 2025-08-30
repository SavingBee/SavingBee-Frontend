import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { menuItems } from "@/constants/menuData";
import useAuthHeader from "@/hooks/auth/useAuthHeader";

import { BiMenu } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { logout } from "@/api/auth/logout";

const Header = () => {
  const [open, setOpen] = useState(false);

  const isLoggedIn = useAuthHeader();

  // 모바일 메뉴 열릴 때 body 스크롤 X
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full z-10 max-xl1240:border-b max-xl1240:border-graye5 bg-white">
      <div
        className="w-full max-w-[1200px] mx-auto flex items-center justify-between pt-[20px] pb-[20px] border-b border-graye5
                            max-xl1240:px-[20px] max-xl1240:border-0
                            max-xl767:pt-[15px] max-xl767:pb-[15px]"
      >
        <Link to="/" className="gmarket font-bold">
          SAVING BEE
        </Link>
        {/* PC 메뉴 */}
        <ul className="hidden md:flex items-center gap-3 font-semibold">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        {/* 우측 유틸 */}
        <div className="hidden md:flex items-center gap-[8px]">
          {isLoggedIn ? (
            <button
              className="flex items-center gap-1 text-sm font-medium"
              onClick={logout}
            >
              <MdLogout size={17} color="#444" />
              로그아웃
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-sm font-medium"
            >
              <GoPeople size={17} color="#444" />
              로그인/회원가입
            </Link>
          )}
        </div>

        {/* (모바일)햄버거 버튼 */}
        <button
          type="button"
          className={`md:hidden block`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <BiMenu size={30} />
        </button>
        {/* 모바일 메뉴 */}
        <MobileMenu open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
};
export default Header;
