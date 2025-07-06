import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

export default function AutoTradingSection() {
  const navigate = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isClosed) return null;

  return (
    <div
      className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 relative ${isCollapsed ? "w-56" : "w-80"}`}
    >
      {/* 우측 상단 버튼 */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="text-gray-400 hover:text-gray-700 p-1"
          aria-label={isCollapsed ? "펼치기" : "축소"}
        >
          {isCollapsed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <button
          onClick={() => setIsClosed(true)}
          className="text-gray-400 hover:text-gray-700 p-1"
          aria-label="닫기"
        >
          <X size={18} />
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-3">자동거래 시작하기</h3>
        {!isCollapsed && (
          <div className="text-xs text-gray-600">
            <p className="font-medium mb-2">※ 유의사항</p>
            <ul className="space-y-1.5">
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-1.5 text-xs">•</span>
                <span>실시간 시장 상황에 따라 자동 매매가 이루어집니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-1.5 text-xs">•</span>
                <span>투자 손실에 대한 책임은 투자자 본인에게 있습니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-1.5 text-xs">•</span>
                <span>투자 전략과 리스크를 충분히 이해하시기 바랍니다.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#0A5C2B] mr-1.5 text-xs">•</span>
                <span>
                  시스템 오류나 네트워크 문제로 거래 지연이 발생할 수 있습니다.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/transaction")}
        className="w-full py-2.5 text-sm font-medium bg-[#0A5C2B] text-white rounded-lg hover:bg-[#084825] transition-colors"
      >
        자동 주식 투자 시작하기
      </button>
    </div>
  );
}
