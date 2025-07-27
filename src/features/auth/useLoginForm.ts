import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth/loginApi";

interface FormData {
  email: string;
  password: string;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token, user } = await login(formData);

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("access_token", token);

      // 사용자 정보도 로컬 스토리지에 저장
      if (user) {
        localStorage.setItem("user_info", JSON.stringify(user));
      }

      setToast({
        show: true,
        message: "로그인에 성공했습니다.",
        type: "success",
      });
      // 로그인 성공 후 홈페이지로 이동
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그인 페이지 에러:", error);
      let errorMessage = "로그인에 실패했습니다.";

      if (error instanceof Error) {
        if (error.message === "이메일 또는 비밀번호 오류") {
          errorMessage = "이메일 또는 비밀번호가 올바르지 않습니다.";
        } else {
          errorMessage = error.message;
        }
      }

      setToast({
        show: true,
        message: errorMessage,
        type: "error",
      });
    }
  };

  const handleGoogleLogin = () => {
    console.log("구글 로그인 시도");
    // 구글 로그인 로직 구현
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const navigateToForgotPassword = () => {
    navigate("/forgot-password");
  };

  return {
    formData,
    showPassword,
    toast,
    handleSubmit,
    handleGoogleLogin,
    handleChange,
    togglePasswordVisibility,
    closeToast,
    navigateToSignUp,
    navigateToForgotPassword,
  };
};
