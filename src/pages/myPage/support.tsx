import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  FileText,
  Send,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SupportPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");

  const faqItems = [
    {
      id: 1,
      question: "계정을 어떻게 삭제하나요?",
      answer: "설정 > 계정 관리 > 계정 삭제에서 계정을 삭제할 수 있습니다.",
    },
    {
      id: 2,
      question: "비밀번호를 잊어버렸어요",
      answer:
        "로그인 화면에서 '비밀번호 찾기'를 클릭하여 이메일로 재설정 링크를 받으세요.",
    },
    {
      id: 3,
      question: "앱이 제대로 작동하지 않아요",
      answer:
        "앱을 완전히 종료한 후 다시 시작해보세요. 문제가 지속되면 고객지원팀에 문의해주세요.",
    },
    {
      id: 4,
      question: "결제 관련 문의",
      answer:
        "결제 수단 페이지에서 결제 내역을 확인하거나, 고객지원팀으로 직접 문의해주세요.",
    },
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6 text-[#0A5C2B]" />,
      title: "채팅 지원",
      description: "실시간 채팅으로 빠른 도움을 받으세요",
      action: "채팅 시작",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#0A5C2B]" />,
      title: "이메일 지원",
      description: "support@ballfin.com",
      action: "이메일 보내기",
    },
    {
      icon: <Phone className="w-6 h-6 text-[#0A5C2B]" />,
      title: "전화 지원",
      description: "1588-0000 (평일 9:00-18:00)",
      action: "전화 걸기",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("메시지 전송:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-md mx-auto px-6 py-8 space-y-6">
        {/* 문의하기 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
              <HelpCircle className="w-6 h-6 text-[#0A5C2B]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">문의하기</h2>
              <p className="text-sm text-gray-600">
                궁금한 점을 빠르게 해결해드립니다
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 유형
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] focus:bg-white transition-all"
              >
                <option value="">문의 유형을 선택하세요</option>
                <option value="account">계정 관련</option>
                <option value="payment">결제 관련</option>
                <option value="technical">기술적 문제</option>
                <option value="feature">기능 문의</option>
                <option value="other">기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                문의 내용
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="문의하실 내용을 자세히 적어주세요..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0A5C2B]/20 focus:border-[#0A5C2B] focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || !selectedCategory}
              className="w-full flex items-center justify-center space-x-2 bg-[#0A5C2B] text-white py-3 px-4 rounded-2xl font-medium hover:bg-[#0A5C2B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>문의 보내기</span>
            </button>
          </div>
        </motion.div>

        {/* 연락처 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            다른 방법으로 연락하기
          </h2>
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
                  {method.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-[#0A5C2B] hover:bg-[#0A5C2B]/10 rounded-full transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 자주 묻는 질문 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl">
              <FileText className="w-6 h-6 text-[#0A5C2B]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                자주 묻는 질문
              </h2>
              <p className="text-sm text-gray-600">빠른 답변을 확인해보세요</p>
            </div>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200/50 rounded-2xl p-4 hover:bg-gray-50/50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
