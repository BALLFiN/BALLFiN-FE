import {
  User,
  Star,
  Settings,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 프로필 섹션 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={32} className="text-gray-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">홍길동</h1>
              <p className="text-gray-600">hong@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* 즐겨찾기 섹션 */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Star className="text-yellow-400" size={20} />
              즐겨찾기 종목
            </h2>
            <button className="text-sm text-[#0A5C2B] hover:underline">
              전체보기
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#0A5C2B] transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">삼성전자</span>
                  <span className="text-sm text-red-500">+2.5%</span>
                </div>
                <p className="text-sm text-gray-600">005930</p>
              </div>
            ))}
          </div>
        </section>

        {/* 메뉴 섹션 */}
        <section className="bg-white rounded-xl shadow-sm">
          <div className="divide-y divide-gray-100">
            {/* 내 정보 */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <User size={20} className="text-gray-600" />
                <span className="text-gray-900">내 정보</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* 내 정보 수정 */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-gray-600" />
                <span className="text-gray-900">내 정보 수정</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* 알림 설정 */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600" />
                <span className="text-gray-900">알림 설정</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* 고객센터 */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-600" />
                <span className="text-gray-900">고객센터</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            {/* 로그아웃 */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-red-600">
              <div className="flex items-center gap-3">
                <LogOut size={20} />
                <span>로그아웃</span>
              </div>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
