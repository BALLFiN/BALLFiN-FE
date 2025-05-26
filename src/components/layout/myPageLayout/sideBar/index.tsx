import { User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function MyPageSidebar() {
  return (
    <div className="bg-white shadow-sm  w-72 flex-col px-4">
      {/* 프로필 예시 1 */}
      <div className="w-full h-fit flex pl-5 items-center py-3  mt-2">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">홍길동</h1>
        </div>
      </div>
      <hr className="text-gray-300 border my-3" />
      {/* 프로필  예시 2*/}
      <div className="flex items-center gap-3 mb-8 pl-4 py-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={32} className="text-gray-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">홍길동</p>
          <p className="text-sm text-gray-500">hong@example.com</p>
        </div>
      </div>
      <hr className="text-gray-300 border my-3" />
      {/* 즐겨찾기 섹션 */}
      <div className="space-y-2">
        {/* 섹션 헤더 (non-clickable) */}
        <div className="px-2 text-sm font-medium text-gray-500 uppercase">즐겨찾기</div>

        {/* 클릭 가능한 서브 항목들 */}
        <ul className="space-y-1">
          <li>
            <NavLink
              to="charts"
              end
              className={({ isActive }) =>
                `block px-8 py-2 rounded-l-lg transition-colors
                ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              차트 리스트
            </NavLink>
          </li>
          <li>
            <NavLink
              to="news"
              className={({ isActive }) =>
                `block px-8 py-2 rounded-l-lg transition-colors
                ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              뉴스 리스트
            </NavLink>
          </li>
        </ul>
      </div>
      <hr className="text-gray-200 border my-3" />
      <div className="space-y-1 pt-4">
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `block px-4 py-2 rounded transition-colors
            ${isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`
          }
        >
          설정
        </NavLink>
      </div>
    </div>
  );
}
