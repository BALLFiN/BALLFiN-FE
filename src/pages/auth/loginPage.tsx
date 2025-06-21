import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg flex">
        {/* 왼쪽 디자인 영역 */}
        <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-8 rounded-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              디자인 영역
            </h2>
            <p className="text-gray-600">
              여기에 디자인 콘텐츠가 들어갈 예정입니다.
            </p>
          </div>
        </div>

        {/* 오른쪽 로그인 영역 */}
        <LoginForm />
      </div>
    </div>
  );
}
