import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  CreditCard,
  Trash2,
  Edit3,
  Calendar,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethods] = useState([
    {
      id: 1,
      type: "card",
      name: "신한카드",
      number: "**** **** **** 1234",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      name: "KB국민카드",
      number: "**** **** **** 5678",
      expiry: "03/26",
      isDefault: false,
    },
  ]);

  const [billingHistory] = useState([
    {
      id: 1,
      date: "2024-01-15",
      amount: "29,900",
      description: "프리미엄 멤버십",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-01",
      amount: "29,900",
      description: "프리미엄 멤버십",
      status: "completed",
    },
    {
      id: 3,
      date: "2023-12-15",
      amount: "29,900",
      description: "프리미엄 멤버십",
      status: "completed",
    },
  ]);

  const handleAddPaymentMethod = () => {
    // 결제 수단 추가 로직
    console.log("결제 수단 추가");
  };

  const handleDeletePaymentMethod = (id: number) => {
    // 결제 수단 삭제 로직
    console.log("결제 수단 삭제:", id);
  };

  const handleSetDefault = (id: number) => {
    // 기본 결제 수단 설정 로직
    console.log("기본 결제 수단 설정:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">결제 수단</h1>
          <div className="w-9"></div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 결제 수단 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">결제 수단</h2>
            <button
              onClick={handleAddPaymentMethod}
              className="flex items-center space-x-1 text-[#0A5C2B] hover:text-[#0A5C2B]/80 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">추가</span>
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-[#0A5C2B] text-white text-xs font-medium rounded-full">
                            기본
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.number}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{method.expiry}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Lock className="w-3 h-3" />
                          <span>보안</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="p-2 text-gray-400 hover:text-[#0A5C2B] hover:bg-[#0A5C2B]/10 rounded-full transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 결제 내역 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            결제 내역
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {billingHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 flex items-center justify-between ${
                  index !== billingHistory.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {item.description}
                  </h3>
                  <p className="text-sm text-gray-500">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₩{item.amount}</p>
                  <span className="text-xs text-green-600 font-medium">
                    완료
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 멤버십 정보 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            멤버십 정보
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">현재 멤버십</span>
              <span className="text-[#0A5C2B] font-medium">프리미엄</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">월 요금</span>
              <span className="font-medium">₩29,900</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">다음 결제일</span>
              <span className="font-medium">2024년 2월 15일</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
