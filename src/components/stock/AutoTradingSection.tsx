import { useNavigate } from "react-router-dom";

export default function AutoTradingSection() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">자동거래 시작하기</h3>
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-3">※ 유의사항</p>
          <ul className="space-y-2.5">
            <li className="flex items-start">
              <span className="text-[#0A5C2B] mr-2">•</span>
              <span>
                자동거래는 실시간 시장 상황에 따라 자동으로 매매가 이루어집니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A5C2B] mr-2">•</span>
              <span>투자 손실에 대한 책임은 투자자 본인에게 있습니다.</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A5C2B] mr-2">•</span>
              <span>
                자동거래 시작 전 반드시 투자 전략과 리스크를 충분히 이해하시기
                바랍니다.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#0A5C2B] mr-2">•</span>
              <span>
                시스템 오류나 네트워크 문제로 인한 거래 지연이 발생할 수
                있습니다.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => navigate("/transaction")}
        className="w-full py-4 text-lg font-medium bg-[#0A5C2B] text-white rounded-lg hover:bg-[#084825] transition-colors"
      >
        자동 주식 투자 시작하기
      </button>
    </div>
  );
}
