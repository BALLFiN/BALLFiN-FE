import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg flex">
        {/* 왼쪽 회원가입 폼 영역 */}
        <SignUpForm />

        {/* 오른쪽 디자인 영역 */}
        <div
          className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-8 rounded-r-2xl"
          style={{
            backgroundImage: "url(/src/assets/ballfin-container.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "600px auto",
          }}
        >
          <div className="text-center"></div>
        </div>
      </div>
    </div>
  );
}
