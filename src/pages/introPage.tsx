import BALLFiNLogo from "../assets/BALLFiN.svg";
import FinBung1 from "../assets/FinBung_1.svg";
import FinBung2 from "../assets/FinBung_2.svg";
import FinBung3 from "../assets/FinBung_3.svg";
import FinBung4 from "../assets/FinBung_4.svg";
import {
  TrendingUp,
  Brain,
  Shield,
  Zap,
  ChartBar,
  MessageSquare,
  Target,
} from "lucide-react";
import { StatCard } from "../components/Intro/StatCard";
import { AIModelCard } from "../components/Intro/AIModelCard";
import { FeatureCard } from "../components/Intro/FeatureCard";
import { FinBungImage } from "../components/Intro/FinBungImage";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-[#0A5C2B]" />,
    title: "AI 기반 뉴스 분석",
    description:
      "실시간 뉴스를 AI가 분석하여 호재/악재를 판단하고, 이해하기 쉬운 설명을 제공합니다. 복잡한 금융 뉴스를 누구나 이해할 수 있게 만들어드립니다.",
    stats: "5,000+ 뉴스 소스 실시간 분석",
  },
  {
    icon: <ChartBar className="w-8 h-8 text-[#0A5C2B]" />,
    title: "스마트 주식 분석",
    description:
      "데이터 기반의 주식 매매 스코어링 시스템으로 투자 결정을 도와드립니다. 객관적인 분석과 추천으로 더 나은 투자 전략을 제시합니다.",
    stats: "97.8% 정확도 달성",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-[#0A5C2B]" />,
    title: "챗봇 시스템",
    description:
      "우측 하단의 챗봇 버튼을 통해 언제든지 금융 관련 질문을 하실 수 있습니다. 실시간으로 답변을 제공해드립니다.",
    stats: "24/7 실시간 답변",
  },
  {
    icon: <Target className="w-8 h-8 text-[#0A5C2B]" />,
    title: "맞춤형 투자 전략",
    description:
      "개인의 투자 성향과 목표에 맞는 맞춤형 투자 전략을 제시합니다. AI가 분석한 데이터를 바탕으로 최적의 포트폴리오를 구성해드립니다.",
    stats: "1,000+ 투자 전략 제공",
  },
  {
    icon: <Shield className="w-8 h-8 text-[#0A5C2B]" />,
    title: "보안 시스템",
    description:
      "금융보안원 인증 보안시스템으로 안전한 서비스를 제공합니다. 개인정보와 투자 정보를 철저히 보호합니다.",
    stats: "금융보안원 인증",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#0A5C2B]" />,
    title: "실시간 모니터링",
    description:
      "관심 종목과 포트폴리오의 실시간 가격 변동을 모니터링하고, 중요한 변화가 있을 때 즉시 알림을 제공합니다.",
    stats: "실시간 가격 업데이트",
  },
];

const stats = [
  { label: "활성 사용자", value: "50,000+" },
  { label: "분석된 뉴스", value: "1M+" },
  { label: "예측 정확도", value: "97.8%" },
  { label: "보유 종목", value: "2,000+" },
];

const aiModels = [
  {
    icon: TrendingUp,
    title: "주가 예측 모델",
    data: [
      { label: "학습 데이터", value: "2010-2025 시장 데이터" },
      { label: "알고리즘", value: "LSTM + 트랜스포머" },
      { label: "정확도", value: "89.4%" },
      { label: "최근 업데이트", value: "2025.03.20" },
    ],
  },
  {
    icon: MessageSquare,
    title: "뉴스 분석 모델",
    data: [
      { label: "학습 데이터", value: "150만+ 금융 뉴스 아티클" },
      { label: "알고리즘", value: "BERT 언어 모델" },
      { label: "정확도", value: "93.2%" },
      { label: "최근 업데이트", value: "2025.03.22" },
    ],
  },
];

export default function Intro() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-b from-[#0A5C2B]/5 to-white py-24 relative overflow-hidden">
        <FinBungImage
          src={FinBung1}
          alt="FinBung 1"
          position="top-left"
          opacity={20}
        />
        <FinBungImage
          src={FinBung2}
          alt="FinBung 2"
          position="top-right"
          opacity={20}
        />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-12 w-[30vw] h-48 relative">
              <img
                src={BALLFiNLogo}
                alt="BALLFiN Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-[#0A5C2B] mb-4">
              BALLFiN에 오신 것을 환영합니다
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              AI 기반의 지능형 금융 투자 플랫폼으로, 더 나은 투자 결정을 내리실
              수 있도록 도와드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="container mx-auto px-4 py-12 relative">
        <FinBungImage
          src={FinBung3}
          alt="FinBung 3"
          position="top-left"
          width="w-1/4"
          className="left-1/4"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>

      {/* 주요 기능 섹션 */}
      <div className="container mx-auto px-4 py-12 relative">
        <FinBungImage
          src={FinBung4}
          alt="FinBung 4"
          position="bottom-right"
          width="w-1/4"
          className="right-1/4"
        />
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          주요 기능
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* AI 모델 정보 섹션 */}
      <div className="bg-gray-50 py-12 relative">
        <FinBungImage src={FinBung1} alt="FinBung 1" position="top-left" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            AI 모델 정보
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aiModels.map((model, index) => (
              <AIModelCard key={index} model={model} />
            ))}
          </div>
        </div>
      </div>

      {/* 시작하기 섹션 */}
      <div className="container mx-auto px-4 py-12 relative">
        <FinBungImage src={FinBung2} alt="FinBung 2" position="bottom-right" />
        <div className="bg-[#0A5C2B] rounded-xl p-8 text-center text-white relative">
          <h2 className="text-2xl font-bold mb-4">
            지금 바로 BALLFiN과 함께 시작하세요
          </h2>
          <p className="mb-6 text-white/90">
            AI 기반의 지능형 투자 플랫폼으로 더 나은 투자 결정을 내리실 수
            있습니다.
          </p>
          <button className="bg-white text-[#0A5C2B] px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors">
            무료로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
