import { useState, useEffect } from "react";
import BALLFiNLogo from "../../assets/BALLFiN.svg";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "../../api/auth/logoutApi";
import { verifyAuth } from "../../api/auth/loginApi";
import Toast from "@/components/common/Toast";

interface NavItem {
  to: string;
  label: string;
}

interface AuthLinkItem {
  to: string;
  label: string;
  isPrimary: boolean;
}

interface AuthButtonItem {
  label: string;
  onClick: () => void;
  isPrimary: boolean;
  icon: React.ReactElement;
}

type AuthItem = AuthLinkItem | AuthButtonItem;

const Header = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  useEffect(() => {
    // 로그인 상태 및 사용자 정보 확인
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("access_token");

      if (token) {
        setIsLoggedIn(true);

        // 먼저 localStorage에서 사용자 정보 확인
        const storedUserInfo = localStorage.getItem("user_info");
        if (storedUserInfo) {
          try {
            const user = JSON.parse(storedUserInfo);
            if (user.name) {
              setUserName(user.name);
              return; // 사용자 정보가 있으면 API 호출하지 않음
            }
          } catch (error) {
            console.error("저장된 사용자 정보 파싱 실패:", error);
          }
        }

        // localStorage에 사용자 정보가 없으면 API로 확인
        try {
          const response = await verifyAuth();
          if (response.user?.name) {
            setUserName(response.user.name);
            // API에서 받은 사용자 정보를 localStorage에 저장
            localStorage.setItem("user_info", JSON.stringify(response.user));
          }
        } catch (error) {
          console.error("사용자 정보 확인 실패:", error);
          // 토큰이 유효하지 않으면 로그아웃 처리
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_info");
          setIsLoggedIn(false);
          setUserName("");
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    // 초기 로그인 상태 확인
    checkLoginStatus();

    // 로그인 상태 변경 이벤트 리스너 추가
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      setUserName("");
      localStorage.removeItem("user_info"); // 사용자 정보도 제거
      setToast({
        show: true,
        message: "로그아웃되었습니다.",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message:
          error instanceof Error ? error.message : "로그아웃에 실패했습니다.",
        type: "error",
      });
    }
  };

  const navItems: NavItem[] = [
    { to: "/intro", label: "서비스 소개" },
    { to: "/news", label: "뉴스 분석" },
    { to: "/stock", label: "주식 분석" },
    { to: "/mypage", label: "마이페이지" },
  ];

  const authItems: AuthItem[] = isLoggedIn
    ? [
        {
          label: "로그아웃",
          onClick: handleLogout,
          isPrimary: false,
          icon: <LogOut className="h-5 w-5" />,
        },
      ]
    : [
        { to: "/login", label: "로그인", isPrimary: false },
        { to: "/signup", label: "회원가입", isPrimary: true },
      ];

  const isAuthLink = (item: AuthItem): item is AuthLinkItem => {
    return "to" in item;
  };

  // 현재 경로가 navItem의 경로와 일치하는지 확인하는 함수
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 bg-white shadow-md z-[9999] transition-transform duration-300 ${
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
                  className="h-11 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActiveRoute(item.to)
                      ? "text-[#0A5C2B] font-bold"
                      : "text-gray-700 hover:text-[#0A5C2B] font-medium"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* 데스크톱 로그인/회원가입 또는 사용자명 + 로그아웃 버튼 */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && userName && (
                <span className="text-gray-700 font-medium">{userName}님</span>
              )}
              {authItems.map((item, index) =>
                isAuthLink(item) ? (
                  <Link
                    key={index}
                    to={item.to}
                    className={`${
                      item.isPrimary
                        ? "bg-[#0A5C2B] text-white hover:bg-[#0A5C2B]/90"
                        : "text-gray-700 hover:text-[#0A5C2B]"
                    } px-4 py-2 rounded-md text-sm font-medium`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#0A5C2B] px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )
              )}
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
            className={`md:hidden transition-all duration-300 ease-in-out absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden z-9999`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isLoggedIn && userName && (
                <div className="px-3 py-2 text-gray-700 font-medium border-b border-gray-200">
                  {userName}님
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block px-3 py-2 rounded-md text-m transition-colors ${
                    isActiveRoute(item.to)
                      ? "text-[#0A5C2B] font-bold"
                      : "text-gray-700 hover:text-[#0A5C2B] font-medium"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2"></div>
              {authItems.map((item, index) =>
                isAuthLink(item) ? (
                  <Link
                    key={index}
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
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full text-gray-700 hover:text-[#0A5C2B] px-4 py-2 rounded-md text-base font-medium"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </>
  );
};

export default Header;
