import BALLFiNLogo from "../assets/BALLFiN.svg";
import { Brain } from "lucide-react";
import { Network } from "lucide-react";
import { Zap } from "lucide-react";
import { ChartBar } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Target } from "lucide-react";
import { FeatureCard } from "../components/Intro/FeatureCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cheon from "../assets/member/cheon.png";
import park from "../assets/member/park.png";
import kim from "../assets/member/kim.png";
import jeong from "../assets/member/jeong.png";
import yoon from "../assets/member/yoon.png";
import lee from "../assets/member/lee.jpeg";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-[#0A5C2B]" />,
    title: "AI 기반 뉴스 분석 및 요약 제공",
    description:
      "실시간 뉴스를 AI가 분석하여 호재/악재를 판단하고, 이해하기 쉬운 설명을 제공합니다. 복잡한 금융 뉴스를 누구나 이해할 수 있게 만들어드립니다.",
    stats: "5,000+ 뉴스 소스 실시간 분석",
  },
  {
    icon: <ChartBar className="w-8 h-8 text-[#0A5C2B]" />,
    title: "스마트 주식 분석 및 추천",
    description:
      "데이터 기반의 주식 매매 스코어링 시스템으로 투자 결정을 도와드립니다. 객관적인 분석과 추천으로 더 나은 투자 전략을 제시합니다.",
    stats: "97.8% 정확도 달성",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-[#0A5C2B]" />,
    title: "금융 지식 챗봇 비서 시스템",
    description:
      "우측 하단의 챗봇 버튼을 통해 언제든지 금융 관련 질문을 하실 수 있습니다. 실시간으로 답변을 제공해드립니다.",
    stats: "24/7 실시간 답변",
  },
  {
    icon: <Target className="w-8 h-8 text-[#0A5C2B]" />,
    title: "맞춤형 투자 전략 선택 및 관리",
    description:
      "개인의 투자 성향과 목표에 맞는 맞춤형 투자 전략을 제시합니다. AI가 분석한 데이터를 바탕으로 최적의 포트폴리오를 구성해드립니다.",
    stats: "1,000+ 투자 전략 제공",
  },
  {
    icon: <Network className="w-8 h-8 text-[#0A5C2B]" />,
    title: "Knowledge Graph 기반 자동 매수/매도 관리",
    description:
      "Knowledge Graph 기술을 활용한 지능형 자동 매수/매도 시스템으로 시장 변화에 실시간 대응합니다. 복잡한 시장 관계를 분석하여 최적의 매매 타이밍을 자동으로 포착합니다.",
    stats: "실시간 자동 매매 실행",
  },
  {
    icon: <Zap className="w-8 h-8 text-[#0A5C2B]" />,
    title: "실시간 모니터링 및 알림 시스템",
    description:
      "관심 종목과 포트폴리오의 실시간 가격 변동을 모니터링하고, 중요한 변화가 있을 때 즉시 알림을 제공합니다.",
    stats: "실시간 가격 업데이트",
  },
];

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white snap-y snap-mandatory overflow-y-scroll">
      {/* 헤더  섹션 */}
      <div className="bg-white min-h-screen flex items-center relative overflow-hidden snap-start">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 w-[30vw] h-48 relative"
            >
              <img
                src={BALLFiNLogo}
                alt="BALLFiN Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl font-bold text-[#0A5C2B] mb-4"
            >
              BALLFiN에 오신 것을 환영합니다
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-l text-gray-600 max-w-2xl"
            >
              AI 기반의 지능형 금융 투자 플랫폼으로, 더 나은 투자 결정을 내리실
              수 있도록 도와드립니다.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* 주요 기능 섹션 */}
      <div className="bg-[#0A5C2B]/5 min-h-screen flex items-center relative snap-start">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            주요 기능
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* 시작하기 섹션 */}
      <div className="bg-white min-h-screen flex items-center relative snap-start">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0A5C2B] rounded-xl p-8 text-center text-white relative mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl font-bold mb-4"
            >
              지금 바로 BALLFiN과 함께 시작하세요
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 text-white/90"
            >
              AI 기반의 지능형 투자 플랫폼으로 더 나은 투자 결정을 내리실 수
              있습니다.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/transaction")}
              className="bg-white text-[#0A5C2B] px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              무료로 시작하기
            </motion.button>
          </motion.div>

          {/* 팀원 정보 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              BALLFiN 팀
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-gray-600 mb-12"
            >
              혁신적인 AI 기술로 금융 투자의 미래를 만들어갑니다
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto"
          >
            {/* 천성윤 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={cheon}
                alt="천성윤"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                천성윤
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">
                Frontend, UX/UI
              </p>
              <p className="text-xs text-gray-600">
                ReactJS, TypeScript, Tailwind CSS
              </p>
            </motion.div>

            {/* 이영록 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={lee}
                alt="이영록"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                이영록
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">
                Frontend, UX/UI
              </p>
              <p className="text-xs text-gray-600">
                ReactJS, TypeScript, Tailwind CSS
              </p>
            </motion.div>

            {/* 박희령 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={park}
                alt="박희령"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                박희령
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">
                AI & Backend
              </p>
              <p className="text-xs text-gray-600 mb-1">Main: RAG Pipeline</p>
              <p className="text-xs text-gray-600">Stack: C, Python</p>
            </motion.div>

            {/* 김세진 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={kim}
                alt="김세진"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                김세진
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">AI</p>
              <p className="text-xs text-gray-600 mb-1">Main: RAG Pipeline</p>
              <p className="text-xs text-gray-600">Stack: Pytorch, Faiss</p>
            </motion.div>

            {/* 정필규 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={jeong}
                alt="정필규"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                정필규
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">AI</p>
              <p className="text-xs text-gray-600 mb-1">
                Main: Knowledge Graph
              </p>
              <p className="text-xs text-gray-600">Stack: Python, R, SQL</p>
            </motion.div>

            {/* 윤지형 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <img
                src={yoon}
                alt="윤지형"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                윤지형
              </h4>
              <p className="text-sm text-[#0A5C2B] font-medium mb-2">AI</p>
              <p className="text-xs text-gray-600 mb-1">
                Main: Knowledge Graph
              </p>
              <p className="text-xs text-gray-600">Stack: FastAPI, Pytorch</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
