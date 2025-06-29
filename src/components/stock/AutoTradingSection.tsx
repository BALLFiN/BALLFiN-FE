import { useNavigate } from "react-router-dom";

export default function AutoTradingSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-80">
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-3">자동거래 시작하기</h3>
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
