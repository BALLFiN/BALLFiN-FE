import BALLFiNLogo from "../../assets/BALLFiN.svg";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Toast from "@/components/common/Toast";
import { useLoginForm } from "../../features/auth/useLoginForm";

export default function LoginForm() {
  const {
    formData,
    showPassword,
    toast,
    handleSubmit,
    handleGoogleLogin,
    handleChange,
    togglePasswordVisibility,
    closeToast,
    navigateToSignUp,
    navigateToForgotPassword,
  } = useLoginForm();

  return (
    <div className="w-full lg:w-1/2 p-8">
      <div className="text-center mb-8">
        <img src={BALLFiNLogo} alt="BALLFiN" className="mx-auto mb-4 h-8" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          BALLFiN에 오신 것을 환영합니다
        </h1>
        <p className="text-gray-600">AI 기반 주식 분석 서비스를 시작해보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이메일 입력 */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이메일
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A5C2B] focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full bg-[#0A5C2B] text-white py-2 px-4 rounded-lg hover:bg-[#0A5C2B]/90 transition-colors"
        >
          로그인
        </button>

        {/* 구분선 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Mail size={20} />
          Google로 계속하기
        </button>

        {/* 추가 링크 */}
        <div className="flex justify-between text-sm">
          <button
            type="button"
            className="text-[#0A5C2B] hover:underline"
            onClick={navigateToSignUp}
          >
            회원가입
          </button>
          <button
            type="button"
            className="text-gray-600 hover:underline"
            onClick={navigateToForgotPassword}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          계속 진행하면 BALLFiN의{" "}
          <a href="#" className="text-[#0A5C2B] hover:underline">
            이용약관
          </a>{" "}
          및{" "}
          <a href="#" className="text-[#0A5C2B] hover:underline">
            개인정보 처리방침
          </a>{" "}
          에 동의하게 됩니다.
        </p>
      </div>

      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
}
