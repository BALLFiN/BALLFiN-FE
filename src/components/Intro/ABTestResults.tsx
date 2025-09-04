import { motion } from "framer-motion";

export default function ABTestResults() {
  return (
    <div className="bg-gradient-to-br from-[#0A5C2B]/10 to-[#0A5C2B]/5 min-h-screen flex items-center relative snap-start">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold text-gray-900 mb-8"
          >
            LLM 기반 금융 분석 모델 A/B 테스트 결과
          </motion.h2>

          {/* 기술 스택 비교 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg opacity-90">
              <h4 className="text-lg font-bold text-gray-500 mb-4 text-center">
                Baseline
              </h4>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-500 mb-1">
                  GPT-4o
                </div>
                <div className="text-xs text-gray-500">기본 모델</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-emerald-50 rounded-xl p-6 shadow-2xl border-2 border-[#0A5C2B] ring-4 ring-[#0A5C2B]/10">
              <h4 className="text-lg font-bold text-[#0A5C2B] mb-4 text-center">
                Ours
              </h4>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-[#0A5C2B] tracking-tight">
                  Chain of Thought + RAG
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  기반 모델: GPT-4o
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* 종합 분석 평가 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl p-8 shadow-lg mb-4"
          >
            <h3 className="text-xl font-bold text-[#0A5C2B] mb-6 text-center">
              🎯 종합 분석 평가 (깊이+근거+통찰력 평균)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-500 mb-2">
                  5.25
                </div>
                <div className="text-sm text-gray-600">Baseline 평균 점수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0A5C2B] mb-2">
                  6.92
                </div>
                <div className="text-sm text-gray-600">CoT/RAG 평균 점수</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                +31.79%
              </div>
              <div className="text-sm text-gray-600">성능 향상률</div>
              <div className="text-xs text-gray-500 mt-2">
                P-value: 0.0000 (p &lt; 0.0001)
              </div>
            </div>
          </motion.div>

          {/* 개별 항목 평가 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 분석의 깊이 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-lg font-bold text-[#0A5C2B] mb-4 text-center">
                🔍 분석의 깊이
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CoT/RAG</span>
                  <span className="font-bold text-[#0A5C2B]">7.53</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Baseline</span>
                  <span className="font-bold text-gray-500">5.28</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      +42.61%
                    </div>
                    <div className="text-xs text-gray-500">향상률</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 논리적 근거 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-lg font-bold text-[#0A5C2B] mb-4 text-center">
                🧠 논리적 근거
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CoT/RAG</span>
                  <span className="font-bold text-[#0A5C2B]">6.61</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Baseline</span>
                  <span className="font-bold text-gray-500">5.59</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      +18.25%
                    </div>
                    <div className="text-xs text-gray-500">향상률</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 통찰력 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-lg font-bold text-[#0A5C2B] mb-4 text-center">
                💡 통찰력
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CoT/RAG</span>
                  <span className="font-bold text-[#0A5C2B]">6.63</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Baseline</span>
                  <span className="font-bold text-gray-500">4.89</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      +35.58%
                    </div>
                    <div className="text-xs text-gray-500">향상률</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
