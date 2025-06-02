import { Settings } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function MyPageSidebar() {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-sm  w-72 flex flex-col px-4 justify-between">
      <div className="flex-col ">
        {/* 프로필  */}
        <div className="flex items-center gap-3 pt-4 pl-4  pb-2" onClick={() => navigate('/mypage')}>
          <div>
            <p className="font-medium text-gray-900">홍길동</p>
            <p className="text-sm text-gray-500">hong@example.com</p>
          </div>
        </div>
        <hr className="text-gray-300 border my-2" />
        {/* 즐겨찾기 섹션 */}
        <div className="space-y-2">
          {/* 섹션 헤더 (non-clickable) */}
          <div className="px-2 text-sm font-medium text-gray-500 uppercase">즐겨찾기</div>

          {/* 클릭 가능한 서브 항목들 */}
          <ul className="space-y-1">
            <li>
              <NavLink
                to="chart"
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
                차트
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
                뉴스
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="text-gray-200 border my-3" />
        <div className="space-y-2">
          {/* 섹션 헤더 (non-clickable) */}
          <div className=" text-sm font-medium text-gray-500 uppercase flex px-2 py-2 rounded transition-colors gap-3 ">
            <Settings className="items-center" />
            <p>설정</p>
          </div>

          {/* 클릭 가능한 서브 항목들 */}
          <ul className="space-y-1">
            <li>
              <NavLink
                to="settings"
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
                내 정보
              </NavLink>
            </li>
            <li>
              <NavLink
                to="aramSettings"
                className={({ isActive }) =>
                  `block px-8 py-2 rounded-l-lg transition-colors
                ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-semibold border-l-4 border-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
                }
              >
                알람 설정
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="pb-4 w-full flex justify-end "></div>
    </div>
  );
}
