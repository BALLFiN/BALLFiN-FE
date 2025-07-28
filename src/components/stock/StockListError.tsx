import { RefreshCw } from "lucide-react";

interface StockListErrorProps {
  onRetry: () => void;
}

export default function StockListError({ onRetry }: StockListErrorProps) {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      {/* 테이블 헤더 */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="hidden lg:grid grid-cols-9 gap-4 px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-1">관심</div>
          <div className="col-span-2">종목명</div>
          <div className="col-span-1 text-right">현재가</div>
          <div className="col-span-1 text-right">전일대비</div>
          <div className="col-span-1 text-right">등락률</div>
          <div className="col-span-1 text-right">거래량</div>
          <div className="col-span-1 text-right">거래대금</div>
          <div className="col-span-1 text-right">시가총액</div>
        </div>
        {/* 모바일 헤더 */}
        <div className="lg:hidden px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          주식 목록
        </div>
      </div>

      {/* 에러 상태 */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            데이터를 불러오는데 실패했습니다
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            주식 데이터를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.
          </p>
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            다시 시도
          </button>
        </div>
      </div>
    </div>
  );
}
