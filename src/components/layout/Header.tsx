import React from "react";
import BALLFiNLogo from "../../assets/BALLFiN.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const navItems = [
    { to: "/intro", label: "서비스 소개" },
    { to: "/news", label: "뉴스 분석" },
    { to: "/stock", label: "주식 분석" },
    { to: "/mypage", label: "마이페이지" },
  ];

  const authItems = [
    { to: "/login", label: "로그인", isPrimary: false },
    { to: "/signup", label: "회원가입", isPrimary: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={BALLFiNLogo}
                alt="BALLFiN Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 hover:text-[#0A5C2B] px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 로그인/회원가입 버튼 */}
          <div className="flex items-center space-x-4">
            {authItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`${
                  item.isPrimary
                    ? "bg-[#0A5C2B] text-white hover:bg-[#0A5C2B]/90"
                    : "text-gray-700 hover:text-[#0A5C2B]"
                } px-4 py-2 rounded-md text-sm font-medium`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
