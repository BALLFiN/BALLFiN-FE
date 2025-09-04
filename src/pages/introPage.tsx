import BALLFiNLogo from "../assets/BALLFiN.svg";
import { FeatureCard } from "../components/Intro/FeatureCard";
import ABTestResults from "../components/Intro/ABTestResults";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import cheon from "../assets/member/cheon.png";
import park from "../assets/member/park.png";
import kim from "../assets/member/kim.png";
import jeong from "../assets/member/jeong.png";
import yoon from "../assets/member/yoon.png";
import { BarChart2 } from "lucide-react"; // 실시간 시장 지표 및 주가 모니터링
import { TrendingUp } from "lucide-react"; // 실시간 뉴스 기반 AI 주식 매매 서비스
import { Newspaper } from "lucide-react"; // AI 기반 금융 뉴스 분석 서비스
import { Activity } from "lucide-react"; // AI 기반 주가 및 재무 분석 서비스
import { Bot } from "lucide-react"; // RAG 기반 금융 에이전트 챗봇
import { Bell } from "lucide-react"; // 관심 종목 실시간 모니터링 및 알림

const features = [
  {
    icon: <BarChart2 className="w-8 h-8 text-[#0A5C2B]" />, // 실시간 시장 지표 및 주가 모니터링
    title: "실시간 시장 지표 및 주가 모니터링",
    description:
      "주가 및 코스피, 나스닥, VIX 등 주요 시장 지표와 종목별 주가를 실시간으로 한눈에 확인할 수 있도록 제공합니다. 실시간 데이터 업데이트로 빠르고 정확한 투자 판단을 도와드립니다.",
    stats: "코스피/나스닥/VIX 등 실시간 반영",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#0A5C2B]" />, // 실시간 뉴스 기반 AI 주식 매매 서비스
    title: "실시간 뉴스 기반 AI 주식 매매 ",
    description:
      "AI와 LLM 에이전트가 실시간 뉴스를 분석하여 최적의 주식 매매 타이밍을 제안합니다. 철저한 백테스팅을 통해 최대 300% 수익률을 달성한 전략을 실시간으로 경험해보세요.",
    stats: "최대 300% 백테스트 수익률",
  },
  {
    icon: <Newspaper className="w-8 h-8 text-[#0A5C2B]" />, // AI 기반 금융 뉴스 분석 서비스
    title: "AI 기반 금융 뉴스 분석 ",
    description:
      "실시간 금융 뉴스를 AI가 분석하여 호재, 악재, 중립 여부를 판단하고, 그 이유와 기업에 미치는 영향 점수, 요약 정보를 제공합니다. 복잡한 뉴스를 쉽고 빠르게 이해할 수 있도록 도와드립니다.",
    stats: "호재/악재/중립 자동 분류",
  },
  {
    icon: <Activity className="w-8 h-8 text-[#0A5C2B]" />, // AI 기반 주가 및 재무 분석 서비스
    title: "AI 기반 주가 및 재무 분석 ",
    description:
      "주요 종목의 주가 차트 분석과 기업 재무제표를 AI가 심층적으로 분석하여 제공합니다. 투자자의 의사결정에 필수적인 인사이트를 명확하게 전달합니다.",
    stats: "주가/재무제표 AI 분석 제공",
  },
  {
    icon: <Bot className="w-8 h-8 text-[#0A5C2B]" />, // RAG 기반 금융 에이전트 챗봇
    title: "RAG 기반 금융 에이전트 챗봇",
    description:
      "최신 뉴스와 웹에서 수집한 금융 정보를 활용하여 정교한 답변을 제공하는 금융 전문 챗봇입니다. Vector RAG와 웹 서치를 활용하여 맞춤형 금융 정보를 전달 받을 수 있습니다.",
    stats: "Vector RAG + 웹서치 기반",
  },
  {
    icon: <Bell className="w-8 h-8 text-[#0A5C2B]" />, // 관심 종목 실시간 모니터링 및 알림
    title: "관심 종목 실시간 모니터링 및 알림",
    description:
      "관심 종목을 등록하면 실시간 주가 변동과 주요 뉴스를 빠르게 알려드립니다. 투자 기회를 놓치지 않도록 즉각적인 알림 서비스를 제공합니다.",
    stats: "실시간 알림/모니터링 지원",
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

      {/* A/B 테스트 결과 섹션 */}
      <ABTestResults />

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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto"
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
