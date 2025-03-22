import BALLFiNLogo from "../assets/BALLFiN.svg";

export default function Intro() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <div className="mb-12 w-[50vw] h-auto relative">
        <img
          src={BALLFiNLogo}
          alt="BALLFiN Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <h1 className="text-4xl font-bold text-[#0A5C2B] mb-8 text-center">
        BALLFiN에 오신 것을 환영합니다
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full mt-12">
        <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-[#0A5C2B] mb-4">
            AI 기반 뉴스 분석
          </h2>
          <p className="text-gray-600 leading-relaxed">
            실시간 뉴스를 AI가 분석하여 호재/악재를 판단하고, 이해하기 쉬운
            설명을 제공합니다. 복잡한 금융 뉴스를 누구나 이해할 수 있게
            만들어드립니다.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-[#0A5C2B] mb-4">
            스마트 주식 분석
          </h2>
          <p className="text-gray-600 leading-relaxed">
            데이터 기반의 주식 매매 스코어링 시스템으로 투자 결정을
            도와드립니다. 객관적인 분석과 추천으로 더 나은 투자 전략을
            제시합니다.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-[#0A5C2B] mb-4">
            24/7 챗봇 상담
          </h2>
          <p className="text-gray-600 leading-relaxed">
            우측 하단의 챗봇 버튼을 통해 언제든지 금융 관련 질문을 하실 수
            있습니다. 실시간으로 답변을 제공해드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}
