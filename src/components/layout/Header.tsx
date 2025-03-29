import { useState, useEffect } from "react";
import BALLFiNLogo from "../../assets/BALLFiN.svg";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    <header
      className={`fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
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

          {/* 데스크톱 로그인/회원가입 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
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

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#0A5C2B] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block text-gray-700 hover:text-[#0A5C2B] px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            {authItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block ${
                  item.isPrimary
                    ? "bg-[#0A5C2B] text-white hover:bg-[#0A5C2B]/90"
                    : "text-gray-700 hover:text-[#0A5C2B]"
                } px-4 py-2 rounded-md text-base font-medium text-center`}
                onClick={() => setIsMobileMenuOpen(false)}
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
