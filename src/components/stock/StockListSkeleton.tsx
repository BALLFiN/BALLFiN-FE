export default function StockListSkeleton() {
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

      {/* 스켈레톤 로딩 */}
      <div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="hidden lg:grid grid-cols-9 gap-4 px-6 py-4 animate-pulse"
          >
            {/* 관심종목 */}
            <div className="col-span-1 flex items-center">
              <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
            </div>

            {/* 종목명 */}
            <div className="col-span-2">
              <div className="h-4 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>

            {/* 현재가 */}
            <div className="col-span-1 text-right">
              <div className="h-5 bg-gray-200 rounded"></div>
            </div>

            {/* 전일대비 */}
            <div className="col-span-1 text-right">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 등락률 */}
            <div className="col-span-1 text-right">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 거래량 */}
            <div className="col-span-1 text-right">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 거래대금 */}
            <div className="col-span-1 text-right">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 시가총액 */}
            <div className="col-span-1 text-right">
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}

        {/* 모바일 스켈레톤 */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`mobile-${index}`}
            className="lg:hidden p-4 border-b border-gray-100 animate-pulse"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
